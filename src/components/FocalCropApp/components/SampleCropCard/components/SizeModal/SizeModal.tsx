import {Modal, Card, TextField, Stack} from '@shopify/polaris';
import React, {useState} from 'react';

import {CropProp} from '../../../../types';

export interface SizeModalProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  addSize: (value: CropProp) => void;
}

export function SizeModal({modalOpen, addSize, setModalOpen}: SizeModalProps) {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [name, setName] = useState('');

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAddSize = () => {
    addSize({
      name,
      requestedWidth: parseInt(width, 10),
      requestedHeight: parseInt(height, 10),
    });
    setModalOpen(false);
  };

  const footerAction = {
    content: 'Add Size',
    onAction: handleAddSize,
  };

  return <Modal title="Add Size" open={modalOpen} onClose={handleModalClose}>
    <Card primaryFooterAction={footerAction}>
      <Card.Section>
      <Stack vertical><TextField
        label="Name"
        placeholder="Aspect Ratio 1:1"
        value={name}
        onChange={setName}
        autoComplete="false"
                      />
        <Stack distribution="fillEvenly">
          <TextField
            inputMode="numeric"
            type="number"
            label="Requested Width"
            value={width}
            autoComplete="false"
            placeholder="100"
            onChange={setWidth}
          />
          <TextField
            inputMode="numeric"
            type="number"
            label="Requested Height"
            value={height}
            autoComplete="false"
            placeholder="100"
            onChange={setHeight}
          />
        </Stack>
        </Stack>
      </Card.Section>
    </Card>
    </Modal>;
}
