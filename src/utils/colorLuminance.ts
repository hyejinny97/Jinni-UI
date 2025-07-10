import { ColorType, RGBA } from '@/types/color';
import { toRgbaObject } from '@/utils/colorFormat';

const adjustLuminance = (color: ColorType, luminance: number): RGBA => {
  if (luminance < -1 || luminance > 1) {
    throw new Error('luminance는 반드시 -1과 1 사이여야 합니다.');
  }

  const adjustChannel = (channel: number, luminance: number): number =>
    Math.min(
      Math.max(Math.round(channel + (255 - channel) * luminance), 0),
      255
    );

  const { r, g, b, a } = toRgbaObject(color);
  return `rgba(${adjustChannel(r, luminance)},${adjustChannel(g, luminance)},${adjustChannel(b, luminance)},${a})`;
};

export const lighten = (color: ColorType, luminance: number) =>
  adjustLuminance(color, luminance);
export const darken = (color: ColorType, luminance: number) =>
  adjustLuminance(color, -luminance);
