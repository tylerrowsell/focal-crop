import {useState} from 'react';

import {CropProp} from '../../../types';
import {arrayRemove} from '../../../utilities';

export const useSizes = (localSizes: CropProp[], forceUpdate: () => void) => {
  const [sizes, setSizes] = useState(localSizes);

  const addSize = (size: CropProp) => {
    setSizes((currentSizes) => {
      currentSizes.push(size);
      localStorage.setItem('localSizes', JSON.stringify(currentSizes));
      return currentSizes;
    });
  };

  const removeSize = (sizeIndex: number) => {
    setSizes((currentSizes) => {
      const newSizes = arrayRemove(currentSizes, sizeIndex);
      localStorage.setItem('localSizes', JSON.stringify(newSizes));
      forceUpdate();
      return newSizes;
    });
  };

  return {
    sizes,
    addSize,
    removeSize,
  };
};
