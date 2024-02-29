import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firestoreGet } from 'lib/firestore';

type AuthState = {
  loading: boolean;
  userId?: string;
  email?: string;
  accountId?: string;
  accountName?: string;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<AuthState>({ loading: true });

export const AuthProvider = ({ children }: Props) => {
  const [userdata, setUserdata] = useState<AuthState>({ loading: true });

  useEffect(() => {
    try {
      const auth = getAuth();
      return onAuthStateChanged(auth, async (fireauthUser) => {
        if (fireauthUser?.uid) {
          const user = await firestoreGet("user", fireauthUser.uid);
          setUserdata({
            loading: false,
            userId: fireauthUser.uid,
            email: user.email,
            accountId: user.accountId,
            accountName: user.accountName,
          });
        }
        else {
          setUserdata({ loading: false });
        }
      });
    } catch(e) {
      setUserdata({ loading: false });
    }
  }, []);

  return <AuthContext.Provider value={userdata}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
