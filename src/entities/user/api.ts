import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

import { auth, fsdb } from '@src/configs/firebase.config';

import type { AppUserCreds, AppUserEditFields } from './interfaces';

const registerUser = async ({ email, password }: AppUserCreds) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      setDoc(doc(fsdb, 'users', user.uid), { isEditor: false });
    })
    .catch((error) => {
      alert(`Error: code: ${error?.code}\n message: ${error?.message}`);
    });
};

const loginUser = async ({ email, password }: AppUserCreds) => {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    alert(`Error: code: ${error?.code}\n message: ${error?.message}`);
  });
};

const logoutUser = async () => {
  signOut(auth).catch((error) => {
    alert(`Error: code: ${error?.code}\n message: ${error?.message}`);
  });
};

const updateMeBlock = async (uid: string, updData: Partial<AppUserEditFields>) => {
  return await updateDoc(doc(fsdb, 'users', uid), updData);
};

const getUserData = async (uid: string | null) => {
  if (!uid) return null;
  return await getDoc(doc(fsdb, 'users', uid)).then((snap) => snap.data() as AppUserEditFields);
};

export { loginUser, registerUser, logoutUser, updateMeBlock, getUserData };
