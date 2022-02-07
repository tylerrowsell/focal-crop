import React, { useReducer, useState } from 'react';
import { Layout, Page } from '@shopify/polaris';
import { ActiveImageProperties, ImagesModal, OriginalImageCard, SampleCropCard } from './components';
import { useImages } from './hooks/useImages';
import { Coordinate, ImagesObject, Region } from './types';
import { FocalImage } from './objects';

interface FocalCropAppProps {
  localImages: ImagesObject
  localActiveImage: string
}

export function FocalCropApp({localImages, localActiveImage}: FocalCropAppProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [modalOpen, setModalOpen] = useState(false);
  const {addImage, updateImage, removeImage, images, activeImage, setActiveImage, loading} = useImages(localImages, localActiveImage, forceUpdate);


  const handleImageUpdate = (focalPoint: Coordinate, safeZone: Region, strictSafeZone: Boolean) => {
    updateImage(activeImage, focalPoint, safeZone, strictSafeZone);
  }

  const hasImages = Object.keys(images).length > 0
  const image = new FocalImage(images[activeImage]);
  const propertiesMarkup = hasImages && <ActiveImageProperties image={image} updateImage={handleImageUpdate} />

  return <Page fullWidth>
      <Layout>
        <Layout.Section>
          <SampleCropCard image={image} />
        </Layout.Section>
        <Layout.Section secondary>
          <OriginalImageCard image={image} setModalOpen={setModalOpen} />
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
            setActiveImage={setActiveImage} />
    </Page>
}
