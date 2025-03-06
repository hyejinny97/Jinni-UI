import type { ColorType } from '@/types/color';
import type { VariantType, SizeType } from './Button';
import { lighten } from '@/utils/colorLuminance';

export const getColorStyle = ({
  color,
  variant
}: {
  color: ColorType;
  variant: VariantType;
}) => {
  const subtleColor = lighten(color, 0.8);
  const WHITE: ColorType = 'white';
  const TRANSPARENT: ColorType = 'transparent';

  let buttonColorStyle, iconColorStyle, circularProgressColor;
  switch (variant) {
    case 'filled':
      buttonColorStyle = {
        backgroundColor: color,
        color: WHITE,
        borderColor: color
      };
      iconColorStyle = {
        fill: WHITE
      };
      circularProgressColor = WHITE;
      break;
    case 'outlined':
      buttonColorStyle = {
        backgroundColor: TRANSPARENT,
        color: color,
        borderColor: color
      };
      iconColorStyle = {
        fill: color
      };
      circularProgressColor = color;
      break;
    case 'text':
      buttonColorStyle = {
        backgroundColor: TRANSPARENT,
        color: color,
        borderColor: TRANSPARENT
      };
      iconColorStyle = {
        fill: color
      };
      circularProgressColor = color;
      break;
    case 'subtle-filled':
      buttonColorStyle = {
        backgroundColor: subtleColor,
        color: color,
        borderColor: subtleColor
      };
      iconColorStyle = {
        fill: color
      };
      circularProgressColor = color;
      break;
  }

  return { buttonColorStyle, iconColorStyle, circularProgressColor };
};

export const getCircularProgressSize = (size: SizeType) => {
  const circularProgressSizeMap = { sm: 18, md: 20, lg: 22 };
  return circularProgressSizeMap[size];
};
