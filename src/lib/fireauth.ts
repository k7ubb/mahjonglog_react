import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseApp } from 'lib/firebase';
import { firestoreGets, firestoreSet } from 'lib/firestore';

/* eslint-disable */
const app = FirebaseApp;
/* eslint-disable */

export const fireauthSignup = async (email: string, password: string, accountId: string, accountName: string) => {
  if (Object.keys(await firestoreGets('user', [
    { key: 'accountId', operator: '==', value: accountId },
  ])).length ) {
    throw new Error("このアカウントIDは使われています");
  }
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
