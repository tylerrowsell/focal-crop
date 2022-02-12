/* eslint-disable @shopify/jsx-no-hardcoded-content */
import {FormLayout, Button, TextField, InlineError, Stack} from '@shopify/polaris';
import React, {useEffect, useState} from 'react';

export interface AddImageFormProps {
  addImage: (url: string) => Promise<boolean>;
  loading: boolean;
  closeModal: () => void;
}

export function AddImageForm({addImage, loading, closeModal}: AddImageFormProps) {
  const [url, setUrl] = useState('https://cdn.shopify.com/s/files/1/1607/3025/files/camera.jpg');
  const [error, setError] = useState('');

  const clearUrl = () => {
    if (!loading) {
      setUrl('');
      setError('');
    }
  };
  useEffect(clearUrl, [loading]);

  const handleAddImage = async () => {
    setError('');
    if (url === '') {
      return;
    }
    const result = await addImage(url);
    if (result) {
      closeModal();
    } else {
      setError('Invalid URL');
    }
  };

  return <FormLayout>
    <FormLayout.Group>
      <Stack distribution="fill">
        <Stack vertical>
          <TextField
            label="Shopify CDN Image Url"
            labelHidden
            placeholder="https://cdn.shopify.com/images/demo.jpg"
            value={url}
            onChange={setUrl}
            autoComplete="false"
            disabled={loading}
          />
          {error !== '' && <InlineError message={error} fieldID="error" />}
        </Stack>
        <Button onClick={handleAddImage} primary submit disabled={loading} loading={loading}>Add Image</Button>
      </Stack>
    </FormLayout.Group>
  </FormLayout>;
}
