import React from 'react';
import {Card, Modal} from '@shopify/polaris';

import {AddImageForm, ImageList} from './components';

export interface ImagesModalProps {
  open: boolean;
  setModalOpen: (value: boolean) => void;
}

export function ImagesModal({open, setModalOpen}: ImagesModalProps) {
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return <Modal open={open} title="Change Image" onClose={handleModalClose} >
        <Card>
        <Card.Section>
          <ImageList closeModal={handleModalClose} />
        </Card.Section>
        <Card.Section>
          <AddImageForm closeModal={handleModalClose} />
        </Card.Section>
      </Card>
    </Modal>;
}
