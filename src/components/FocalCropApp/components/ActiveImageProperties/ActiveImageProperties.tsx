import React from 'react';
import { Card, RadioButton, Stack } from '@shopify/polaris';
import { Coordinate, Region } from '../../types';
import { FocalImage } from '../../objects';

import { CoordinateFormGroup } from './components';

export interface ActiveImagePropertiesProps {
  image?: FocalImage;
  updateImage: (focalPoint: Coordinate, safeZone: Region, strictSafeZone: Boolean) => void;
}

export enum RegionType {
  Min,
  Max
}

export function ActiveImageProperties({image, updateImage}: ActiveImagePropertiesProps) {
  if(!image) return <></>;
  const {focalPoint, safeZone: {min, max}, strictSafeZone} = image;
  
  const handleSafeZoneChange = (value: Coordinate, type?: RegionType) => {
    const minValue = type === RegionType.Min ? value : min;
    const maxValue = type === RegionType.Max ? value : max;
    updateImage(
      focalPoint,
      {
        min: minValue,
        max: maxValue
      },
      strictSafeZone,
    )
  }

  const handleFocalPointChange = (value: Coordinate) => {
    updateImage(
      value,
      {min, max},
      strictSafeZone,
    )
  }

  const handleStrictSafeZoneChange = (value: boolean, id: string) => {
    const strict = id === "enabled";
    updateImage(
      focalPoint,
      {min, max},
      strict
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
    <Card.Section title="Safe Zone">
      <Stack>
      <RadioButton
          label="Strict Safe Zone"
          checked={strictSafeZone === true}
          id="enabled"
          helpText="Cropping will respect both height and width dimensions."
          name="strictSafeZone"
          value="true"
          onChange={handleStrictSafeZoneChange}
        />
        <RadioButton
          label="Flexible Safe Zone"
          helpText="Cropping will respect one of the height and width dimensions."
          id="disabled"
          name="strictSafeZone"
          value="false"
          checked={strictSafeZone === false}
          onChange={handleStrictSafeZoneChange}
        />
        <Stack>
          <CoordinateFormGroup 
            title="Min" 
            x={min.x.toString()}
            y={min.y.toString() }
            onChange={handleSafeZoneChange}
            type={RegionType.Min}
            vertical
          />
          <CoordinateFormGroup 
            title="Max" 
            x={max.x.toString()}
            y={max.y.toString()}
            onChange={handleSafeZoneChange}
            type={RegionType.Max}
            vertical
          />
        </Stack>
      </Stack>
    </Card.Section>
  </Card>
}
