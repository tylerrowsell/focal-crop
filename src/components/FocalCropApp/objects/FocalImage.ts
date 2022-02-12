import { max, min } from "lodash";
import { Coordinate, StoredImage } from "../types";

class Image {
  width: number;
  height: number;
  constructor(width: number, height: number){
    this.width = width;
    this.height = height;
  }

  get dimensions(){
    return {width: this.width, height: this.height}
  }
  get aspectRatio() {
    return this.width / this.height;
  }

  get isSquare() {
    return this.aspectRatio === 1
  }

  get isVertical() {
    return this.aspectRatio < 1;
  }

  get isHorizontal() {
    return this.aspectRatio > 1;
  }
}
export class FocalImage extends Image{
  key: string;
  url: string;
  focalPoint: Coordinate;
  constructor(image: StoredImage){
    super(image.width, image.height)
    this.key = image.key;
    this.url = image.url;
    this.focalPoint = image.focalPoint;
  }
  crop(requestedWidth: number, requestedHeight: number): Crop{
    const requestedImage = new Image(requestedWidth, requestedHeight)
    if((requestedImage.isSquare && this.isVertical) ||
      (requestedImage.isHorizontal)
      ){
      const calculatedHeight = Math.round(heightFromAspectRatio(this.width, requestedImage.aspectRatio))
      const maxTop = this.height - calculatedHeight;
      return {
        width: this.width,
        height: calculatedHeight,
        left: 0,
        top: min([maxTop, max([0, Math.round(this.focalPoint.y - calculatedHeight / 2)])]) || 0,
      }
    }
    const calculatedWidth = Math.round(widthFromAspectRatio(this.height, requestedImage.aspectRatio))
    const maxLeft = this.width - calculatedWidth;
    return {
      width: calculatedWidth,
      height: this.height,
      left: min([maxLeft, max([0, Math.round(this.focalPoint.x - calculatedWidth / 2)])]) || 0,
      top: 0
    }
  }
};

interface Crop {
  width: number
  height: number
  left: number
  top: number
}

const widthFromAspectRatio = (height: number, aspectRatio: number) => {
  return Math.round(height * aspectRatio);
}

const heightFromAspectRatio = (width: number, aspectRatio: number) => {
  return Math.round(width / aspectRatio);
}
