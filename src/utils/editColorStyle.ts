export const getJinniColorValue = (color: string) => {
  const rootEl = document.querySelector(':root');
  if (!rootEl) throw Error('root element를 가져오지 못함');

  const rootStyles = window.getComputedStyle(rootEl);
  const colorValue = rootStyles.getPropertyValue(`--jinni-color-${color}`);
  if (!colorValue) throw Error(`'${color}' 색상은 존재하지 않습니다`);

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
