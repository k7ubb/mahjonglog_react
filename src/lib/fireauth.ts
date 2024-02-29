import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseApp } from 'lib/firebase';
import { firestoreSet } from 'lib/firestore';

const app = FirebaseApp;

export const fireauthSignup = async (email: string, password: string, accountId: string, accountName: string) => {
  const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
  await firestoreSet("user", userCredential.user.uid, {
    email,
    accountId,
    accountName,
  });
};

export const fireauthLogin = async (email: string, password: string) => {
  await signInWithEmailAndPassword(getAuth(), email, password);
};

export const fireauthLogout = async () => {
  await signOut(getAuth());
};
