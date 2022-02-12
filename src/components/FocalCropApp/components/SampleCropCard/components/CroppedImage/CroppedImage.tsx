import React from 'react';
import { Card } from '@shopify/polaris';
import { FocalImage } from '../../../../objects';
import { CropProp } from '../../../../types';

import './CroppedImage.css';
import { min } from 'lodash';

export interface CroppedImageProps extends CropProp {
  image: FocalImage;
  removeSize: () => void;
}

export function CroppedImage({image, name, requestedHeight, requestedWidth, removeSize}: CroppedImageProps) {

  const imageStyles = {
    width: requestedWidth,
    height: requestedHeight,
    maxWidth: '100%',
  }
  const{left, top, width, height} = image.crop(requestedWidth, requestedHeight);

  const title = `${name}: ${requestedWidth}x${requestedHeight}`
  const imageWidth = min([requestedWidth, width]) || 0;
  const imageHeight = min([requestedHeight, height]) || 0;
  const imageUrl = `${image.url}?width=${imageWidth}&height=${imageHeight}&crop=region&crop_left=${left}&crop_top=${top}&crop_width=${width}&crop_height=${height}`

  const actions = [{
    content: 'Remove Size',
    onAction: removeSize
  }]

    return  <Card.Section title={title} actions={actions}>
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
}
