import {CropProp, ImagesObject} from '../../types';

export const defaultImages: ImagesObject = {
  'f7683bf9-6bfd-4fdf-9be4-cbe0df628088': {
    key: 'f7683bf9-6bfd-4fdf-9be4-cbe0df628088',
    url: 'https://cdn.shopify.com/s/files/1/1607/3025/files/collecting-order-at-curbside-from-retail-store.jpg',
    focalRegion: {focalLeft: 100, focalTop: 100, focalWidth: 3400, focalHeight: 1400},
    naturalWidth: 4096,
    naturalHeight: 2731,
  },
  'a06c7be5-8602-4904-a921-22bac9d0a23b': {
    key: 'a06c7be5-8602-4904-a921-22bac9d0a23b',
    url: 'https://cdn.shopify.com/s/files/1/1607/3025/files/Square-4.jpg',
    focalRegion: {focalLeft: 70, focalTop: 100, focalWidth: 145, focalHeight: 200},
    naturalWidth: 320,
    naturalHeight: 320,
  },
  '59687364-528d-4c99-b308-1145e963df39': {
    key: '59687364-528d-4c99-b308-1145e963df39',
    url: 'https://cdn.shopify.com/s/files/1/1607/3025/files/camera.jpg',
    focalRegion: {focalLeft: 700, focalTop: 275, focalWidth: 1000, focalHeight: 800},
    naturalWidth: 2048,
    naturalHeight: 1365,
  },
  'a254ac71-3ab4-436d-b104-da7f1c373bf2': {
    key: 'a254ac71-3ab4-436d-b104-da7f1c373bf2',
    url: 'https://cdn.shopify.com/s/files/1/1607/3025/files/woman-meditates-cross-legged-under-a-tree.jpg',
    focalRegion: {focalLeft: 800, focalTop: 1500, focalWidth: 1200, focalHeight: 1000},
    naturalWidth: 2973,
    naturalHeight: 4460,
  },
};

export const defaultActiveImage = Object.keys(defaultImages)[0];

export const defaultSizes: CropProp[] = [
  {requestedWidth: 500, requestedHeight: 500},
  {requestedWidth: 512, requestedHeight: 256},
  {requestedWidth: 256, requestedHeight: 512},
  {requestedWidth: 200, requestedHeight: 250},
  {requestedWidth: 100, requestedHeight: 100},
  {requestedWidth: 2000, requestedHeight: 2500},
];
