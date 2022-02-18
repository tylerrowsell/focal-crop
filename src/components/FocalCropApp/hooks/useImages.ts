import {useEffect, useState} from 'react';
import {v4 as generateUuid} from 'uuid';

import {FocalPoint, StoredImage, ImagesObject} from '../types';
import {getImageDimensions} from '../utilities';

export const useImages = (localImages: ImagesObject, localActiveImage: string) => {
  const [images, setImages] = useState<ImagesObject>(localImages);
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(localActiveImage);

  const addImage = async (url: string) => {
    try {
      setLoading(true);
      const urlObject = new URL(url);
      const strippedUrl = `${urlObject.protocol}//${urlObject.host}${urlObject.pathname}`;
      const {width, height} = await getImageDimensions(strippedUrl);
      const focalPoint: FocalPoint = {x: width / 2, y: height / 2, zoom: 0};
      const key = generateUuid();
      const newImage: StoredImage = {key, url: strippedUrl, focalPoint, width, height};

      setImages((images) => {
        return {
          ...images,
          [key]: newImage,
        };
      });
      setActiveImage(key);
      setLoading(false);
      return true;
    } catch {
      setLoading(false);
      return false;
    }
  };

  const handleImagesChange = () => {
    localStorage.setItem('imagesJSON', JSON.stringify(images));
    localStorage.setItem('activeImageKey', activeImage);
  };
  useEffect(handleImagesChange, [images, activeImage]);

  const updateImage = (imageKey: string, focalPoint: FocalPoint) => {
    setImages((images) => {
      return {
        ...images,
        [imageKey]: {
          ...images[imageKey],
          focalPoint,
        },
      };
    });
  };

  const removeImage = (imageKey: string) => {
    setImages((images) => {
      const newImages = {
        ...images,
      };
      delete newImages[imageKey];
      return newImages;
    });
  };

  const handleSetActiveImage = (imageKey: string) => {
    setActiveImage(imageKey);
  };

  return {
    addImage,
    updateImage,
    removeImage,
    setActiveImage: handleSetActiveImage,
    activeImage,
    loading,
    images,
  };
};
