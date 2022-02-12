import React from 'react';
import { Card } from '@shopify/polaris';
import { Coordinate } from '../../types';
import { FocalImage } from '../../objects';

import { CoordinateFormGroup } from './components';

export interface ActiveImagePropertiesProps {
  image?: FocalImage;
  updateImage: (focalPoint: Coordinate) => void;
}

export function ActiveImageProperties({image, updateImage}: ActiveImagePropertiesProps) {
  if(!image) return <></>;
  const {focalPoint} = image;

  const handleFocalPointChange = (value: Coordinate) => {
    updateImage(
      value,
    )
  }

  return <Card>
    <Card.Section title="Focal Point">
      <CoordinateFormGroup 
        x={focalPoint.x.toString()} 
        y={focalPoint.y.toString()}
        onChange={handleFocalPointChange}
      />
    </Card.Section>
  </Card>
}
