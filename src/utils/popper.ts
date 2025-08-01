import { PopperType, OriginType } from '@/types/popper';

type PositionType = {
  top: number;
  left: number;
};

const getAnchorElCoordinate = ({
  anchorEl,
  anchorOrigin
}: {
  anchorEl: HTMLElement;
  anchorOrigin: OriginType;
}): PositionType => {
  const {
    top: anchorTop,
    bottom: anchorBottom,
    left: anchorLeft,
    right: anchorRight,
    width: anchorWidth,
    height: anchorHeight
  } = anchorEl.getBoundingClientRect();
  const { horizontal, vertical } = anchorOrigin;

  let top, left;
  switch (horizontal) {
    case 'left':
      left = anchorLeft;
      break;
    case 'center':
      left = anchorLeft + anchorWidth / 2;
      break;
    case 'right':
      left = anchorRight;
      break;
    default:
      left = anchorLeft + horizontal;
  }
  switch (vertical) {
    case 'top':
      top = anchorTop;
      break;
    case 'center':
      top = anchorTop + anchorHeight / 2;
      break;
    case 'bottom':
      top = anchorBottom;
      break;
    default:
      top = anchorTop + vertical;
  }

  return { top, left };
};

export const getAnchorCoordinate = ({
  anchorReference,
  anchorElRef,
  anchorOrigin,
  anchorPosition
}: Partial<
  Pick<PopperType, 'anchorElRef' | 'anchorPosition' | 'anchorOrigin'>
> &
  Pick<PopperType, 'anchorReference'>): PositionType => {
  if (anchorReference === 'anchorPosition' && anchorPosition) {
    return anchorPosition;
  }
  if (anchorReference === 'anchorEl' && anchorElRef?.current && anchorOrigin) {
    return getAnchorElCoordinate({
      anchorEl: anchorElRef.current,
      anchorOrigin
    });
  }
  throw new Error('Anchor Coordinate를 알 수 없습니다.');
};

export const getPopperCoordinate = ({
  anchorCoordinate,
  popperOrigin,
  popperEl
}: {
  anchorCoordinate: PositionType;
  popperOrigin: OriginType;
  popperEl: HTMLElement;
}): PositionType => {
  const { top: anchorTop, left: anchorLeft } = anchorCoordinate;
  const { horizontal, vertical } = popperOrigin;
  const { width: popperWidth, height: popperHeight } =
    popperEl.getBoundingClientRect();

  let top, left;
  switch (horizontal) {
    case 'left':
      left = anchorLeft;
      break;
    case 'center':
      left = anchorLeft - popperWidth / 2;
      break;
    case 'right':
      left = anchorLeft - popperWidth;
      break;
    default:
      left = anchorLeft - horizontal;
  }
  switch (vertical) {
    case 'top':
      top = anchorTop;
      break;
    case 'center':
      top = anchorTop - popperHeight / 2;
      break;
    case 'bottom':
      top = anchorTop - popperHeight;
      break;
    default:
      top = anchorTop - vertical;
  }

  return { top, left };
};
