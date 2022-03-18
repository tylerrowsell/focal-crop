import React, {useState} from 'react';
import {Card} from '@shopify/polaris';

import {CropProp} from '../../../../types';

import {CroppedImage, SizeModal} from './components';

export interface SampleCropCardProps {
  sizes: CropProp[];
  addSize: (value: CropProp) => void;
  removeSize: (value: number) => void;
}

export function SampleCropCard({sizes, addSize, removeSize}: SampleCropCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const imageMarkup = sizes.map((size, index) => {
    return <CroppedImage
      // eslint-disable-next-line react/no-array-index-key
      key={`croppedImage-${index}`}
      size={size}
      removeSize={() => removeSize(index)}
           />;
  });

  const primaryAction =
    {
      content: 'Add Size',
      onAction: () => {
        setModalOpen(true);
      },
    };

  return <>
          <Card title="Example Crops" primaryFooterAction={primaryAction}>{imageMarkup}</Card>
          <SizeModal modalOpen={modalOpen} setModalOpen={setModalOpen} addSize={addSize} />
        </>;
}
