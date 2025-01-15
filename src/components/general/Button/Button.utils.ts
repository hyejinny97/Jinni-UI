import type { ColorType } from '@/types/color';
import type { VariantType, SizeType } from './Button';
import { lighten } from '@/utils/colorLuminance';

export const getColorStyle = ({
  color,
  variant,
  disabled
}: {
  color: ColorType;
  variant: VariantType;
  disabled: boolean;
}) => {
  const subtleColor = lighten(color, 0.8);
  const disabledColor = lighten(color, 0.5);
  const disabledSubtleColor = lighten(subtleColor, 0.5);
  const WHITE: ColorType = 'white';
  const TRANSPARENT: ColorType = 'transparent';

  const computedColor = disabled ? disabledColor : color;
  const computedSubtleColor = disabled ? disabledSubtleColor : subtleColor;

  let buttonColorStyle, iconColorStyle, circularProgressColor;
  switch (variant) {
    case 'filled':
      buttonColorStyle = {
        backgroundColor: computedColor,
        color: WHITE,
        borderColor: computedColor
      };
      iconColorStyle = {
        fill: WHITE
      };
      circularProgressColor = WHITE;
      break;
    case 'outlined':
      buttonColorStyle = {
        backgroundColor: TRANSPARENT,
        color: computedColor,
        borderColor: computedColor
      };
      iconColorStyle = {
        fill: computedColor
      };
      circularProgressColor = computedColor;
      break;
    case 'text':
      buttonColorStyle = {
        backgroundColor: TRANSPARENT,
        color: computedColor,
        borderColor: TRANSPARENT
      };
      iconColorStyle = {
        fill: computedColor
      };
      circularProgressColor = computedColor;
      break;
    case 'subtle-filled':
      buttonColorStyle = {
        backgroundColor: computedSubtleColor,
        color: computedColor,
        borderColor: computedSubtleColor
      };
      iconColorStyle = {
        fill: computedColor
      };
      circularProgressColor = computedColor;
      break;
  }

  return { buttonColorStyle, iconColorStyle, circularProgressColor };
};

export const getCircularProgressSize = (size: SizeType) => {
  const circularProgressSizeMap = { sm: 18, md: 20, lg: 22 };
  return circularProgressSizeMap[size];
};
