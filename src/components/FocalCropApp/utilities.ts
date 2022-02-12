import { Dimension } from "./types";

export const getImageDimensions = async (url: string) => {
  return new Promise<Dimension>((resolve)=> {
    const img = new Image();
    img.addEventListener("load", function() {
      const result = {width: this.naturalWidth, height: this.naturalHeight}
        resolve(result);
    });
    img.src = url;
  });
}

export const arrayRemove = (array: any[], index: number) => {
  if (index >= array.length) throw 'remove index larger than array';

  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
}