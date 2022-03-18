import React from 'react';
import {Card} from '@shopify/polaris';
import {isEmpty, isUndefined, omitBy, snakeCase} from 'lodash';

import {FocalImage} from '../../../../../../objects';
import {CropProp} from '../../../../../../types';
import {useImageContext} from '../../../../../../ImageProvider';

import './CroppedImage.css';

export interface CroppedImageProps {
  size: CropProp;
  removeSize: () => void;
}

export function CroppedImage({size, removeSize}: CroppedImageProps) {
  const {activeImage} = useImageContext();
  const image = new FocalImage(activeImage);

  const cropParams = image.crop(size);
  const imageUrl = `${image.url}?${new URLSearchParams(cropParams).toString()}`;
  const titleParams = {
    width: size.requestedWidth,
    height: size.requestedHeight,
    crop: 'region',
    cropLeft: size.cropLeft,
    cropTop: size.cropTop,
    cropWidth: size.cropWidth,
    cropHeight: size.cropHeight,
  };

  const titleParamString = Object.entries(omitBy(titleParams, isUndefined)).map(([key, value]) => `${snakeCase(key)}: ${value}`).join(', ');
  const title = `{{ image | image_url: ${titleParamString} }}`;

  const actions = [{
    content: 'Remove Size',
    onAction: removeSize,
  }];

  return <Card.Section actions={actions}>
              <img src={imageUrl} className="cropped-image" alt={image.key} />
              <div className="liquid">{title}</div>
              <p>{imageUrl}</p>
        </Card.Section>;
}
