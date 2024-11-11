import { CSS_COLOR_PROPERTIES } from '@/constants/css-color-properties';

const getJinniColorValue = (colorVariable: string) => {
  const rootEl = document.querySelector(':root');
  if (!rootEl) throw Error('root element를 가져오지 못함');

  const rootStyles = window.getComputedStyle(rootEl);
  const colorValue = rootStyles.getPropertyValue(
    `--jinni-color-${colorVariable}`
  );
  if (!colorValue) throw Error(`${colorValue} 색상은 존재하지 않습니다`);

  return colorValue;
};

export const editColor = (color: string) => {
  try {
    const jinniColorValue = getJinniColorValue(color);
    return jinniColorValue;
  } catch {
    return color;
  }
};

export const editColorStyle = (
  style: React.CSSProperties | undefined
): React.CSSProperties | undefined => {
  if (!style) return;

  const editedStyle = Object.keys(style).reduce((rst, key) => {
    const propName = key as keyof React.CSSProperties;
    const propValue = style[propName];
    const isColorProperty = CSS_COLOR_PROPERTIES.some(
      (item) => item === propName
    );
    const isStringType = typeof propValue === 'string';
    return {
      ...rst,
      [propName]:
        isColorProperty && isStringType ? editColor(propValue) : propValue
    };
  }, {} as React.CSSProperties);

  return editedStyle;
};
