import React from 'react';
import { Card } from '@shopify/polaris';
import { FocalImage } from '../../objects';

import './OriginalImageCard.css';

export interface OriginalImageCardProps {
  image?: FocalImage;
  setModalOpen: (open: boolean) => void;
}

export function OriginalImageCard({image, setModalOpen}: OriginalImageCardProps) {
  if(!image) return <></>
  
  const focalPointStyle = {
    left: `${image.focalPoint.x / image.width * 100}%`,
    top: `${image.focalPoint.y / image.height * 100}%`,
  }
  
  const safeZoneStyle = {
    left: `${image.safeZone.min.x / image.width * 100}%`,
    top: `${image.safeZone.min.y / image.height * 100}%`,
    width: `${(image.safeZone.max.x - image.safeZone.min.x)/ image.width * 100}%`,
    height: `${(image.safeZone.max.y - image.safeZone.min.y)/ image.height * 100}%`
  }

  const openImageModalAction = {
    content: "Change Image",
    onAction: () => {setModalOpen(true)}
  }

  return <Card title="Original Image" actions={[openImageModalAction]}>
          <Card.Section>
            <div className='original-image-container'>
              <span className="focal-point" style={focalPointStyle} />
              <div className="safe-zone" style={safeZoneStyle} />
              <img className='original-image' src={image.url} alt={image.key} />
            </div>
          </Card.Section>
          <Card.Section>
            <p><b>Width</b>: {image.width}px <b>Height</b>: {image.height}px</p>
            <p><b>Safe Zone Width</b>: {image.safeZoneWidth}px <b>Safe Zone Height</b>: {image.safeZoneHeight}px</p>
          </Card.Section>
        </Card>
}
