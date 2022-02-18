import React, {useReducer, useState} from 'react';
import {Layout, Page} from '@shopify/polaris';

import {ActiveImageProperties, ImagesModal, OriginalImageCard, SampleCropCard} from './components';
import {useImages} from './hooks/useImages';
import {FocalPoint, CropProp, ImagesObject} from './types';
import {FocalImage} from './objects';
import {useSizes} from './hooks/useSizes';

interface FocalCropAppProps {
  localImages: ImagesObject;
  localActiveImage: string;
  localSizes: CropProp[];
}

export function FocalCropApp({localImages, localActiveImage, localSizes}: FocalCropAppProps) {

  const [_ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [modalOpen, setModalOpen] = useState(false);
  const {addImage, updateImage, removeImage, images, activeImage, setActiveImage, loading} = useImages(localImages, localActiveImage);
  const {sizes, addSize, removeSize} = useSizes(localSizes, forceUpdate);

  const handleImageUpdate = (focalPoint: FocalPoint) => {
    updateImage(activeImage, focalPoint);
  };

  const image = new FocalImage(images[activeImage]);
  const propertiesMarkup = <ActiveImageProperties image={image} updateImage={handleImageUpdate} />;

  return <Page fullWidth>
      <Layout>
        <Layout.Section>
          { image && <SampleCropCard image={image} sizes={sizes} addSize={addSize} removeSize={removeSize} /> }
        </Layout.Section>
        <Layout.Section secondary>
          <OriginalImageCard image={image} setModalOpen={setModalOpen} updateImage={handleImageUpdate} />
          {propertiesMarkup}
        </Layout.Section>
      </Layout>
      <ImagesModal
        open={modalOpen}
        setModalOpen={setModalOpen}
        images={images}
        activeImage={activeImage}
        loading={loading}
        addImage={addImage}
        removeImage={removeImage}
        setActiveImage={setActiveImage}
      />
    </Page>;
}
