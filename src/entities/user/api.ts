import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

import resizeImage from 'image-resize';

import { auth, fsdb, storage } from '@src/configs/firebase.config';
import { IMAGE_RESIZE_SETUP } from '@src/configs/imageresizer.config';

import { AVATAR_IMAGE_PATH } from './constants';
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

const uploadAvatar = async (imageFile: File) => {
  const blob = (await resizeImage(imageFile, IMAGE_RESIZE_SETUP)) as Blob;
  const upload = new File([blob], 'avatar.webp', { type: blob.type });

  const storageRef = ref(storage, AVATAR_IMAGE_PATH);

  const uploadResult = await uploadBytes(storageRef, upload, {
    cacheControl: 'public,max-age=7200',
    contentType: 'image/webp',
  });

  return uploadResult;
};

const getAvatarUrl = async () => {
  return await getDownloadURL(ref(storage, AVATAR_IMAGE_PATH));
};

export { loginUser, registerUser, logoutUser, updateMeBlock, getUserData, uploadAvatar, getAvatarUrl };
