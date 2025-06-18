import { ColorType, HEX } from '@/types/color';
import { toRgbaObject, rgbaObjectToHex } from '@/utils/colorFormat';

const adjustLuminance = (color: ColorType, luminance: number): HEX => {
  if (luminance < -1 || luminance > 1) {
    throw new Error('luminance는 반드시 -1과 1 사이여야 합니다.');
  }

  const adjustChannel = (channel: number, luminance: number): number =>
    Math.round(channel + (255 - channel) * luminance);

  const { r, g, b, a } = toRgbaObject(color);
  const adjustedColor = {
    r: adjustChannel(r, luminance),
    g: adjustChannel(g, luminance),
    b: adjustChannel(b, luminance),
    a
  };

  return rgbaObjectToHex(adjustedColor);
};

export const lighten = (color: ColorType, luminance: number) =>
  adjustLuminance(color, luminance);
export const darken = (color: ColorType, luminance: number) =>
  adjustLuminance(color, -luminance);
