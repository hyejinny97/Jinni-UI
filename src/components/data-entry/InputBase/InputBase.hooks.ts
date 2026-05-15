import { ColorType } from '@/types/color';
import { toRgbaObject } from '@/utils/colorFormat';
import { darken, lighten } from '@/utils/colorLuminance';
import { RootInputBaseProps } from './InputBase';
import useJinni from '@/hooks/useJinni';
import useColor from '@/hooks/useColor';

type UseColorStyleProps = {
  variant: RootInputBaseProps['variant'];
  color: ColorType;
  focusedColor: ColorType;
};

export const useColorStyle = ({
  variant,
  color,
  focusedColor
}: UseColorStyleProps) => {
  const { theme } = useJinni();
  const [normalizedColor, normalizedFocusedColor] = useColor([
    color,
    focusedColor
  ]);
  const { r, g, b } = toRgbaObject(normalizedFocusedColor);

  let baseColor, hoverColor, computedFocusedColor;
  switch (variant) {
    case 'outlined': {
      baseColor = color;
      hoverColor =
        theme === 'light'
          ? darken(normalizedColor, 0.5)
          : lighten(normalizedColor, 0.5);
      computedFocusedColor = focusedColor;
      break;
    }
    case 'underlined': {
      baseColor = color;
      hoverColor =
        theme === 'light'
          ? darken(normalizedColor, 0.5)
          : lighten(normalizedColor, 0.5);
      computedFocusedColor = focusedColor;
      break;
    }
    case 'filled': {
      baseColor =
        theme === 'light'
          ? lighten(normalizedColor, 0.6)
          : darken(normalizedColor, 0.8);
      hoverColor =
        theme === 'light'
          ? 'var(--jinni-black-overlay-1)'
          : 'var(--jinni-white-overlay-1)';
      computedFocusedColor = `rgba(${r},${g},${b}, 0.3)`;
      break;
    }
    case 'borderless': {
      hoverColor =
        theme === 'light'
          ? 'var(--jinni-black-overlay-1)'
          : 'var(--jinni-white-overlay-1)';
      computedFocusedColor = `rgba(${r},${g},${b}, 0.3)`;
    }
  }

  return {
    '--base-color': baseColor,
    '--hover-color': hoverColor,
    '--focused-color': computedFocusedColor
  };
};
