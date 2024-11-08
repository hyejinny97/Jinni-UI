import useJinniColor from '@/hooks/useJinniColor';

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

const useEditColorStyle = (style: React.CSSProperties): React.CSSProperties => {
  const jinniColor = useJinniColor();

  const editColor = (color: React.CSSProperties[keyof React.CSSProperties]) => {
    if (typeof color !== 'string') return color;
    if (!(color.includes('theme') || color.includes('palette'))) return color;

    try {
      const steps = color.split('.');
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      let prevColor: any = jinniColor;
      steps.forEach((step) => {
        const nextColor = prevColor[step];
        if (!nextColor) throw new Error(`'${color}' 색상은 존재하지 않습니다.`);
        prevColor = nextColor;
      });

      const editedColor = prevColor;
      if (typeof editedColor !== 'string')
        throw new Error(`'${color}' 색상은 존재하지 않습니다.`);

      return editedColor;
    } catch (error) {
      console.error(error);
    }
  };

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

const useCssStyle = (style: React.CSSProperties) => {
  const newStyle = useEditColorStyle(style);
  return newStyle;
};

export default useCssStyle;
