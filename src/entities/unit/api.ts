import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { v4 as getId } from 'uuid';

import resizeImage from 'image-resize';

import { fsdb, storage } from '@src/configs/firebase.config';
import { IMAGE_RESIZE_SETUP } from '@src/configs/imageresizer.config';

import type { AppUnitFields, AppUnit } from './interfaces';

const DB_PATH = 'units';

const createUnit = async (unit: AppUnitFields) => {
  const unitId = getId();
  await setDoc(doc(fsdb, DB_PATH, unitId), unit);
  return { unitId };
};

const updateUnit = async (unitId: string, updData: Partial<AppUnitFields>) => {
  return await updateDoc(doc(fsdb, DB_PATH, unitId), { ...updData });
};

const getUnits = async () => {
  const loadedUnits: AppUnit[] = [];
  const snapshot = await getDocs(collection(fsdb, DB_PATH));

  snapshot.forEach((snap) => {
    if (snap.exists()) loadedUnits.push({ ...snap.data(), id: snap.id } as AppUnit);
  });

  return loadedUnits;
};

const getUnit = async (unitId: string) => {
  return await getDoc(doc(fsdb, DB_PATH, unitId)).then((res) => {
    if (res.exists()) return { ...res.data(), id: res.id } as AppUnit;
    return null;
  });
};

const uploadImage = async (imageId: string, image: File, unitId: string) => {
  const blob = (await resizeImage(image, IMAGE_RESIZE_SETUP)) as Blob;
  const file = new File([blob], `${imageId}.webp`, { type: blob.type });
  const storageRef = ref(storage, `${unitId}/${imageId}.webp`);

  const uploadResult = await uploadBytes(storageRef, file, {
    cacheControl: 'public,max-age=3600',
    contentType: 'image/webp',
  });

  return uploadResult;
};

const uploadVideo = async (videoId: string, video: File, unitId: string) => {
  const ext = video.name.match(/\.mp4$/)?.[0];
  const storageRef = ref(storage, `${unitId}/${videoId}${ext}`);
  return await uploadBytes(storageRef, video);
};

const getImageUrl = async (imagePath: string) => {
  return await getDownloadURL(ref(storage, imagePath));
};

export { createUnit, getUnits, getUnit, updateUnit, uploadImage, getImageUrl, uploadVideo };
