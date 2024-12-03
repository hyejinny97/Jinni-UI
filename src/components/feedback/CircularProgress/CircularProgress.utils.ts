import { SizeType, SizeKeyword } from './CircularProgress';

const isSizeKeyword = (size: SizeType): size is SizeKeyword =>
  ['sm', 'md', 'lg'].some((keyword) => keyword === size);

export const getComputedSize = (size: SizeType) => {
  if (isSizeKeyword(size)) {
    const sizeMap = { sm: 16, md: 32, lg: 48 };
    return sizeMap[size];
  }
  return size;
};
