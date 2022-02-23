/* eslint-disable @shopify/jsx-no-hardcoded-content */
import React from 'react';
import {Card} from '@shopify/polaris';


import './OriginalImageCard.css';
import {FocalImage} from '../../objects';
import {FocalPoint, Region} from '../../types';

export interface OriginalImageCardProps {
  image?: FocalImage;
  setModalOpen: (open: boolean) => void;
  updateImage: (focalRegion: Region) => void;
}

export function OriginalImageCard({image, setModalOpen, updateImage}: OriginalImageCardProps) {
  if (!image) {
    return <></>;
  }

  const focalRegionStyle = {
    left: `${image.focalRegion.cropLeft / image.naturalWidth * 100}%`,
    top: `${image.focalRegion.cropTop / image.naturalHeight * 100}%`,
    width: `${image.focalRegion.cropWidth / image.naturalWidth * 100}%`,
    height: `${image.focalRegion.cropHeight / image.naturalHeight * 100}%`,
  };


  const openImageModalAction = {
    content: 'Change Image',
    onAction: () => {
      setModalOpen(true);
    },
  };

  const cardMarkup = image ? <><Card.Section>
  <div className="original-image-container">
    <div className="focal-region" style={focalRegionStyle} />
    <img className="original-image" src={image.url} alt={image.key} />
  </div>
</Card.Section>
<Card.Section>
  <p><b>Natural Width</b>: {image.naturalWidth}px <b>Natural Height</b>: {image.naturalHeight}px</p>
</Card.Section></> : <Card.Section>No Image Selected</Card.Section>;

  return <Card title="Original Image" actions={[openImageModalAction]}>
          {cardMarkup}
        </Card>;
}
