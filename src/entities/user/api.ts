import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import resizeImage from 'image-resize';

import { auth, fsdb, storage } from '@src/configs/firebase.config';
import { IMAGE_RESIZE_SETUP } from '@src/configs/imageresizer.config';
import { STATIC_PATHS } from '@src/configs/assets.config';

import type { AppGlobalCTX } from '@src/app';

import { BOTNAME_TO_OWNER_UID } from './constants';
import type { AppUserCreds, AppUserEditFields } from './interfaces';

// AUTH API

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

// EDIT USER DATA API

const updateMeBlock = async (uid: string, updData: Partial<AppUserEditFields>) => {
  return await updateDoc(doc(fsdb, 'users', uid), updData);
};

async function updateMyChatId(this: AppGlobalCTX) {
  const uid = auth.currentUser?.uid;
  if (!uid || !this.botname || !this.chatId) return;
  return await updateDoc(doc(fsdb, 'users', uid), { chatId: this.chatId });
}

async function getUserData(this: AppGlobalCTX) {
  if (!this.botname) return null;

  return await getDoc(doc(fsdb, 'users', BOTNAME_TO_OWNER_UID[this.botname]))
    .then((snap) => snap.data() as AppUserEditFields)
    .catch(() => null);
}

async function uploadAvatar(this: AppGlobalCTX, imageFile: File) {
  if (!this.botname) return;

  const blob = (await resizeImage(imageFile, IMAGE_RESIZE_SETUP)) as Blob;
  const upload = new File([blob], 'avatar.webp', { type: blob.type });
  const storageRef = ref(storage, `${this.botname}/${STATIC_PATHS.avatar}`);

  const uploadResult = await uploadBytes(storageRef, upload, {
    cacheControl: 'public,max-age=3600',
    contentType: 'image/webp',
  });

  return uploadResult;
}

async function getAvatarUrl(this: AppGlobalCTX) {
  if (!this.botname) return null;
  return await getDownloadURL(ref(storage, `${this.botname}/${STATIC_PATHS.avatar}`));
}

export { loginUser, registerUser, logoutUser, updateMeBlock, getUserData, uploadAvatar, getAvatarUrl, updateMyChatId };
