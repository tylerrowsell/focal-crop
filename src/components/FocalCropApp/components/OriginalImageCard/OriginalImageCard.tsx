/* eslint-disable no-mixed-operators */
/* eslint-disable @shopify/jsx-no-hardcoded-content */
import React, {useState} from 'react';
import {Card} from '@shopify/polaris';

import './OriginalImageCard.css';
import {FocalImage} from '../../objects';
import {Coordinate, Dimension, Region} from '../../types';

export interface OriginalImageCardProps {
  image?: FocalImage;
  setModalOpen: (open: boolean) => void;
  updateImage: (focalRegion: Region) => void;
}

export function OriginalImageCard({image, setModalOpen, updateImage}: OriginalImageCardProps) {
  const [initialPos, setInitialPos] = useState<Coordinate>({x: 0, y: 0});
  const [initialSize, setInitialSize] = useState<Dimension>({width: 0, height: 0});
  const [intiialCrop, setInitialCrop] = useState<Coordinate>({x: 0, y: 0});

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

  const handleDragStart = (event: React.DragEvent<HTMLSpanElement | HTMLDivElement>) => {
    const focalRegion = document.getElementById('focalRegion') as HTMLDivElement;

    setInitialPos({x: event.clientX, y: event.clientY});
    setInitialSize({width: focalRegion.offsetWidth, height: focalRegion.offsetHeight});
    setInitialCrop({x: image.focalRegion.cropLeft, y: image.focalRegion.cropTop});
  };

  const handleCornerDrag = (event: React.DragEvent<HTMLSpanElement>) => {
    const originalImage = document.getElementById('originalImage') as HTMLDivElement;

    const {clientX, clientY} = event;
    if (clientX === 0 || clientY === 0) {
      return;
    }

    const width = initialSize.width + clientX - initialPos.x;
    const height = initialSize.height + clientY - initialPos.y;

    const {cropLeft, cropTop} = image.focalRegion;
    const cropWidth = width / originalImage.offsetWidth * image.naturalWidth;
    const cropHeight = height / originalImage.offsetHeight * image.naturalHeight;
    updateImage({cropLeft, cropTop, cropWidth, cropHeight});
  };

  const handleSquareDrag = (event: React.DragEvent<HTMLSpanElement>) => {
    const originalImage = document.getElementById('originalImage') as HTMLDivElement;

    const {clientX, clientY} = event;
    if (clientX === 0 || clientY === 0) {
      return;
    }

    const cropLeft = intiialCrop.x + (clientX - initialPos.x) / originalImage.offsetWidth * image.naturalWidth;
    const cropTop = intiialCrop.y + (clientY - initialPos.y) / originalImage.offsetHeight * image.naturalHeight;
    const {cropHeight, cropWidth} = image.focalRegion;

    updateImage({cropLeft, cropTop, cropWidth, cropHeight});
  };

  const handleDragEnd = (event: React.DragEvent<HTMLSpanElement>) => {
    event.preventDefault();
  };

  const cardMarkup = image ? <><Card.Section>
  <div className="original-image-container">
    <div id="focalRegion" className="focal-region" style={focalRegionStyle} >
      <span className="move-grabber move-grabber" draggable onDragStart={handleDragStart} onDragCapture={handleSquareDrag} onDragOver={handleDragEnd} />
      <span className="resize-grabber" draggable onDragStart={handleDragStart} onDragCapture={handleCornerDrag} onDragOver={handleDragEnd} />
    </div>
    <img id="originalImage" className="original-image" src={image.url} alt={image.key} />
  </div>
</Card.Section>
<Card.Section>
  <p><b>Natural Width</b>: {image.naturalWidth}px <b>Natural Height</b>: {image.naturalHeight}px</p>
</Card.Section></> : <Card.Section>No Image Selected</Card.Section>;

  return <Card title="Original Image" actions={[openImageModalAction]}>
          {cardMarkup}
        </Card>;
}
