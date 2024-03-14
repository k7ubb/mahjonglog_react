import { Link } from 'react-router-dom';
import { fireauthLogout } from 'lib/fireauth';
import { useAuthContext } from 'feature/auth/provider/AuthProvider';
import { AppTemplate } from 'components/Template/AppTemplate';
import { LoadingSpin } from 'components/Atoms/LoadingSpin';
import { AccountProfile } from 'components/Molecules/AccountProfile';

export const PlayerPage = () => {
  const { loading, userId } = useAuthContext();

  if (loading) {
    return <LoadingSpin width="100%" height="100%" />;
  }
  
  else {
    return (
      <AppTemplate>
        {userId? <>
          <div style={{ height: "16px" }} />
          <AccountProfile />
          <button onClick={() => fireauthLogout()}>Logout</button>
        </> : <>
          <Link to='/app/account/signup'>Signup</Link> <br />
          <Link to='/app/account/login'>Login</Link><br />
        </>}
      </AppTemplate>
    );
        }
};
