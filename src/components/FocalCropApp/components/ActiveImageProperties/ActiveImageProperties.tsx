import React from 'react';
import {Card} from '@shopify/polaris';

import {FocalRegionFormGroup} from './components';

export function ActiveImageProperties() {
  return <Card>
    <Card.Section title="Focal Region">
      <FocalRegionFormGroup />
    </Card.Section>
  </Card>;
}
