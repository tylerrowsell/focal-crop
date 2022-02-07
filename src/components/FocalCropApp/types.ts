export interface ImagesObject {
  [key: string]: StoredImage;
}

export interface StoredImage {
  key: string
  url: string
  focalPoint: Coordinate
  safeZone: Region,
  strictSafeZone: Boolean,
  width: number,
  height: number
}

export interface Coordinate {
  x: number
  y: number
}

export interface Region {
  min: Coordinate
  max: Coordinate
}

export interface Dimension {
  width: number
  height: number
}

