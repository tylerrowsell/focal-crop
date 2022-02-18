/* eslint-disable no-mixed-operators */
import {max, min} from 'lodash';

import {FocalPoint, StoredImage} from '../types';

class Image {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  get dimensions() {
    return {width: this.width, height: this.height};
  }

  get aspectRatio() {
    return this.width / this.height;
  }

  get isSquare() {
    return this.aspectRatio === 1;
  }

  get isVertical() {
    return this.aspectRatio < 1;
  }

  get isHorizontal() {
    return this.aspectRatio > 1;
  }
}
export class FocalImage extends Image {
  key: string;
  url: string;
  focalPoint: FocalPoint;
  constructor(image: StoredImage) {
    super(image.width, image.height);
    this.key = image.key;
    this.url = image.url;
    this.focalPoint = image.focalPoint;
  }

  crop(requestedWidth: number, requestedHeight: number): Crop {
    const requestedImage = new Image(requestedWidth, requestedHeight);
    let calculatedWidth = Math.round(widthFromAspectRatio(this.height, requestedImage.aspectRatio) * (1 - this.focalPoint.zoom / 10));
    let calculatedHeight = Math.round(this.height * (1 - this.focalPoint.zoom / 10));
    let maxLeft = this.width - calculatedWidth;
    let maxTop = this.height - calculatedHeight;

    if (requestedImage.isSquare && this.isVertical || requestedImage.isHorizontal) {
      calculatedWidth = Math.round(this.width * (1 - this.focalPoint.zoom / 10));
      calculatedHeight = Math.round(heightFromAspectRatio(this.width, requestedImage.aspectRatio) * (1 - this.focalPoint.zoom / 10));
      maxLeft = this.width - calculatedWidth;
      maxTop = this.height - calculatedHeight;
    }

    return {
      width: calculatedWidth,
      height: calculatedHeight,
      left: min([maxLeft, max([0, Math.round(this.focalPoint.x - calculatedWidth / 2)])]) || 0,
      top: min([maxTop, max([0, Math.round(this.focalPoint.y - calculatedHeight / 2)])]) || 0,
    };
  }
}

interface Crop {
  width: number;
  height: number;
  left: number;
  top: number;
}

const widthFromAspectRatio = (height: number, aspectRatio: number) => {
  return Math.round(height * aspectRatio);
};

const heightFromAspectRatio = (width: number, aspectRatio: number) => {
  return Math.round(width / aspectRatio);
};
