// eslint-disable-next-line import/order
import React from 'react';

import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import {merge} from 'lodash';

import {FocalCropApp} from './components';
// eslint-disable-next-line @shopify/strict-component-boundaries
import {defaultImages, defaultActiveImage, defaultSizes} from './components/FocalCropApp/defaults';
// eslint-disable-next-line @shopify/strict-component-boundaries
import {ImagesObject, StoredImage} from './components/FocalCropApp/types';

const loadLocalStorage = () => {
  const localImagesRaw = JSON.parse(localStorage.getItem('imagesJSON') || '{}');
  const localActiveImageString = localStorage.getItem('activeImageKey');
  const localSizesJSON = localStorage.getItem('localSizes');
  const localImages = mergeImages(localImagesRaw);
  const localActiveImage = localActiveImageString ? localActiveImageString : defaultActiveImage;
  const localSizes = localSizesJSON ? JSON.parse(localSizesJSON) : defaultSizes;
  return {localImages, localActiveImage, localSizes};
};

const mergeImages = (localImages: ImagesObject) => {
  Object.entries(localImages).forEach(([key, image]) => {
    localImages[key] = {
      ...image,
      focalPoint: {
        ...image.focalPoint,
        zoom: image.focalPoint.zoom || 1,
      },
    };
  });
  return merge(defaultImages, localImages);
};

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
