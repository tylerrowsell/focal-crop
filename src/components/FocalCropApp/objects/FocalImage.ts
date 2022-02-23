/* eslint-disable no-mixed-operators */

import {clamp, every, max, min, some} from 'lodash';

import {CropProp, Region, StoredImage} from '../types';

class Image {
  naturalWidth: number;
  naturalHeight: number;
  constructor(width: number, height: number) {
    this.naturalWidth = width;
    this.naturalHeight = height;
  }

  get dimensions() {
    return {width: this.naturalWidth, height: this.naturalHeight};
  }

  get aspectRatio() {
    return this.naturalWidth / this.naturalHeight;
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
  focalRegion: Region;
  constructor(image: StoredImage) {
    super(image.naturalWidth, image.naturalHeight);
    this.key = image.key;
    this.url = image.url;
    this.focalRegion = image.focalRegion;
  }

  crop({requestedHeight: liquidHeight, requestedWidth: liquidWidth, cropTop: liquidTop, cropLeft: liquidLeft, cropWidth: liquidCropWidth, cropHeight: liquidCropHeight}: CropProp): CropProp {
    // if (some([cw, ch, cl, ct]) && !every([cw, ch, cl, ct])) {
    //   throw 'Invalid Liquid Params';
    // }

    // const requestedWidth = liquidWidth || widthFromAspectRatio(liquidHeight, this.aspectRatio);
    // const requestedHeight = liquidWidth || widthFromAspectRatio(liquidWidth, this.aspectRatio);
    // if (liquidWidth && liquidHeight) {
      // const requestedImage = new Image(liquidWidth, liquidHeight)

    let cw = liquidCropWidth || this.focalRegion.cropWidth;
    let ch = liquidCropHeight || this.focalRegion.cropHeight;
    let cl = liquidLeft || this.focalRegion.cropLeft;
    let ct = liquidTop || this.focalRegion.cropTop;

    /*
    500 / 3400, 500 / 1400
    .147, .357
    .147

    3400 / 500, 1400 / 500
    6.8, 2.8
    2.8
    requestedImage.width * scale, requestedImage.height * scale

    500 * 2.8, 500, 2.8
    1400, 1400
    */

    if (liquidHeight && liquidWidth) {
      const centerX = cl + cw * 0.5;
      const centerY = ct + ch * 0.5;


      const scale = max([cw / liquidWidth, ch / liquidHeight]) || 1;
      const longestCropDimension = max([liquidWidth * scale, liquidHeight * scale]) || 1;
      const shortestNaturalDimension = min([this.naturalWidth, this.naturalHeight]) || 1;

      // 2731 / 3400

      const fittingScale = shortestNaturalDimension / longestCropDimension;


      cw = Math.round(liquidWidth * scale * fittingScale);
      ch = Math.round(liquidHeight * scale * fittingScale);
      cl = Math.round(centerX - cw * 0.5);
      ct = Math.round(centerY - ch * 0.5);

      cl = clamp(cl, 0, this.naturalWidth - cw);
      ct = clamp(ct, 0, this.naturalWidth - ch);
    }


    return {
      requestedHeight: liquidHeight,
      requestedWidth: liquidWidth,
      cropTop: ct,
      cropLeft: cl,
      cropWidth: cw,
      cropHeight: ch,
    };
    // }
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
