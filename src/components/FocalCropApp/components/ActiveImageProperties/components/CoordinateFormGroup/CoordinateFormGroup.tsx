import { Stack, TextField } from '@shopify/polaris';
import React from 'react';
import { RegionType } from '../..';
import { Coordinate } from '../../../../types';

export interface CoordinateFormGroupProps {
  title?: string;
  x: string;
  y: string;
  type?: RegionType;
  vertical?: boolean;
  onChange: (coordinate: Coordinate, regionType?: RegionType) => void;
}

export function CoordinateFormGroup({title, x, y, type, vertical = false, onChange}: CoordinateFormGroupProps) {

  const buildCoordinate = (field: string, value: string) =>{
    switch(field){
      case 'x':
        return {x: parseFloat(value), y: parseFloat(y)};
      case 'y':
        return {x: parseFloat(x), y: parseFloat(value)};
      default:
        return {x: parseFloat(x), y: parseFloat(y)};
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    if(type !== undefined){
      onChange(buildCoordinate(field, value), type);
    }else{
      onChange(buildCoordinate(field, value));
    }
  }

  const cleanTitle = title ? `${title} ` : "";
  return <Stack vertical>
      <Stack vertical={vertical}>
        <TextField inputMode="numeric" type="number" label={`${cleanTitle}X`} value={x} autoComplete="false" onChange={(value)=>{handleFieldChange("x", value)}} />
        <TextField inputMode="numeric" type="number" label={`${cleanTitle}Y`} value={y} autoComplete="false" onChange={(value)=>{handleFieldChange("y", value)}}/>
      </Stack>
    </Stack>
}
