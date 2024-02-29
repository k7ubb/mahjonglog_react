import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import style from 'components/Organisms/TitleBar.module.css';

type Props = {
  title?: string;
  canBack?: boolean;
};

export const TitleBar = ({ title, canBack }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={style.titleBar}>
      {canBack && (
        <button className={style.back} onClick={() => navigate(-1)}>
          <ArrowBackIosIcon /> 
          戻る
        </button>
      )}
      <h1>{title}</h1>
    </div>
  );
};
