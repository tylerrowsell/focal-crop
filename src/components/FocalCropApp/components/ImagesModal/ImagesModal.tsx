import React from 'react';
import {Card, Modal} from '@shopify/polaris';

import {ImagesObject} from '../../types';

import {AddImageForm, ImageList} from './components';

export interface ImagesModalProps {
  open: boolean;
  images: ImagesObject;
  activeImage: string;
  loading: boolean;
  setModalOpen: (value: boolean) => void;
  addImage: (url: string) => Promise<boolean>;
  removeImage: (key: string) => void;
  setActiveImage: (key: string) => void;
}

export function ImagesModal({open, setModalOpen, images, addImage, loading, activeImage, setActiveImage, removeImage}: ImagesModalProps) {

  const handleSelectImage = (imageKey: string) => {
    setActiveImage(imageKey);
    setModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // eslint-disable-next-line @shopify/binary-assignment-parens
  const hasImages = Object.keys(images).length > 0;
  const imagesMarkup = hasImages && <Card.Section>
    <ImageList
      images={images}
      activeImage={activeImage}
      setActiveImage={handleSelectImage}
      removeImage={removeImage}
    />
  </Card.Section>;

  return <Modal open={open} title="Change Image" onClose={handleModalClose} >
        <Card>
        { imagesMarkup }
        <Card.Section>
          <AddImageForm loading={loading} addImage={addImage} closeModal={handleModalClose} />
        </Card.Section>
      </Card>
    </Modal>;
}
