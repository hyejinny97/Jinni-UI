export const getColorValue = (colorVariable: string) => {
  const rootEl = document.querySelector(':root');
  if (!rootEl) throw Error('root element를 가져오지 못함');

  const rootStyles = window.getComputedStyle(rootEl);
  return rootStyles.getPropertyValue(colorVariable);
};
