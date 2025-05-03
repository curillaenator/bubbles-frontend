import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import resizeImage from 'image-resize';

import { storage } from '@src/configs/firebase.config';
import { IMAGE_RESIZE_SETUP } from '@src/configs/imageresizer.config';

import type { AppGlobalCTX } from '@src/app';

interface UploadImagePayload {
  unitId: string;
  imageId: string;
  image: File;
}

async function uploadImage(this: AppGlobalCTX, payload: UploadImagePayload) {
  if (!this.botname) return null;

  const { unitId, imageId, image } = payload;
  const storageRef = ref(storage, `${this.botname}/${unitId}/${imageId}.webp`);

  const blob = (await resizeImage(image, IMAGE_RESIZE_SETUP)) as Blob;
  const file = new File([blob], `${imageId}.webp`, { type: blob.type });

  return await uploadBytes(storageRef, file, {
    cacheControl: 'public,max-age=3600',
    contentType: 'image/webp',
  });
}

interface UploadVideoPayload {
  videoId: string;
  video: File;
  unitId: string;
}

async function uploadVideo(this: AppGlobalCTX, payload: UploadVideoPayload) {
  if (!this.botname) return null;

  const { unitId, videoId, video } = payload;
  const storageRef = ref(storage, `${this.botname}/${unitId}/${videoId}.mp4`);

  return await uploadBytes(storageRef, video);
}

const getImageUrl = async (imagePath: string) => await getDownloadURL(ref(storage, imagePath));

export { uploadImage, uploadVideo, getImageUrl };
