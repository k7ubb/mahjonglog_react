import { useAuthContext } from 'feature/auth/provider/AuthProvider';
import { AppTemplate } from 'components/Template/AppTemplate';

export const HomePage = () => {
  const { accountId } = useAuthContext();

  return (
    <AppTemplate>
      <p>welcome, {accountId}</p>
      <p>Home</p>
    </AppTemplate>
  );
};
