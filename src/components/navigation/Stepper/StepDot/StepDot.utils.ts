import { ColorType, JinniColor } from '@/types/color';
import { VariantType } from './StepDot';
import { getCloserToWhiteOrBlack } from '@/utils/colorLuminance';
import { getColorWithAlpha } from '@/utils/colorAlpha';

type Props = {
  color: Exclude<ColorType, JinniColor>;
  variant: VariantType;
};

export const getDotColorStyle = ({ color, variant }: Props) => {
  const closerColor: ColorType = getCloserToWhiteOrBlack(color);
  const contrastColor: ColorType = closerColor === 'white' ? 'black' : 'white';
  const subtleColor = getColorWithAlpha(color, 0.3);
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
