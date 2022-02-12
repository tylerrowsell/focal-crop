export interface ImagesObject {
  [key: string]: StoredImage;
}

export interface StoredImage {
  key: string
  url: string
  focalPoint: Coordinate
  strictSafeZone: Boolean,
  width: number,
  height: number
}

export interface Coordinate {
  x: number
  y: number
}

export interface Dimension {
  width: number
  height: number
}

export interface CropProp {
  name: string;
  requestedWidth: number;
  requestedHeight: number;
}

