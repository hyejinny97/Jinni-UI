import { ColorType } from '@/types/color';
import { toRgbObject } from '@/utils/colorLuminance';

export const adjustColorOpacity = (color: ColorType, opacity: number) => {
  if (!(opacity >= 0 && opacity <= 1)) {
    throw new Error('opacity는 반드시 0이상 1이하여야 합니다.');
  }
  const { r, g, b } = toRgbObject(color);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
