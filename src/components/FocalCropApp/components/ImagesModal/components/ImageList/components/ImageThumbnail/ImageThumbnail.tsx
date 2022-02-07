import React from 'react';
import { Thumbnail } from '@shopify/polaris';

import './ImageThumbnail.css';

export interface ImageThumbnailProps {
  alt: string
  source: string
  active: boolean
  onClick: () => void;
  removeImage: () => void;
}

export function ImageThumbnail({alt, source, active, onClick, removeImage}: ImageThumbnailProps) {
  const className = `image-container${active ? " image-container--active" : ""}`
  return <div className={className} onClick={onClick}>
    <span className="remove-button" onClick={removeImage}>X</span>
    <Thumbnail alt={alt} source={source} size="large" />
  </div>
}
