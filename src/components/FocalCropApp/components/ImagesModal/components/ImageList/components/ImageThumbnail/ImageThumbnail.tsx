/* eslint-disable @shopify/jsx-no-hardcoded-content */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {Thumbnail} from '@shopify/polaris';

import './ImageThumbnail.css';

export interface ImageThumbnailProps {
  alt: string;
  source: string;
  active: boolean;
  onClick: () => void;
  removeImage: () => void;
}

export function ImageThumbnail({alt, source, active, onClick, removeImage}: ImageThumbnailProps) {
  const className = `image-container${active ? ' image-container--active' : ''}`;
  return <div className={className}>
    {!active && <span className="remove-button" onClick={removeImage}>X</span>}
    <div onClick={onClick}>
      <Thumbnail alt={alt} source={source} size="large" />
    </div>
  </div>;
}
