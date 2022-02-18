import React from 'react';
import {RangeSlider, Stack, TextField} from '@shopify/polaris';

import {FocalPoint} from '../../../../types';

export interface FocalPointFormGroupProps {
  title?: string;
  x: string;
  y: string;
  zoom: string;
  vertical?: boolean;
  onChange: (FocalPoint: FocalPoint) => void;
}

export function FocalPointFormGroup({title, x, y, zoom, vertical = false, onChange}: FocalPointFormGroupProps) {

  const buildFocalPoint = (field: string, value: string) => {
    switch (field) {
      case 'x':
        return {x: parseFloat(value), y: parseFloat(y), zoom: parseFloat(zoom)};
      case 'y':
        return {x: parseFloat(x), y: parseFloat(value), zoom: parseFloat(zoom)};
      case 'zoom':
        return {x: parseFloat(x), y: parseFloat(y), zoom: parseFloat(value)};
      default:
        return {x: parseFloat(x), y: parseFloat(y), zoom: parseFloat(zoom)};
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    onChange(buildFocalPoint(field, value));
  };

  const cleanTitle = title ? `${title} ` : '';
  return <Stack vertical>
      <Stack vertical={vertical}>
        <TextField
          inputMode="numeric" type="number" label={`${cleanTitle}X`} value={x} autoComplete="false" onChange={(value) => {
            handleFieldChange('x', value);
          }}
        />
        <TextField
          inputMode="numeric" type="number" label={`${cleanTitle}Y`} value={y} autoComplete="false" onChange={(value) => {
            handleFieldChange('y', value);
          }}
        />
        <RangeSlider
          label="Zoom" value={parseInt(zoom, 10)} onChange={(value) => {
            handleFieldChange('zoom', value.toString());
          }}
          min={0}
          max={100}
          step={1}
          output
        />
      </Stack>
    </Stack>;
}
