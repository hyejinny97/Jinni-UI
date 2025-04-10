import { ColorType } from '@/types/color';
import { VariantType } from './StepDot';
import { lighten } from '@/utils/colorLuminance';

export const getDotColorStyle = ({
  color,
  variant
}: {
  color: ColorType;
  variant: VariantType;
}) => {
  const lightenColor = lighten(color, 0.8);
  const WHITE: ColorType = 'white';
  const TRANSPARENT: ColorType = 'transparent';

  let textColor, backgroundColor, borderColor;
  switch (variant) {
    case 'filled':
      textColor = WHITE;
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
      backgroundColor = lightenColor;
      borderColor = lightenColor;
  }
  return { textColor, backgroundColor, borderColor };
};
