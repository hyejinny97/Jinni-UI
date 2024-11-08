import { getJinniColorValue } from '@/utils/getJinniColorValue';

const COLOR_PROPERTIES = [
  'color',
  'backgroundColor',
  'borderColor',
  'outlineColor',
  'textDecorationColor',
  'caretColor',
  'columnRuleColor',
  'fill',
  'stroke'
];

const editColor = (color: React.CSSProperties[keyof React.CSSProperties]) => {
  if (typeof color !== 'string') return color;

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
    const isColorProperty = COLOR_PROPERTIES.includes(propName);
    return {
      ...rst,
      [propName]: isColorProperty ? editColor(propValue) : propValue
    };
  }, {} as React.CSSProperties);

  return editedStyle;
};
