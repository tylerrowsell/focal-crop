/* eslint-disable no-mixed-operators */

import {clamp, max, min} from 'lodash';

import {CropProp, ImageryProps, Region, StoredImage} from '../types';

class Image {
  naturalWidth: number;
  naturalHeight: number;
  constructor(width: number, height: number) {
    this.naturalWidth = width;
    this.naturalHeight = height;
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

  crop({requestedHeight = 1, requestedWidth = 1, cropTop: liquidTop, cropLeft: liquidLeft, cropWidth: liquidCropWidth, cropHeight: liquidCropHeight}: CropProp): ImageryProps {
    // if (some([cw, ch, cl, ct]) && !every([cw, ch, cl, ct])) {
    //   throw 'Invalid Liquid Params';
    // }

    const rr = clamp(min([this.naturalWidth / requestedWidth, this.naturalHeight / requestedHeight]) || 1, 0, 1);

    const liquidWidth = requestedWidth * rr;
    const liquidHeight = requestedHeight * rr;

    let cw = liquidCropWidth || this.focalRegion.cropWidth;
    let ch = liquidCropHeight || this.focalRegion.cropHeight;
    let cl = liquidLeft || this.focalRegion.cropLeft;
    let ct = liquidTop || this.focalRegion.cropTop;

    const focalRegionCenterX = cl + cw * 0.5;
    const focalRegionCenterY = ct + ch * 0.5;
    const scale = max([cw / liquidWidth, ch / liquidHeight]) || 1;

    const longestCropDimension = max([liquidWidth * scale, liquidHeight * scale]) || 1;
    const shortestNaturalDimension = min([this.naturalWidth, this.naturalHeight]) || 1;
    const fittingScale = clamp(shortestNaturalDimension / longestCropDimension, 0, 1);

    cw = liquidWidth * scale * fittingScale;
    ch = liquidHeight * scale * fittingScale;

    cl = focalRegionCenterX - cw * 0.5;
    ct = focalRegionCenterY - ch * 0.5;

    cl = clamp(cl, 0, this.naturalWidth - cw);
    ct = clamp(ct, 0, this.naturalWidth - ch);

    return {
      height: liquidHeight.toFixed(0),
      width: liquidWidth.toFixed(0),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      crop_top: ct.toFixed(0),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      crop_left: cl.toFixed(0),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      crop_width: cw.toFixed(0),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      crop_height: ch.toFixed(0),
      crop: 'region',
    };
  }
}
