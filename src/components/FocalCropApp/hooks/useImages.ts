import { useEffect, useState } from 'react';
import { v4 as generateUuid } from 'uuid';
import {Coordinate, Region, StoredImage, ImagesObject} from '../types';
import { getImageDimensions } from '../utilities';

export const useImages = (localImages: ImagesObject, localActiveImage: string, forceUpdateCallback: () => void) => {
  const [images, setImages] = useState<ImagesObject>(localImages)
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(localActiveImage);
  
  const addImage = async (url: string) => {
    setLoading(true)
    const {width, height} = await getImageDimensions(url);
    const focalPoint: Coordinate = {x: width/2, y: height/2}
    const safeZone: Region = {
      min: {x: width * 0.25, y: height * 0.25},
      max: {x: width * 0.75, y: height * 0.75}
    }
    const key = generateUuid();
    const strictSafeZone = false;
    const newImage: StoredImage = { key, url, focalPoint, safeZone, width, height, strictSafeZone }
  
    setImages(images => {
      return {
        ...images,
        [key]: newImage
      }
    });
    setActiveImage(key);
    setLoading(false);
  }
  
  const handleImagesChange = () => {
    localStorage.setItem("imagesJSON", JSON.stringify(images));
    localStorage.setItem("activeImageKey", activeImage);
    forceUpdateCallback()
  }
  useEffect(handleImagesChange, [images, activeImage, forceUpdateCallback]);
  
  const updateImage = (imageKey: string, focalPoint: Coordinate, safeZone: Region, strictSafeZone: Boolean) => {
    setImages((images) => {
      return {
        ...images,
        [imageKey]: {
          ...images[imageKey],
          focalPoint,
          safeZone,
          strictSafeZone,
        }
      }
    });
  }
  
  const removeImage = (imageKey: string) => {
    setImages((images) => {
      const newImages = {
        ...images
      }
      delete newImages[imageKey];
      const keys = Object.keys(images);
      if(keys.length > 0) setActiveImage(keys[0]);
      return newImages;
    });
  }

  const handleSetActiveImage = (imageKey: string) => {
    setActiveImage(imageKey);
  }

  return {
    addImage,
    updateImage,
    removeImage,
    setActiveImage: handleSetActiveImage,
    activeImage,
    loading,
    images
  }
}
