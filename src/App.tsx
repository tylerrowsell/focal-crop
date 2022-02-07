import React from 'react';
import '@shopify/polaris/build/esm/styles.css';
import { FocalCropApp } from './components';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';

const loadLocalStorage = () => {
  const localImagesJSON = localStorage.getItem("imagesJSON");
  const localActiveImageString = localStorage.getItem("activeImageKey");
  const localImages = localImagesJSON ? JSON.parse(localImagesJSON) : {};
  const localActiveImage = localActiveImageString ? localActiveImageString : "";
  return {localImages, localActiveImage}
}

function App() {
  const {localImages, localActiveImage} = loadLocalStorage();
  return (
    <AppProvider i18n={enTranslations}>
      <FocalCropApp localImages={localImages} localActiveImage={localActiveImage} />
    </AppProvider>
    
  );
}

export default App;
