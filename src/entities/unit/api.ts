import { ref, deleteObject } from 'firebase/storage';
import { doc, setDoc, updateDoc, getDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { v4 as getId } from 'uuid';

import { fsdb, storage } from '@src/configs/firebase.config';

import type { AppGlobalCTX } from '@src/app';
import type { AppUnitFields, AppUnit, AppUnitGalleryItem } from './interfaces';

// COMMON PUBLIC API

async function getUnits(this: AppGlobalCTX) {
  if (!this.botname) return [];

  const loadedUnits: AppUnit[] = [];
  const snapshot = await getDocs(collection(fsdb, this.botname));

  snapshot.forEach((snap) => {
    if (snap.exists()) loadedUnits.push({ ...snap.data(), id: snap.id } as AppUnit);
  });

  return loadedUnits;
}

// AUTHED UNIT API

async function createUnit(this: AppGlobalCTX, unitFields: AppUnitFields) {
  if (!this.botname) return;

  const unitId = getId();
  await setDoc(doc(fsdb, this.botname, unitId), { ...unitFields, order: 999 });
  return { unitId };
}

interface UpdateUnitPayload {
  unitId: string;
  updData: Partial<AppUnitFields>;
}

async function updateUnit(this: AppGlobalCTX, payload: UpdateUnitPayload) {
  if (!this.botname) return;

  const { unitId, updData } = payload;
  return await updateDoc(doc(fsdb, this.botname, unitId), { ...updData });
}

async function removeUnit(this: AppGlobalCTX, unit: AppUnit) {
  if (!this.botname) return;

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

  await deleteDoc(doc(fsdb, this.botname, unit.id));

  return { deletedUnit: unit.id };
}

async function getUnit(this: AppGlobalCTX, unitId: string) {
  if (!this.botname) return null;

  return await getDoc(doc(fsdb, this.botname, unitId)).then((res) => {
    if (res.exists()) return { ...res.data(), id: res.id } as AppUnit;
    return null;
  });
}

async function reorderUnits(this: AppGlobalCTX, reordered: AppUnit[]) {
  if (!this.botname) return;

  for (const { id, order } of reordered) {
    await updateDoc(doc(fsdb, this.botname, id), { order });
  }
}

interface RemoveGalleryItemPayload {
  item: AppUnitGalleryItem;
  unit: AppUnit;
}

async function removeGalleryItem(this: AppGlobalCTX, payload: RemoveGalleryItemPayload) {
  if (!this.botname) return;

  const { item, unit } = payload;
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

  await updateDoc(doc(fsdb, this.botname, unit.id), { gallery });

  return { removedItemIdx };
}

export { createUnit, getUnits, getUnit, updateUnit, removeUnit, reorderUnits, removeGalleryItem };
