import { CropProp } from "./types";

export const defaultImages = {
  "f7683bf9-6bfd-4fdf-9be4-cbe0df628088": {
    key: "f7683bf9-6bfd-4fdf-9be4-cbe0df628088",
    url: "https://cdn.shopify.com/s/files/1/1607/3025/files/collecting-order-at-curbside-from-retail-store.jpg",
    focalPoint: { x: 2781, y: 591 },
    width: 4096,
    height: 2731,
  },
  "a06c7be5-8602-4904-a921-22bac9d0a23b": {
    key: "a06c7be5-8602-4904-a921-22bac9d0a23b",
    url: "https://cdn.shopify.com/s/files/1/1607/3025/files/Square-4.jpg",
    focalPoint: { x: 150, y: 168 },
    width: 320,
    height: 320,
  },
  "59687364-528d-4c99-b308-1145e963df39": {
    key: "59687364-528d-4c99-b308-1145e963df39",
    url: "https://cdn.shopify.com/s/files/1/1607/3025/files/camera.jpg",
    focalPoint: { x: 1174, y: 624 },
    width: 2048,
    height: 1365,
  },
  "a254ac71-3ab4-436d-b104-da7f1c373bf2": {
    key: "a254ac71-3ab4-436d-b104-da7f1c373bf2",
    url: "https://cdn.shopify.com/s/files/1/1607/3025/files/woman-meditates-cross-legged-under-a-tree.jpg",
    focalPoint: { x: 1234, y: 1753 },
    width: 2973,
    height: 4460,
    strictSafeZone: false,
  },
};

export const defaultActiveImage = Object.keys(defaultImages)[0];

export const defaultSizes: CropProp[] = [
  { name: "1:1 Aspect Ratio", requestedWidth: 500, requestedHeight: 500 },
  { name: "Hero Image", requestedWidth: 1000, requestedHeight: 300 },
  { name: "Vertical Banner", requestedWidth: 300, requestedHeight: 500 },
];
