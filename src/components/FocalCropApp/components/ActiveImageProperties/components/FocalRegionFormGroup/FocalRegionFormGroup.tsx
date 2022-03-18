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

  const {cropLeft, cropTop, cropWidth, cropHeight} = focalRegion;

  const buildFocalRegion = (field: string, value: string) => {
    switch (field) {
      case 'cropTop':
        return {cropTop: parseFloat(value), cropLeft, cropWidth, cropHeight};
      case 'cropLeft':
        return {cropTop, cropLeft: parseFloat(value), cropWidth, cropHeight};
      case 'cropWidth':
        return {cropTop, cropLeft, cropWidth: parseFloat(value), cropHeight};
      case 'cropHeight':
        return {cropTop, cropLeft, cropWidth, cropHeight: parseFloat(value)};
      default:
        return {cropTop, cropLeft, cropWidth, cropHeight};
    }
  };


  return <Stack>
      <Stack>
        <TextField
          inputMode="numeric" type="number" label="Crop Left" value={cropLeft.toFixed()} autoComplete="false" onChange={(value) => {
            handleFieldChange('cropLeft', value);
          }}
        />
        <TextField
          inputMode="numeric" type="number" label="Crop Width" value={cropWidth.toFixed()} autoComplete="false" onChange={(value) => {
            handleFieldChange('cropWidth', value);
          }}
        />
      </Stack>
      <Stack>
        <TextField
          inputMode="numeric" type="number" label="Crop Top" value={cropTop.toFixed()} autoComplete="false" onChange={(value) => {
            handleFieldChange('cropTop', value);
          }}
        />
        <TextField
          inputMode="numeric" type="number" label="Crop Height" value={cropHeight.toFixed()} autoComplete="false" onChange={(value) => {
            handleFieldChange('cropHeight', value);
          }}
        />
      </Stack>
    </Stack>;
}
