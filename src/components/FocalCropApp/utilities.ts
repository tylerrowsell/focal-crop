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