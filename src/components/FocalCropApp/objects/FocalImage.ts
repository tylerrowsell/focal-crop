import { max, min } from "lodash";
import { Coordinate, Dimension, Region, StoredImage } from "../types";

export class FocalImage {
  key: string;
  url: string;
  focalPoint: Coordinate;
  safeZone: Region;
  strictSafeZone: Boolean;
  width: number;
  height: number;
  constructor(image: StoredImage){
    this.key = image.key;
    this.url = image.url;
    this.focalPoint = image.focalPoint;
    this.safeZone = image.safeZone;
    this.strictSafeZone = image.strictSafeZone;
    this.width = image.width;
    this.height = image.height;
  }
  get safeZoneWidth(){
    return this.safeZone.max.x - this.safeZone.min.x;
  }

  get safeZoneHeight(){
    return this.safeZone.max.y - this.safeZone.min.y;
  }

  get safeZoneCenter(): Coordinate{
    return {
      x: this.safeZone.min.x + (this.safeZone.max.x - this.safeZone.min.x) / 2,
      y: this.safeZone.min.y + (this.safeZone.max.y - this.safeZone.min.y) / 2
    }
  }
  crop(requestedWidth: number, requestedHeight: number): Crop{
    const {width: adjustedWidth, height: adjustedHeight} = adjustedDimensions(
      {
        width: this.width,
        height: this.height
      },
      {
        width: requestedWidth,
        height: requestedHeight
      }
    )
    if(this.strictSafeZone) return cropAttributesToCrop(this.generateStrict(adjustedWidth, adjustedHeight));
    return cropAttributesToCrop(this.generateFlexible(adjustedWidth, adjustedHeight));
  }

  generateStrict(width: number, height: number): CropAttributes {
    const requestedAspectRatio = width/height;
    
    if(width >= this.safeZoneWidth && height >= this.safeZoneHeight){
      return {
        dimensions: {width: width, height: height},
        centerPoint: this.safeZoneCenter
      }
    }
    if(width < this.safeZoneWidth && height >= this.safeZoneHeight){
      return {
        dimensions: {width: width, height: height},
        centerPoint: {
          x: this.focalPoint.x,
          y: this.safeZoneCenter.y,
        }
      }
    }
    if(width >= this.safeZoneWidth && height < this.safeZoneHeight){
      return {
        dimensions: {width: width, height: height},
        centerPoint: {
          x: this.safeZoneCenter.x,
          y: this.focalPoint.y,
        }
      }
    }
        
    const maxSafeZone = max([this.safeZoneWidth, this.safeZoneHeight]) || 0;
    return {
      dimensions: {width: widthFromAspectRatio(maxSafeZone, requestedAspectRatio), height: heightFromAspectRatio(maxSafeZone, requestedAspectRatio)},
      centerPoint: {
        x: maxSafeZone === this.safeZoneWidth ? this.safeZoneCenter.x : this.focalPoint.x,
        y: maxSafeZone === this.safeZoneHeight ? this.safeZoneCenter.y : this.focalPoint.y,
      }
    }
  }
      
  generateFlexible(width: number, height: number): CropAttributes{
    const requestedAspectRatio = width/height;
    if(width >= this.safeZoneWidth && height >= this.safeZoneHeight){
      return {
        dimensions: {width: width, height: height},
        centerPoint: this.safeZoneCenter
      }
    }
    if(width < this.safeZoneWidth && height >= this.safeZoneHeight){
      return {
        dimensions: {width: widthFromAspectRatio(this.safeZoneHeight, requestedAspectRatio), height: this.safeZoneHeight},
        centerPoint: {
          x: this.safeZoneCenter.x,
          y: this.focalPoint.y,
        }
      }
    }
    if(width >= this.safeZoneWidth && height < this.safeZoneHeight){
      return {
        dimensions: {width: this.safeZoneWidth, height: heightFromAspectRatio(this.safeZoneWidth, requestedAspectRatio)},
        centerPoint: {
          x: this.focalPoint.x,
          y: this.safeZoneCenter.y,
        }
      }
    }
    const maxSafeZone = max([this.safeZoneWidth, this.safeZoneHeight]) || 0;
    const dimensions = {
      width: this.safeZoneWidth, 
      height: heightFromAspectRatio(this.safeZoneWidth, requestedAspectRatio)
    }
    if(maxSafeZone === height){
      dimensions.width = widthFromAspectRatio(this.safeZoneHeight, requestedAspectRatio)
      dimensions.height = this.safeZoneHeight;
    }
    return {
      dimensions: dimensions,
      centerPoint: {
        x: maxSafeZone === this.safeZoneWidth ? this.focalPoint.x :  this.safeZoneCenter.x,
        y: maxSafeZone === this.safeZoneHeight ?  this.focalPoint.y : this.safeZoneCenter.y,
      }
    }
  }
};

interface Crop {
  width: number
  height: number
  left: number
  top: number
}

interface CropAttributes {
  dimensions: Dimension;
  centerPoint: Coordinate
}

const adjustedDimensions = (dimensions: Dimension, requestedDimensions: Dimension) => {
  const {width, height} = dimensions;
  const {width: rWidth, height: rHeight} = requestedDimensions;
  const requestedAspectRatio = rWidth/rHeight;

  if(width >= rWidth && height >= rHeight ){
    return {width: rWidth, height: rHeight}
  }

  if(width < rWidth && height >= rHeight ){
    return {width: width, height: heightFromAspectRatio(width,requestedAspectRatio)}
  }

  if(width >= rWidth && height < rHeight ){
    return {width: widthFromAspectRatio(height, requestedAspectRatio), height: height}
  }
  const smallestDimension = min([width, height]) || 0;
  return {
    width: width === smallestDimension ? width : widthFromAspectRatio(height, requestedAspectRatio),
    height: height === smallestDimension ? height : heightFromAspectRatio(width, requestedAspectRatio)
  }
}

const widthFromAspectRatio = (height: number, aspectRatio: number) => {
  return Math.round(height * aspectRatio);
}

const heightFromAspectRatio = (width: number, aspectRatio: number) => {
  return Math.round(width / aspectRatio);
}

const cropAttributesToCrop = (cropAttributes: CropAttributes): Crop => {
  const {centerPoint: {x, y}, dimensions: {width, height}} = cropAttributes;
  return {
    left: Math.round(x - width/2),
    top: Math.round(y - height/2),
    width,
    height
  }
}