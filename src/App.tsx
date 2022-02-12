import React from 'react';
import '@shopify/polaris/build/esm/styles.css';
import { FocalCropApp } from './components';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import { defaultImages, defaultActiveImage, defaultSizes } from './components/FocalCropApp/defaults';

const loadLocalStorage = () => {
  const localImagesJSON = localStorage.getItem("imagesJSON");
  const localActiveImageString = localStorage.getItem("activeImageKey");
  const localSizesJSON = localStorage.getItem("localSizes");
  const localImages = localImagesJSON ? JSON.parse(localImagesJSON) : defaultImages;
  const localActiveImage = localActiveImageString ? localActiveImageString : defaultActiveImage;
  const localSizes = localSizesJSON ? JSON.parse(localSizesJSON) : defaultSizes;
  return {localImages, localActiveImage, localSizes}
}

function App() {
  const {localImages, localActiveImage, localSizes} = loadLocalStorage();
  return (
    <AppProvider i18n={enTranslations}>
      <FocalCropApp 
        localImages={localImages} 
        localActiveImage={localActiveImage} 
        localSizes={localSizes} 
      />
    </AppProvider>
    
  );
}

export default App;
