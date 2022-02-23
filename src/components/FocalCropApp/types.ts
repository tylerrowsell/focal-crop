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

export interface Dimension {
  width: number;
  height: number;
}

export interface Region {
  cropLeft: number;
  cropTop: number;
  cropWidth: number;
  cropHeight: number;
}

export interface CropProp {
  requestedWidth?: number;
  requestedHeight?: number;
  cropLeft?: number;
  cropTop?: number;
  cropWidth?: number;
  cropHeight?: number;
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

