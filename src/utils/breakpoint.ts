import { BreakpointType } from '@/types/breakpoint';

export const getJinniBreakPointValue = (breakpoint: BreakpointType) => {
  const rootEl = document.querySelector(':root');
  if (!rootEl) throw Error('root element를 가져오지 못함');

  const rootStyles = window.getComputedStyle(rootEl);
  const breakpointValue = rootStyles.getPropertyValue(
    `--jinni-breakpoint-${breakpoint}`
  );
  if (!breakpointValue)
    throw Error(`'${breakpoint}' breakpoint는 존재하지 않습니다`);

  return Number(breakpointValue);
};
