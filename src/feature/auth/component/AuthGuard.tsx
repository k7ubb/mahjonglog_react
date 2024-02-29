import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'feature/auth/provider/AuthProvider';
import { LoadingSpin } from 'components/Atoms/LoadingSpin';

type Props = {
  element: React.ReactNode
};

export const AuthGuard = ({ element }: Props) => {
  const navigate = useNavigate();
  const { loading, userId } = useAuthContext();

  /* eslint-disable */
  useEffect(() => {
    if(!loading && !userId) {
      navigate('/app/account');
    }
  }, [loading, userId]);
  /* eslint-disable */

  if (loading) {
    return <LoadingSpin width="100%" height="100%" />;
  }
  else if (userId) {
    return <>{element}</>;
  }
  else {
    return null;
  }
};
