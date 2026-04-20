export const findAllIndex = <T extends string | number | HTMLElement>(
  array: Array<T>,
  callback: (element: T) => boolean
): Array<number> => {
  const elementIdxList: Array<number> = [];
  array.forEach((element, idx) => {
    if (callback(element)) elementIdxList.push(idx);
  });
  return elementIdxList;
};

export const findLastIndex = <T extends string | number | HTMLElement>(
  array: Array<T>,
  callback: (element: T) => boolean
): number => {
  for (let idx = array.length - 1; idx >= 0; idx--) {
    if (callback(array[idx])) {
      return idx;
    }
  }
  return -1;
};
