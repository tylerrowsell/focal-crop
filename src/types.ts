export const localStorageVersion = 'v2';

export interface ImagesObject {
  [key: string]: StoredImage;
}

export interface StoredImage {
  key: string;
  url: string;
  focalRegion: Region;
  naturalWidth: number;
  naturalHeight: number;
}

export interface FocalPoint {
  x: number;
  y: number;
  zoom: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface Region {
  focalLeft: number;
  focalTop: number;
  focalWidth: number;
  focalHeight: number;
}

export interface CropProp {
  requestedWidth?: number;
  requestedHeight?: number;
}

export enum CropType {
  ScaleAndCenter = 'ScaleAndCenter',
  Pan = 'Pan'
}

export interface ImageryProps {
  [key: string]: string;
  height: string;
  width: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  crop_left: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  crop_top: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  crop_width: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  crop_height: string;
}

