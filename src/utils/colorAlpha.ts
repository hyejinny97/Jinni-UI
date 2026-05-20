import { ColorType, RGBA, JinniColor } from '@/types/color';
import { toRgbaObject } from '@/utils/colorFormat';

export const getColorWithAlpha = (
  color: Exclude<ColorType, JinniColor>,
  alpha: number
): RGBA => {
  if (alpha < 0 || alpha > 1) {
    throw new Error('alpha는 0 이상 1 이하의 값을 가집니다.');
  }
  const { r, g, b } = toRgbaObject(color);
  return `rgba(${r},${g},${b},${alpha})`;
};
