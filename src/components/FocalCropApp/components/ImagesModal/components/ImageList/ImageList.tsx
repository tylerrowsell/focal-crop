import React from 'react';
import {Stack} from '@shopify/polaris';

import {ImagesObject} from '../../../../types';

import {ImageThumbnail} from './components';

export interface ImageListProps {
  images: ImagesObject;
  activeImage: string;
  setActiveImage: (key: string) => void;
  removeImage: (key: string) => void;
}

export function ImageList({images, activeImage, setActiveImage, removeImage}: ImageListProps) {
  const imagesMarkup = Object.entries(images).map(([key, image]) => {
    // eslint-disable-next-line @shopify/binary-assignment-parens
    const active = key === activeImage;
    const handleImageChange = () => {
      setActiveImage(image.key);
    };
    const handleRemoveImage = () => {
      removeImage(image.key);
    };
    return <ImageThumbnail
      alt={image.key}
      key={image.key}
      source={image.url}
      active={active}
      onClick={handleImageChange}
      removeImage={handleRemoveImage}
           />;
  });

  return <Stack>
   { imagesMarkup }
  </Stack>;
}
