import React from 'react';
import {Card} from '@shopify/polaris';

import {Region} from '../../../../types';

import {FocalRegionFormGroup} from './components';

export function ActiveImageProperties() {
  return <Card>
    <Card.Section title="Focal Point">
      <FocalRegionFormGroup />
    </Card.Section>
  </Card>;
}
