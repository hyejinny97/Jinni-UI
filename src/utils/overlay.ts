import { ElevationLevelType } from '@/types/elevation';

export const getJinniWhiteOverlayValue = (
  elevationLevel: ElevationLevelType
) => {
  const rootEl = document.querySelector(':root');
  if (!rootEl) throw Error('root element를 가져오지 못함');

  const rootStyles = window.getComputedStyle(rootEl);
  const whiteOverlayValue = rootStyles.getPropertyValue(
    `--jinni-white-overlay-${elevationLevel}`
  );
  if (!whiteOverlayValue)
    throw Error(
      `'${elevationLevel}' level의 white-overlay는 존재하지 않습니다`
    );

  return whiteOverlayValue;
};

export const getJinniBlackOverlayValue = (
  elevationLevel: ElevationLevelType
) => {
  const rootEl = document.querySelector(':root');
  if (!rootEl) throw Error('root element를 가져오지 못함');

  const rootStyles = window.getComputedStyle(rootEl);
  const blackOverlayValue = rootStyles.getPropertyValue(
    `--jinni-black-overlay-${elevationLevel}`
  );
  if (!blackOverlayValue)
    throw Error(
      `'${elevationLevel}' level의 black-overlay는 존재하지 않습니다`
    );

  return blackOverlayValue;
};
