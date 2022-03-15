import React from 'react';
import {Stack, TextField} from '@shopify/polaris';

import {Region} from '../../../../types';

export interface FocalRegionFormGroupProps {
  focalRegion: Region;
  onChange: (FocalRegion: Region) => void;
}

export function FocalRegionFormGroup({focalRegion, onChange}: FocalRegionFormGroupProps) {

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

  const handleFieldChange = (field: string, value: string) => {
    onChange(buildFocalRegion(field, value));
  };


  return <Stack>
      <Stack>
        <TextField
          inputMode="numeric" type="number" label="Crop Left" value={cropLeft.toString()} autoComplete="false" onChange={(value) => {
            handleFieldChange('cropLeft', value);
          }}
        />
        <TextField
          inputMode="numeric" type="number" label="Crop Top" value={cropTop.toString()} autoComplete="false" onChange={(value) => {
            handleFieldChange('cropTop', value);
          }}
        />
        <TextField
          inputMode="numeric" type="number" label="Crop Width" value={cropWidth.toString()} autoComplete="false" onChange={(value) => {
            handleFieldChange('cropWidth', value);
          }}
        />
        <TextField
          inputMode="numeric" type="number" label="Crop Height" value={cropHeight.toString()} autoComplete="false" onChange={(value) => {
            handleFieldChange('cropHeight', value);
          }}
        />
      </Stack>
    </Stack>;
}
