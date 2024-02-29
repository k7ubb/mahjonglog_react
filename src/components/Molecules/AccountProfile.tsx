import { Avatar } from '@mui/material';
import style from 'components/Molecules/AccountProfile.module.css';
import { useAuthContext } from 'feature/auth/provider/AuthProvider';

export const AccountProfile = () => {
  const { accountId, accountName } = useAuthContext();

  return (
    <div className={style.accountProfile}>
      <div className={style.avaterWrap}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <div className={style.text}>
        <p className={style.accountId}>@{accountId}</p>
        <p className={style.accountName}>{accountName}</p>
      </div>
    </div>
  );
};
