/* eslint-disable no-mixed-operators */
/* eslint-disable @shopify/jsx-no-hardcoded-content */
import React, {useState} from 'react';
import {Card} from '@shopify/polaris';

import './OriginalImageCard.css';
import {Coordinate, Dimension} from '../../../../types';
import {useImageContext} from '../../../../ImageProvider';

export interface OriginalImageCardProps {
  setModalOpen: (open: boolean) => void;
}

export function OriginalImageCard({setModalOpen}: OriginalImageCardProps) {
  const [initialPos, setInitialPos] = useState<Coordinate>({x: 0, y: 0});
  const [initialSize, setInitialSize] = useState<Dimension>({width: 0, height: 0});
  const [intiialCrop, setInitialCrop] = useState<Coordinate>({x: 0, y: 0});
  const {activeImage, updateImage} = useImageContext();

  const focalRegionStyle = {
    left: `${activeImage.focalRegion.cropLeft / activeImage.naturalWidth * 100}%`,
    top: `${activeImage.focalRegion.cropTop / activeImage.naturalHeight * 100}%`,
    width: `${activeImage.focalRegion.cropWidth / activeImage.naturalWidth * 100}%`,
    height: `${activeImage.focalRegion.cropHeight / activeImage.naturalHeight * 100}%`,
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
    setInitialCrop({x: activeImage.focalRegion.cropLeft, y: activeImage.focalRegion.cropTop});
  };

  const handleCornerDrag = (event: React.DragEvent<HTMLSpanElement>) => {
    const originalImage = document.getElementById('originalImage') as HTMLDivElement;

    const {clientX, clientY} = event;
    if (clientX === 0 || clientY === 0) {
      return;
    }

    const width = initialSize.width + clientX - initialPos.x;
    const height = initialSize.height + clientY - initialPos.y;

    const {cropLeft, cropTop} = activeImage.focalRegion;
    const cropWidth = width / originalImage.offsetWidth * activeImage.naturalWidth;
    const cropHeight = height / originalImage.offsetHeight * activeImage.naturalHeight;
    updateImage(activeImage.key, {cropLeft, cropTop, cropWidth, cropHeight});
  };

  const handleSquareDrag = (event: React.DragEvent<HTMLSpanElement>) => {
    const originalImage = document.getElementById('originalImage') as HTMLDivElement;

    const {clientX, clientY} = event;
    if (clientX === 0 || clientY === 0) {
      return;
    }

    const cropLeft = intiialCrop.x + (clientX - initialPos.x) / originalImage.offsetWidth * activeImage.naturalWidth;
    const cropTop = intiialCrop.y + (clientY - initialPos.y) / originalImage.offsetHeight * activeImage.naturalHeight;
    const {cropHeight, cropWidth} = activeImage.focalRegion;

    updateImage(activeImage.key, {cropLeft, cropTop, cropWidth, cropHeight});
  };

  const handleDragEnd = (event: React.DragEvent<HTMLSpanElement>) => {
    event.preventDefault();
  };

  const cardMarkup = activeImage ? <><Card.Section>
  <div className="original-image-container">
    <div id="focalRegion" className="focal-region" style={focalRegionStyle} >
      <span className="move-grabber move-grabber" draggable onDragStart={handleDragStart} onDragCapture={handleSquareDrag} onDragOver={handleDragEnd} />
      <span className="resize-grabber" draggable onDragStart={handleDragStart} onDragCapture={handleCornerDrag} onDragOver={handleDragEnd} />
    </div>
    <img id="originalImage" className="original-image" src={activeImage.url} alt={activeImage.key} />
  </div>
</Card.Section>
<Card.Section>
  <p><b>Natural Width</b>: {activeImage.naturalWidth}px <b>Natural Height</b>: {activeImage.naturalHeight}px</p>
</Card.Section></> : <Card.Section>No Image Selected</Card.Section>;

  return <Card title="Original Image" actions={[openImageModalAction]}>
          {cardMarkup}
        </Card>;
}
