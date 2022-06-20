import React from 'react';
import {Stack, TextField} from '@shopify/polaris';

import {useImageContext} from '../../../../../../ImageProvider';

export function FocalRegionFormGroup() {

  const {activeImage, updateImage} = useImageContext();
  const {focalRegion} = activeImage;

  const handleFieldChange = (field: string, value: string) => {
    const region = buildFocalRegion(field, value);
    updateImage(activeImage.key, region);
  };

  const {focalLeft, focalTop, focalWidth, focalHeight} = focalRegion;

  const buildFocalRegion = (field: string, value: string) => {
    switch (field) {
      case 'focalTop':
        return {focalTop: parseFloat(value), focalLeft, focalWidth, focalHeight};
      case 'focalLeft':
        return {focalTop, focalLeft: parseFloat(value), focalWidth, focalHeight};
      case 'focalWidth':
        return {focalTop, focalLeft, focalWidth: parseFloat(value), focalHeight};
      case 'focalHeight':
        return {focalTop, focalLeft, focalWidth, focalHeight: parseFloat(value)};
      default:
        return {focalTop, focalLeft, focalWidth, focalHeight};
    }
  };


  return <Stack>
      <Stack>
        <TextField
          inputMode="numeric" type="number" label="Crop Left" value={focalLeft.toFixed()} autoComplete="false" onChange={(value) => {
            handleFieldChange('focalLeft', value);
          }}
        />
        <TextField
          inputMode="numeric" type="number" label="Crop Width" value={focalWidth.toFixed()} autoComplete="false" onChange={(value) => {
            handleFieldChange('focalWidth', value);
          }}
        />
      </Stack>
      <Stack>
        <TextField
          inputMode="numeric" type="number" label="Crop Top" value={focalTop.toFixed()} autoComplete="false" onChange={(value) => {
            handleFieldChange('focalTop', value);
          }}
        />
        <TextField
          inputMode="numeric" type="number" label="Crop Height" value={focalHeight.toFixed()} autoComplete="false" onChange={(value) => {
            handleFieldChange('focalHeight', value);
          }}
        />
      </Stack>
    </Stack>;
}
