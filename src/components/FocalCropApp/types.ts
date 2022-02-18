export interface ImagesObject {
  [key: string]: StoredImage;
}

export interface StoredImage {
  key: string;
  url: string;
  focalPoint: FocalPoint;
  width: number;
  height: number;
}

export interface FocalPoint {
  x: number;
  y: number;
  zoom: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface CropProp {
  name: string;
  requestedWidth: number;
  requestedHeight: number;
}

