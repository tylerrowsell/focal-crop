import React from 'react';
import {Stack} from '@shopify/polaris';

import {useImageContext} from '../../../../../../ImageProvider';

import {ImageThumbnail} from './components';

export interface ImageListProps {
  closeModal: () => void;
}

export function ImageList({closeModal}: ImageListProps) {
  const {images, activeImage, setActiveImageKey, removeImage} = useImageContext();
  const imagesMarkup = Object.entries(images).map(([key, image]) => {
    const handleImageChange = () => {
      setActiveImageKey(image.key);
      closeModal();
    };
    const handleRemoveImage = () => {
      removeImage(image.key);
    };
    return <ImageThumbnail
      alt={image.key}
      key={image.key}
      source={image.url}
      active={key === activeImage.key}
      onClick={handleImageChange}
      removeImage={handleRemoveImage}
           />;
  });

  return <Stack>
   { imagesMarkup }
  </Stack>;
}
