import { ColorType, JinniColor } from '@/types/color';
import useJinni from '@/hooks/useJinni';

function useColor(color: ColorType): Exclude<ColorType, JinniColor>;
function useColor(color: ColorType[]): Exclude<ColorType, JinniColor>[];
function useColor(
  color: ColorType | ColorType[]
): Exclude<ColorType, JinniColor> | Exclude<ColorType, JinniColor>[] {
  const {
    color: { palette, scheme }
  } = useJinni();

  const resolve = (c: ColorType): Exclude<ColorType, JinniColor> => {
    if (Object.keys(palette).includes(c)) {
      return palette[c] as Exclude<ColorType, JinniColor>;
    }
    if (Object.keys(scheme).includes(c)) {
      return scheme[c] as Exclude<ColorType, JinniColor>;
    }
    return c as Exclude<ColorType, JinniColor>;
  };

  if (Array.isArray(color)) {
    return color.map(resolve);
  }

  return resolve(color);
}

export default useColor;
