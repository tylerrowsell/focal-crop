import React from 'react';
import { Card } from '@shopify/polaris';
import { FocalImage } from '../../../../objects';

import './CroppedImage.css';

export interface CroppedImageProps {
  image: FocalImage;
  name: string;
  requestedWidth: number;
  requestedHeight: number;
}

export function CroppedImage({image, name, requestedHeight, requestedWidth}: CroppedImageProps) {

  const imageStyles = {
    width: requestedWidth,
    height: requestedHeight,
    maxWidth: '100%',
    maxHeight: '100%',
  }
  const{left, top, width, height} = image.crop(requestedWidth, requestedHeight);

  const title = `${name}: ${requestedWidth}x${requestedHeight}`
  const imageUrl = `${image.url}?width=${width}&height=${height}&crop=region&crop_left=${left}&crop_top=${top}&crop_width=${width}&crop_height=${height}`

  return <Card title={title}>
          <Card.Section>
              <img src={imageUrl} className="cropped-image" style={imageStyles} alt={image.key} />
              <p>
                Requested Width: <b>{requestedWidth}</b> | 
                Requested Height:  <b>{requestedHeight}</b> | 
                Crop Width: <b>{width}</b> | 
                Crop Height:  <b>{height}</b> | 
                Crop Left:  <b>{left}</b> | 
                Crop Top: <b>{top}</b> 
              </p>
           </Card.Section>
        </Card>
}
