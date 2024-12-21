import { MenuProps, OriginType } from './Menu';

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
  anchorEl,
  anchorOrigin,
  anchorPosition
}: Pick<MenuProps, 'anchorEl' | 'anchorPosition'> &
  Required<
    Pick<MenuProps, 'anchorReference' | 'anchorOrigin'>
  >): PositionType => {
  if (anchorReference === 'anchorPosition' && anchorPosition) {
    return anchorPosition;
  }
  if (anchorReference === 'anchorEl' && anchorEl && anchorOrigin) {
    return getAnchorElCoordinate({ anchorEl, anchorOrigin });
  }
  throw new Error('Anchor Coordinate을 알 수 없습니다.');
};

export const getMenuCoordinate = ({
  anchorCoordinate,
  menuOrigin,
  menuEl
}: {
  anchorCoordinate: PositionType;
  menuOrigin: OriginType;
  menuEl: HTMLElement;
}): PositionType => {
  const { top: anchorTop, left: anchorLeft } = anchorCoordinate;
  const { horizontal, vertical } = menuOrigin;
  const { width: menuWidth, height: menuHeight } =
    menuEl.getBoundingClientRect();

  let top, left;
  switch (horizontal) {
    case 'left':
      left = anchorLeft;
      break;
    case 'center':
      left = anchorLeft - menuWidth / 2;
      break;
    case 'right':
      left = anchorLeft - menuWidth;
      break;
    default:
      left = anchorLeft - horizontal;
  }
  switch (vertical) {
    case 'top':
      top = anchorTop;
      break;
    case 'center':
      top = anchorTop - menuHeight / 2;
      break;
    case 'bottom':
      top = anchorTop - menuHeight;
      break;
    default:
      top = anchorTop - vertical;
  }

  return { top, left };
};