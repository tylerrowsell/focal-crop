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

  scaleAndCenterCrop({requestedHeight = 1, requestedWidth = 1}: CropProp): ImageryProps {

    // Determine limiting dimension based on original image size and requested size
    const requestedScaledownFactor = clamp(min([this.naturalWidth / requestedWidth, this.naturalHeight / requestedHeight]) as number, 0, 1);

    // If the requested width or height is larger than raw image, change requested width/height to match restricting dimension.
    const adjustedRequestedWidth = requestedWidth * requestedScaledownFactor;
    const adjustedRequestedHeight = requestedHeight * requestedScaledownFactor;

    // Get the focal region
    const {focalLeft, focalTop, focalWidth, focalHeight} = this.focalRegion;

    // Find center of focal region.
    const focalRegionCenterX = focalLeft + focalWidth * 0.5;
    const focalRegionCenterY = focalTop + focalHeight * 0.5;

    // Determine scale factor to maximize the focal region.
    const scale = max([focalWidth / adjustedRequestedWidth, focalHeight / adjustedRequestedHeight]) as number;
    // Scale image to preseve most of the focal region
    let cropWidth = adjustedRequestedWidth * scale;
    let cropHeight = adjustedRequestedHeight * scale;

    const longestCropDimension = max([adjustedRequestedWidth * scale, adjustedRequestedHeight * scale]) as number;
    const shortestNaturalDimension = min([this.naturalWidth, this.naturalHeight]) as number;

    // Determine how much larger focal region is that original image
    const fittingScale = clamp(shortestNaturalDimension / longestCropDimension, 0, 1);

    // Reduce crop to ensure it fits inside bounds of image
    cropWidth *= fittingScale;
    cropHeight *= fittingScale;

    let cropLeft = focalRegionCenterX - cropWidth * 0.5;
    let cropTop = focalRegionCenterY - cropHeight * 0.5;

    cropLeft = clamp(cropLeft, 0, this.naturalWidth - cropWidth);
    cropTop = clamp(cropTop, 0, this.naturalHeight - cropHeight);

    return {
      height: adjustedRequestedHeight.toFixed(0),
      width: adjustedRequestedWidth.toFixed(0),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      crop_top: cropTop.toFixed(0),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      crop_left: cropLeft.toFixed(0),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      crop_width: cropWidth.toFixed(0),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      crop_height: cropHeight.toFixed(0),
      crop: 'region',
    };
  }

  panCrop({requestedHeight = 1, requestedWidth = 1}: CropProp): ImageryProps {

    // Determine limiting dimension based on original image size and requested size
    const requestedScaledownFactor = clamp(min([this.naturalWidth / requestedWidth, this.naturalHeight / requestedHeight]) as number, 0, 1);

    // If the requested width or height is larger than raw image, change requested width/height to match restricting dimension.
    const adjustedRequestedWidth = requestedWidth * requestedScaledownFactor;
    const adjustedRequestedHeight = requestedHeight * requestedScaledownFactor;

    // Get the focal region
    const {focalLeft, focalTop, focalWidth, focalHeight} = this.focalRegion;

    // Find center of focal region.
    const focalRegionCenterX = focalLeft + focalWidth * 0.5;
    const focalRegionCenterY = focalTop + focalHeight * 0.5;

    const fittingScale = min([this.naturalWidth / adjustedRequestedWidth, this.naturalHeight / adjustedRequestedHeight]) as number;

    // Reduce crop to ensure it fits inside bounds of image
    const cropWidth = adjustedRequestedWidth * fittingScale;
    const cropHeight = adjustedRequestedHeight * fittingScale;

    let cropLeft = focalRegionCenterX - cropWidth * 0.5;
    let cropTop = focalRegionCenterY - cropHeight * 0.5;

    cropLeft = clamp(cropLeft, 0, this.naturalWidth - cropWidth);
    cropTop = clamp(cropTop, 0, this.naturalHeight - cropHeight);

    return {
      height: adjustedRequestedHeight.toFixed(0),
      width: adjustedRequestedWidth.toFixed(0),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      crop_top: cropTop.toFixed(0),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      crop_left: cropLeft.toFixed(0),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      crop_width: cropWidth.toFixed(0),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      crop_height: cropHeight.toFixed(0),
      crop: 'region',
    };
  }
}
