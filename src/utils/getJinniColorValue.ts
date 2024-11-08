export const getJinniColorValue = (colorVariable: string) => {
  const rootEl = document.querySelector(':root');
  if (!rootEl) throw Error('root element를 가져오지 못함');

  const rootStyles = window.getComputedStyle(rootEl);
  const colorValue = rootStyles.getPropertyValue(
    `--jinni-color-${colorVariable}`
  );
  if (!colorValue) throw Error(`${colorValue} 색상은 존재하지 않습니다`);

  return colorValue;
};
