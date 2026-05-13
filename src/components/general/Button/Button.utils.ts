import type { ColorType, JinniColor } from '@/types/color';
import type { ButtonProps } from './Button';
import {
  lighten,
  darken,
  getCloserToWhiteOrBlack
} from '@/utils/colorLuminance';

type Props = {
  color: Exclude<ColorType, JinniColor>;
  variant: NonNullable<ButtonProps['variant']>;
};

export const getColorStyle = ({ color, variant }: Props) => {
  const closerColor = getCloserToWhiteOrBlack(color);
  const contrastColor: ColorType = closerColor === 'white' ? 'black' : 'white';
  const subtleColor =
    closerColor === 'white' ? darken(color, 0.8) : lighten(color, 0.8);
  const TRANSPARENT: ColorType = 'transparent';

  let textColor, backgroundColor, borderColor;
  switch (variant) {
    case 'filled':
      textColor = contrastColor;
      backgroundColor = color;
      borderColor = color;
      break;
    case 'outlined':
      textColor = color;
      backgroundColor = TRANSPARENT;
      borderColor = color;
      break;
    case 'text':
      textColor = color;
      backgroundColor = TRANSPARENT;
      borderColor = TRANSPARENT;
      break;
    case 'subtle-filled':
      textColor = color;
      backgroundColor = subtleColor;
      borderColor = subtleColor;
  }
  return { textColor, backgroundColor, borderColor };
};
