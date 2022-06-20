import React, {useContext, useEffect, useState, createContext, useCallback, useMemo} from 'react';
import {v4 as generateUuid} from 'uuid';

import {getImageDimensions} from '../utilities';
import {ImagesObject, Region, StoredImage} from '../types';

const DIRECT_USE_MESSAGE = `ImageContext should not be used directly; please use ImageProvider and useImageContext`;

interface ImageProviderContext {
  activeImage: StoredImage;
  images: ImagesObject;
  loading: boolean;
  addImage: (url: string) => Promise<boolean>;
  updateImage: (imageKey: string, focalRegion: Region) => void;
  removeImage: (imageKey: string) => void;
  setActiveImageKey: (imageKey: string) => void;
}

const ImageContext = createContext<ImageProviderContext>({
  activeImage: {} as StoredImage,
  images: {} as ImagesObject,
  loading: false,
  async addImage() {
    throw new Error(DIRECT_USE_MESSAGE);
  },
  updateImage() {
    throw new Error(DIRECT_USE_MESSAGE);
  },
  removeImage() {
    throw new Error(DIRECT_USE_MESSAGE);
  },
  setActiveImageKey() {
    throw new Error(DIRECT_USE_MESSAGE);
  },
});


interface ProviderProps {
  children?: React.ReactNode;
  localImages: ImagesObject;
  localActiveImage: string;
}

export function ImageProvider({children, localImages, localActiveImage}: ProviderProps) {
  const [images, setImages] = useState<ImagesObject>(localImages);
  const [loading, setLoading] = useState(false);
  const [activeImageKey, setActiveImageKey] = useState(localActiveImage);

  const activeImage = images[activeImageKey];

  const addImage = useCallback(async (url: string) => {
    try {
      const urlObject = new URL(url);
      const strippedUrl = `${urlObject.protocol}//${urlObject.host}${urlObject.pathname}`;
      const {width: naturalWidth, height: naturalHeight} = await getImageDimensions(strippedUrl);
      const focalRegion: Region = {focalLeft: naturalWidth / 4, focalTop: naturalHeight / 4, focalWidth: naturalWidth * 0.75, focalHeight: naturalHeight * 0.75};
      const key = generateUuid();
      const newImage: StoredImage = {key, url: strippedUrl, focalRegion, naturalHeight, naturalWidth};

      setImages((images) => {
        return {
          ...images,
          [key]: newImage,
        };
      });
      setActiveImageKey(key);
      setLoading(false);
      return true;
    } catch {
      setLoading(false);
      return false;
    }
  }, []);

  const handleImagesChange = () => {
    localStorage.setItem('imagesJSON', JSON.stringify(images));
    localStorage.setItem('activeImageKey', activeImageKey);
  };
  useEffect(handleImagesChange, [images, activeImageKey]);

  const updateImage = useCallback((imageKey: string, focalRegion: Region) => {
    setImages((images) => {
      return {
        ...images,
        [imageKey]: {
          ...images[imageKey],
          focalRegion,
        },
      };
    });
  }, []);

  const removeImage = useCallback((imageKey: string) => {
    setImages((images) => {
      const newImages = {
        ...images,
      };
      delete newImages[imageKey];
      return newImages;
    });
  }, []);

  const contextValue = useMemo(() => (
    {activeImage,
      images,
      loading,
      addImage,
      updateImage,
      removeImage,
      setActiveImageKey,
    }), [activeImage, addImage, images, loading, removeImage, updateImage]);

  return <ImageContext.Provider value={contextValue}>
          {children}
        </ImageContext.Provider>;
}

export function useImageContext() {
  return useContext(ImageContext);
}
