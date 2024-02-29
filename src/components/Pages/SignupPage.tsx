import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { fireauthSignup } from 'lib/fireauth';
import { Container } from '@mui/material';
import { CustomTextField } from 'components/Atoms/CustomTextField';
import { CustomForm } from 'components/Molecules/CustomForm';
import { AppTemplate } from 'components/Template/AppTemplate';

type reducerAction =
  | { type: "email"; value: string; }
  | { type: "password"; value: string; }
  | { type: "password_check"; value: string; }
  | { type: "accountId"; value: string; }
  | { type: "accountName"; value: string; }

const reducer = (state: any, action: reducerAction) => {
  return {
    ...state,
    [action.type]: action.value,
  };
};

export const SignupPage = () => {
  const navigate = useNavigate();

  const [ state, dispatch ] = useReducer(reducer, {
    email: '',
    password: '',
    password_check: '',
    accountId: '',
    accountName: '',  
  });

  const handleSignup = async () => {
    if (state.password !== state.password_check) {
      throw new Error("パスワードが一致しません");
    }
    await fireauthSignup(state.email, state.password, state.accountId, state.accountName);
    navigate("/app")
  };

  return (
    <AppTemplate title="新規登録" canBack>
      <Container maxWidth="md">
        <CustomForm onSubmit={handleSignup} submitText="アカウント作成">
          <CustomTextField
            required
            label="メールアドレス"
            value={state.email}
            onChange={(e) => dispatch({ type: "email", value: e.target.value })}
          />
          <CustomTextField
            required
            label="パスワード"
            type="password"
            value={state.password}
            onChange={(e) => dispatch({ type: "password", value: e.target.value })}
          />
          <CustomTextField
            required
            label="パスワード (確認)"
            type="password"
            value={state.password_check}
            onChange={(e) => dispatch({ type: "password_check", value: e.target.value })}
          />
          <CustomTextField
            required
            label="アカウントID"
            value={state.accountId}
            onChange={(e) => dispatch({ type: "accountId", value: e.target.value })}
          />
          <CustomTextField
            required
            label="アカウント名"
            value={state.accountName}
            onChange={(e) => dispatch({ type: "accountName", value: e.target.value })}
          />
        </CustomForm>
      </Container>
    </AppTemplate>
  );
};
