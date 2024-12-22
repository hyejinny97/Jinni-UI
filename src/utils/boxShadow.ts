import { ElevationLevelType } from '@/types/elevation';

export const getJinniBoxShadowValue = (elevationLevel: ElevationLevelType) => {
  const rootEl = document.querySelector(':root');
  if (!rootEl) throw Error('root element를 가져오지 못함');

  const rootStyles = window.getComputedStyle(rootEl);
  const boxShadowValue = rootStyles.getPropertyValue(
    `--jinni-box-shadow-${elevationLevel}`
  );
  if (!boxShadowValue)
    throw Error(`'${elevationLevel}' level의 box-shadow는 존재하지 않습니다`);

  return boxShadowValue;
};
