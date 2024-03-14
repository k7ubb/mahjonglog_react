import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import style from 'components/Organisms/MenuBar.module.css';

export const MenuBar = () => {
  const location = useLocation();
  return (
    <div className={style.menuBar}>
      <Link className={`${style.menuBarIcon} ${location.pathname === "/app" && style.now}`} to="/app">
        <HomeIcon />
      </Link>
      <Link className={`${style.menuBarIcon} ${location.pathname === "/app/player" && style.now}`} to="/app/player">
        <PeopleIcon />
      </Link>
      <Link className={style.menuBarIcon} to="/app/account">
        <Avatar sx={
          location.pathname.match("/app/account")? 
          {
            border: '2px solid var(--color-accent)',
            width: 40,
            height: 40,
          }
          :
          {
            width: 44,
            height: 44,
          }
        } />
      </Link>
    </div>
  );
};
