import { useAuthContext } from 'feature/auth/provider/AuthProvider';
import { TitleBar } from 'components/Organisms/TitleBar';
import { MenuBar } from 'components/Organisms/MenuBar';

type Props = {
  children: React.ReactNode;
  title?: string;
  canBack?: boolean;
};

export const AppTemplate = ({ children, title, canBack }: Props) => {
  const { accountId } = useAuthContext();
  return <>
    {title && <TitleBar title={title} canBack={canBack} />}
    {children}
    {accountId && <MenuBar />}
  </>;
};

