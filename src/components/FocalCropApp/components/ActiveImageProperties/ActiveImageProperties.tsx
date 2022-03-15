import React from 'react';
import {Card} from '@shopify/polaris';

import {Region} from '../../types';
import {FocalImage} from '../../objects';

import {FocalRegionFormGroup} from './components';

export interface ActiveImagePropertiesProps {
  image?: FocalImage;
  updateImage: (focalRegion: Region) => void;
}

export function ActiveImageProperties({image, updateImage}: ActiveImagePropertiesProps) {
  if (!image) {
    return <></>;
  }
  const {focalRegion} = image;

  const handleFocalRegionChange = (value: Region) => {
    updateImage(
      value,
    );
  };

  return <Card>
    <Card.Section title="Focal Point">
      <FocalRegionFormGroup focalRegion={focalRegion} onChange={handleFocalRegionChange} />
    </Card.Section>
  </Card>;
}
