import type { ColorType, JinniColor } from '@/types/color';
import type { ButtonProps } from './Button';
import { getCloserToWhiteOrBlack } from '@/utils/colorLuminance';
import { getColorWithAlpha } from '@/utils/colorAlpha';

type Props = {
  color: Exclude<ColorType, JinniColor>;
  variant: NonNullable<ButtonProps['variant']>;
};

export const getColorStyle = ({ color, variant }: Props) => {
  const closerColor: ColorType = getCloserToWhiteOrBlack(color);
  const contrastColor: ColorType = closerColor === 'white' ? 'black' : 'white';
  const subtleColor = getColorWithAlpha(color, 0.3);
  const TRANSPARENT: ColorType = 'transparent';

  let textColor, backgroundColor, borderColor, overlayColor, rippleColor;
  switch (variant) {
    case 'filled':
      textColor = contrastColor;
      backgroundColor = color;
      borderColor = color;
      overlayColor = rippleColor = contrastColor;
      break;
    case 'outlined':
      textColor = color;
      backgroundColor = TRANSPARENT;
      borderColor = color;
      overlayColor = rippleColor = undefined;
      break;
    case 'text':
      textColor = color;
      backgroundColor = TRANSPARENT;
      borderColor = TRANSPARENT;
      overlayColor = rippleColor = undefined;
      break;
    case 'subtle-filled':
      textColor = color;
      backgroundColor = subtleColor;
      borderColor = subtleColor;
      overlayColor = rippleColor = undefined;
  }
  return { textColor, backgroundColor, borderColor, overlayColor, rippleColor };
};
