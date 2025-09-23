import { ColorType, JinniColor } from '@/types/color';
import { toRgbaObject } from '@/utils/colorFormat';
import { darken, lighten } from '@/utils/colorLuminance';
import { RootInputBaseProps } from './InputBase';

type Props = {
  variant: RootInputBaseProps['variant'];
  color: Exclude<ColorType, JinniColor>;
  focusedColor: Exclude<ColorType, JinniColor>;
};

export const getColorStyle = ({ variant, color, focusedColor }: Props) => {
  const { r, g, b } = toRgbaObject(focusedColor);
  let baseColor, hoverColor, computedFocusedColor;
  switch (variant) {
    case 'outlined': {
      baseColor = color;
      hoverColor = darken(color, 0.5);
      computedFocusedColor = focusedColor;
      break;
    }
    case 'underlined': {
      baseColor = color;
      hoverColor = darken(color, 0.5);
      computedFocusedColor = focusedColor;
      break;
    }
    case 'filled': {
      baseColor = lighten(color, 0.8);
      computedFocusedColor = `rgba(${r},${g},${b}, 0.1)`;
      break;
    }
    case 'borderless': {
      computedFocusedColor = `rgba(${r},${g},${b}, 0.1)`;
    }
  }
  return {
    '--base-color': baseColor,
    '--hover-color': hoverColor,
    '--focused-color': computedFocusedColor
  };
};
