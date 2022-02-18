import React from 'react';
import {Card} from '@shopify/polaris';

import {FocalPoint} from '../../types';
import {FocalImage} from '../../objects';

import {FocalPointFormGroup} from './components';

export interface ActiveImagePropertiesProps {
  image?: FocalImage;
  updateImage: (focalPoint: FocalPoint) => void;
}

export function ActiveImageProperties({image, updateImage}: ActiveImagePropertiesProps) {
  if (!image) {
    return <></>;
  }
  const {focalPoint} = image;

  const handleFocalPointChange = (value: FocalPoint) => {
    updateImage(
      value,
    );
  };

  return <Card>
    <Card.Section title="Focal Point">
      <FocalPointFormGroup
        x={focalPoint.x.toString()}
        y={focalPoint.y.toString()}
        zoom={focalPoint.zoom.toString()}
        onChange={handleFocalPointChange}
      />
    </Card.Section>
  </Card>;
}
