import React from 'react';
import {Card} from '@shopify/polaris';
import {compact, isUndefined, min, omit, omitBy, snakeCase} from 'lodash';

import {FocalImage} from '../../../../objects';
import {CropProp} from '../../../../types';

import './CroppedImage.css';

export interface CroppedImageProps {
  image: FocalImage;
  size: CropProp;
  removeSize: () => void;
}

export function CroppedImage({image, size, removeSize}: CroppedImageProps) {

  const imageStyles = {
    // width: size.requestedWidth,
    // height: size.requestedHeight,
    // maxWidth: '100%',
  };

  const {requestedHeight, requestedWidth, cropTop, cropLeft, cropWidth, cropHeight} = image.crop(size);
  const imageUrl = `${image.url}?width=${requestedWidth}&height=${requestedHeight}&crop=region&crop_left=${cropLeft}&crop_top=${cropTop}&crop_width=${cropWidth}&crop_height=${cropHeight}`;
  const titleParams = {
    width: size.requestedWidth,
    height: size.requestedHeight,
    crop: 'region',
    cropHeight: size.cropHeight,
    cropWidth: size.cropWidth,
    cropTop: size.cropTop,
    cropLeft: size.cropLeft,
  };
  const titleParamString = Object.entries(omitBy(titleParams, isUndefined)).map(([key, value]) => `${snakeCase(key)}: ${value}`).join(', ');
  const title = `{{ image | image_url: ${titleParamString} }}`;

  const actions = [{
    content: 'Remove Size',
    onAction: removeSize,
  }];

  return <Card.Section title={title} actions={actions}>
              <img src={imageUrl} className="cropped-image" style={imageStyles} alt={image.key} />
              <p>{imageUrl}</p>
        </Card.Section>;
}
