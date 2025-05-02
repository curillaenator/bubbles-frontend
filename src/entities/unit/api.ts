import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, setDoc, updateDoc, getDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { v4 as getId } from 'uuid';

import resizeImage from 'image-resize';

import { fsdb, storage } from '@src/configs/firebase.config';
import { IMAGE_RESIZE_SETUP } from '@src/configs/imageresizer.config';

import type { AppUnitFields, AppUnit, AppUnitGalleryItem } from './interfaces';

const DB_PATH = 'divebot';

const createUnit = async (unitFields: AppUnitFields) => {
  console.log('createUnit', unitFields);

  const unitId = getId();
  await setDoc(doc(fsdb, DB_PATH, unitId), { ...unitFields, order: 999 });
  return { unitId };
};

const updateUnit = async (unitId: string, updData: Partial<AppUnitFields>) => {
  return await updateDoc(doc(fsdb, DB_PATH, unitId), { ...updData });
};

const removeUnit = async (unit: AppUnit) => {
  const fileRemovePromises = unit.gallery
    .map(({ src, videoSrc }) => {
      const filePathsToRemove: string[] = [];

      if (!src.includes('video_default')) filePathsToRemove.push(src);
      if (!!videoSrc) filePathsToRemove.push(videoSrc);

      return filePathsToRemove;
    })
    .flat()
    .map((filePath) => deleteObject(ref(storage, filePath)));

  await Promise.all(fileRemovePromises);

  await deleteDoc(doc(fsdb, DB_PATH, unit.id));

  return { deletedUnit: unit.id };
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

const reorderUnits = async (reordered: AppUnit[]) => {
  for (const { id, order } of reordered) {
    await updateDoc(doc(fsdb, DB_PATH, id), { order });
  }
};

/// ----- ///

const uploadImage = async (imageId: string, image: File, unitId: string) => {
  const blob = (await resizeImage(image, IMAGE_RESIZE_SETUP)) as Blob;
  const file = new File([blob], `${imageId}.webp`, { type: blob.type });
  const storageRef = ref(storage, `divebot/${unitId}/${imageId}.webp`);

  const uploadResult = await uploadBytes(storageRef, file, {
    cacheControl: 'public,max-age=3600',
    contentType: 'image/webp',
  });

  return uploadResult;
};

const uploadVideo = async (videoId: string, video: File, unitId: string) => {
  const ext = video.name.match(/\.mp4$/)?.[0];
  const storageRef = ref(storage, `divebot/${unitId}/${videoId}${ext}`);
  return await uploadBytes(storageRef, video);
};

const getImageUrl = async (imagePath: string) => {
  return await getDownloadURL(ref(storage, imagePath));
};

const removeGalleryItem = async (item: AppUnitGalleryItem, unit: AppUnit) => {
  const { type, videoSrc, src: imagePath } = item;

  const pathsToRemove: string[] = [];
  if (!imagePath.includes('video_default')) pathsToRemove.push(imagePath);
  if (!!videoSrc) pathsToRemove.push(videoSrc);

  const removePromises = pathsToRemove.map(async (filePath) => deleteObject(ref(storage, filePath)));
  await Promise.all(removePromises);

  const removedItemIdx = unit.gallery.findIndex((el) =>
    type === 'video' ? el.videoSrc === videoSrc : el.src === imagePath,
  );

  const gallery = [...unit.gallery];
  gallery.splice(removedItemIdx, 1);

  await updateDoc(doc(fsdb, DB_PATH, unit.id), { gallery });

  return { removedItemIdx };
};

export {
  createUnit,
  getUnits,
  getUnit,
  updateUnit,
  removeUnit,
  reorderUnits,
  //
  uploadImage,
  getImageUrl,
  uploadVideo,
  removeGalleryItem,
};
