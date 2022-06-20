/* eslint-disable @shopify/jsx-no-hardcoded-content */
import {Modal, Card, TextField, Stack} from '@shopify/polaris';
import React, {useState} from 'react';

import {CropProp} from '../../../../../../types';

import {SizeTextField} from './components';
import './SizeModal.css';

export interface SizeModalProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  addSize: (value: CropProp) => void;
}

export function SizeModal({modalOpen, addSize, setModalOpen}: SizeModalProps) {
  const [values, setValues] = useState<CropProp>({});
  const {requestedWidth, requestedHeight} = values;

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAddSize = () => {
    addSize({
      requestedWidth,
      requestedHeight,
    });
    setModalOpen(false);
  };

  const sizeFields = ['requestedWidth', 'requestedHeight'];
  const sizeFieldMarkup = sizeFields.map((name: string) => {
    const value = values[name as keyof CropProp]?.toString();
    const updateField = (value: string) => {
      setValues((oldValues) => {
        return {
          ...oldValues,
          [name]: parseInt(value, 10),
        };
      });
    };
    return <SizeTextField name={name} key={name} value={value || ''} setValue={updateField} />;
  });

  const footerAction = {
    content: 'Add Size',
    onAction: handleAddSize,
  };

  return <Modal title="Add Size" open={modalOpen} onClose={handleModalClose} large>
    <Card primaryFooterAction={footerAction}>
      <Card.Section>
        <p className="liquid">{`{{ image | image_url: `} {sizeFieldMarkup} {` }}`}</p>
      </Card.Section>
    </Card>
  </Modal>;
}
