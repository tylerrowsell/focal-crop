import {useEffect, useState} from 'react';
import {v4 as generateUuid} from 'uuid';

import {StoredImage, ImagesObject, Region} from '../types';
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
      const {width: naturalWidth, height: naturalHeight} = await getImageDimensions(strippedUrl);
      const focalRegion: Region = {cropLeft: naturalWidth / 4, cropTop: naturalHeight / 4, cropWidth: naturalWidth * 0.75, cropHeight: naturalHeight * 0.75};
      const key = generateUuid();
      const newImage: StoredImage = {key, url: strippedUrl, focalRegion, naturalHeight, naturalWidth};

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

  const updateImage = (imageKey: string, focalRegion: Region) => {
    setImages((images) => {
      return {
        ...images,
        [imageKey]: {
          ...images[imageKey],
          focalRegion,
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
