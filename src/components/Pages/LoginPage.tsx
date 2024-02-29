import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { fireauthLogin } from 'lib/fireauth';
import { firestoreGets } from 'lib/firestore';
import { Container } from '@mui/material';
import { CustomTextField } from 'components/Atoms/CustomTextField';
import { CustomForm } from 'components/Molecules/CustomForm';
import { AppTemplate } from 'components/Template/AppTemplate';

type reducerAction =
  | { type: "accountId"; value: string; }
  | { type: "password"; value: string; }

const reducer = (state: any, action: reducerAction) => {
  return {
    ...state,
    [action.type]: action.value,
  };
};

export const LoginPage = () => {
  const navigate = useNavigate();

  const [ state, dispatch ] = useReducer(reducer, {
    accountId: '',
    password: '',
  });

  const handleLogin = async () => {
    const user = Object.entries({
      ...(await firestoreGets('user', [
        { key: 'email', operator: '==', value: state.accountId },
      ])),
      ...(await firestoreGets('user', [
        { key: 'accountId', operator: '==', value: state.accountId },
      ]))
    })[0];
    if (!user) { throw new Error("アカウントIDかメールアドレスが間違っています"); }
    await fireauthLogin(user[1].email, state.password);
    navigate("/app")
  };

  return (
    <AppTemplate title="ログイン" canBack>
      <Container maxWidth="md">
        <CustomForm onSubmit={handleLogin} submitText="ログイン">
          <CustomTextField
            required
            label="アカウントID / メールアドレス"
            value={state.accountId}
            onChange={(e) => dispatch({ type: "accountId", value: e.target.value })}
          />
          <CustomTextField
            required
            label="パスワード"
            type="password"
            value={state.password}
            onChange={(e) => dispatch({ type: "password", value: e.target.value })}
          />
        </CustomForm>
      </Container>
    </AppTemplate>
  );
};
