import { getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, query, where, WhereFilterOp, deleteDoc, Timestamp, DocumentData } from 'firebase/firestore';
import { FirebaseApp } from 'lib/firebase';

const app = FirebaseApp;

export type FirestoreQuery = {
  key: string;
  operator: WhereFilterOp;
  value: any;
};

const convertTimestamp = (data: DocumentData) => {
  for (let key in data) {
    if (data[key] instanceof Timestamp) {
      data[key] = data[key].toDate();
    }
  }
  return data;
};

export const firestoreGet = async (collectionName: string, document: string) => {
  return convertTimestamp((await getDoc(doc(getFirestore(app), collectionName, document))).data() || {});
};

export const firestoreGets = async (collectionName: string, queries?: FirestoreQuery[]) => {
  const wheres = queries? queries.map((query) => where(query.key, query.operator, query.value)) : [];
  const result: { [key: string]: any; } = {};
  (await getDocs(query(
    collection(getFirestore(app), collectionName),
    ...wheres
  ))).forEach(doc => result[doc.id] = convertTimestamp(doc.data()));
  return result;
};

export const firestoreSet = async (collectionName: string, document: string, data: any) => {
  return await setDoc(doc(getFirestore(app), collectionName, document), { ...data, createdAt: new Date(), updatedAt: new Date() });
};

export const firestoreAdd = async (collectionName: string, data: any) => {
  return (await addDoc(collection(getFirestore(app), collectionName), { ...data, createdAt: new Date(), updatedAt: new Date() })).id;
};

export const firestoreUpdate = async (collectionName: string, document: string, data: any) => {
  return await updateDoc(doc(getFirestore(app), collectionName, document), { ...data, updatedAt: new Date() });
};

export const firestoreDelete = async (collectionName: string, document: string) => {
  await deleteDoc(doc(getFirestore(app), collectionName, document));
};

export const firestoreArchive = async (collectionName: string, document: string) => {
  const data = await firestoreGet(collectionName, document);
  await setDoc(doc(getFirestore(app), `${collectionName}-archive`, document), { ...data, updatedAt: new Date() });
  firestoreDelete(collectionName, document);
};
