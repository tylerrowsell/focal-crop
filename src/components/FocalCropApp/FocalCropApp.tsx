import React, {useReducer, useState} from 'react';
import {Layout, Page} from '@shopify/polaris';

import {CropProp, ImagesObject} from '../../types';

import {ActiveImageProperties, ImagesModal, OriginalImageCard, SampleCropCard} from './components';
import {useSizes} from './hooks/useSizes';

interface FocalCropAppProps {
  localSizes: CropProp[];
}

export function FocalCropApp({localSizes}: FocalCropAppProps) {

  const [_ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [modalOpen, setModalOpen] = useState(false);
  const {sizes, addSize, removeSize} = useSizes(localSizes, forceUpdate);

  const propertiesMarkup = <ActiveImageProperties />;

  return <Page fullWidth>
      <Layout>
        <Layout.Section>
          <SampleCropCard sizes={sizes} addSize={addSize} removeSize={removeSize} />
        </Layout.Section>
        <Layout.Section secondary>
          <OriginalImageCard setModalOpen={setModalOpen} />
          {propertiesMarkup}
        </Layout.Section>
      </Layout>
      <ImagesModal
        open={modalOpen}
        setModalOpen={setModalOpen}
      />
    </Page>;
}
