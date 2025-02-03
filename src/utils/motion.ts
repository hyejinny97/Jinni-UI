import { EasingType, DurationType } from '@/types/motion';

export const getJinniEasingValue = (easing: EasingType) => {
  const rootEl = document.querySelector(':root');
  if (!rootEl) throw Error('root element를 가져오지 못함');

  const rootStyles = window.getComputedStyle(rootEl);
  const easingValue = rootStyles.getPropertyValue(`--jinni-easing-${easing}`);
  if (!easingValue) throw Error(`'${easing}' easing은 존재하지 않습니다`);

  return easingValue;
};

export const getJinniDurationValue = (duration: DurationType) => {
  const rootEl = document.querySelector(':root');
  if (!rootEl) throw Error('root element를 가져오지 못함');

  const rootStyles = window.getComputedStyle(rootEl);
  const durationValue = rootStyles.getPropertyValue(
    `--jinni-duration-${duration}`
  );
  if (!durationValue) throw Error(`'${duration}' duration은 존재하지 않습니다`);

  return durationValue;
};
