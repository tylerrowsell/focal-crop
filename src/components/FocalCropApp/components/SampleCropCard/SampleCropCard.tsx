import {Card} from '@shopify/polaris';
import React, {useState} from 'react';

import {FocalImage} from '../../objects';
import {CropProp} from '../../types';

import {CroppedImage, SizeModal} from './components';

export interface SampleCropCardProps {
  image: FocalImage;
  sizes: CropProp[];
  addSize: (value: CropProp) => void;
  removeSize: (value: number) => void;
}

export function SampleCropCard({image, sizes, addSize, removeSize}: SampleCropCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const imageMarkup = sizes.map((size, index) => {
    return <CroppedImage
      name={size.name}
      image={image}
      // eslint-disable-next-line react/no-array-index-key
      key={`croppedImage-${index}`}
      requestedWidth={size.requestedWidth}
      requestedHeight={size.requestedHeight}
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
