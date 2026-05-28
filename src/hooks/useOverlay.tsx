import { useCallback, useMemo } from 'react';
import { ColorType, JinniColor } from '@/types/color';
import { OverlayAlphaType } from '@/types/overlay';
import { toRgbaObject } from '@/utils/colorFormat';
import useColor from '@/hooks/useColor';
import useJinni from '@/hooks/useJinni';

type AlphaPercent = `${number}%`;
type AlphaType = OverlayAlphaType | string | AlphaPercent;
type OverlayValue =
  `linear-gradient(rgba(${number},${number},${number},${number | string}))`;
type OverlayProps = {
  color: ColorType;
  alpha: AlphaType;
};

const PERCENT_REGEXP = /^(100(\.0+)?|\d{1,2}(\.\d+)?)(?:\s*%)$/;

const isPercentAlpha = (val: unknown): val is AlphaPercent =>
  typeof val === 'string' && PERCENT_REGEXP.test(val);

const generateOverlayValue = (
  r: number,
  g: number,
  b: number,
  alpha: number | string
): OverlayValue => {
  return `linear-gradient(rgba(${r},${g},${b},${alpha}))`;
};

function useOverlay(props: OverlayProps): OverlayValue;
function useOverlay(props: OverlayProps[]): OverlayValue[];
function useOverlay(
  props: OverlayProps | OverlayProps[]
): OverlayValue | OverlayValue[] {
  const { overlayAlpha } = useJinni();
  const colorArr = useMemo<ColorType[]>(
    () =>
      Array.isArray(props) ? props.map((prop) => prop.color) : [props.color],
    [props]
  );
  const normalizedColorArr = useColor(colorArr);

  const isOverlayAlphaType = useCallback(
    (alpha: AlphaType): alpha is OverlayAlphaType | string =>
      alpha in overlayAlpha,
    [overlayAlpha]
  );

  const resolve = (
    normalizedColor: Exclude<ColorType, JinniColor>,
    alpha: AlphaType
  ) => {
    const { r, g, b } = toRgbaObject(normalizedColor);
    if (isOverlayAlphaType(alpha)) {
      return generateOverlayValue(r, g, b, overlayAlpha[alpha]);
    }
    if (isPercentAlpha(alpha)) {
      return generateOverlayValue(r, g, b, alpha);
    }
    throw new Error('alpha prop의 타입이 올바르지 않습니다.');
  };

  if (Array.isArray(props)) {
    return normalizedColorArr.map((normalizedColor, idx) =>
      resolve(normalizedColor, props[idx].alpha)
    );
  }

  return resolve(normalizedColorArr[0], props.alpha);
}

export default useOverlay;
