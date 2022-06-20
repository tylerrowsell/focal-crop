// eslint-disable-next-line import/order
import React from 'react';

import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import {merge} from 'lodash';

import {FocalCropApp} from './components';
// eslint-disable-next-line @shopify/strict-component-boundaries
import {defaultImages, defaultActiveImage, defaultSizes} from './components/FocalCropApp/defaults';
import {ImagesObject, localStorageVersion} from './types';
import {ImageProvider} from './ImageProvider';

const loadLocalStorage = () => {
  const localImagesRaw = JSON.parse(localStorage.getItem(`imagesJSON-${localStorageVersion}`) || '{}');
  const localActiveImageString = localStorage.getItem(`activeImageKey-${localStorageVersion}`);
  const localSizesJSON = localStorage.getItem(`localSizes-${localStorageVersion}`);
  const localImages = mergeImages(localImagesRaw);
  const localActiveImage = localActiveImageString ? localActiveImageString : defaultActiveImage;
  const localSizes = localSizesJSON ? JSON.parse(localSizesJSON) : defaultSizes;
  return {localImages, localActiveImage, localSizes};
};

const mergeImages = (localImages: ImagesObject) => {
  Object.entries(localImages).forEach(([key, image]) => {
    localImages[key] = {
      ...image,
      focalRegion: {
        ...image.focalRegion,
      },
    };
  });
  return merge(defaultImages, localImages);
};

function App() {
  const {localImages, localActiveImage, localSizes} = loadLocalStorage();
  return (
    <AppProvider i18n={enTranslations}>
      <ImageProvider localImages={localImages} localActiveImage={localActiveImage}>
        <FocalCropApp
          localSizes={localSizes}
        />
      </ImageProvider>
    </AppProvider>
  );
}

export default App;
