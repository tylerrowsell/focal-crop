/* eslint-disable @shopify/jsx-no-hardcoded-content */
import {FormLayout, Button, TextField} from '@shopify/polaris';
import React, {useEffect, useState} from 'react';

export interface AddImageFormProps {
  addImage: (url: string) => void;
  loading: boolean;
}

export function AddImageForm({addImage, loading}: AddImageFormProps) {
  const [url, setUrl] = useState('https://cdn.shopify.com/s/files/1/1607/3025/files/camera.jpg');

  const clearUrl = () => {
    if (!loading) {
      setUrl('');
    }
  };
  useEffect(clearUrl, [loading]);

  const handleAddImage = async () => {
    if (url === '') {
      return;
    }
    addImage(url);
  };

  return <FormLayout>
    <FormLayout.Group>
      <TextField
        label="Image Url"
        labelHidden
        placeholder="https://cdn.shopify.com/images/demo.jpg"
        value={url}
        onChange={setUrl}
        autoComplete="false"
        disabled={loading}
      />
      <Button onClick={handleAddImage} primary submit disabled={loading} loading={loading}>Add Image</Button>
    </FormLayout.Group>
  </FormLayout>;
}
