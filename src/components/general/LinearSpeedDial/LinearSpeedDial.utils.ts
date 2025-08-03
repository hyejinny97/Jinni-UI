import { DirectionType } from './LinearSpeedDial';
import {
  HORIZONTAL_CENTER_VERTICAL_TOP,
  HORIZONTAL_CENTER_VERTICAL_BOTTOM,
  HORIZONTAL_LEFT_VERTICAL_CENTER,
  HORIZONTAL_RIGHT_VERTICAL_CENTER
} from './LinearSpeedDial.constants';
import { PlacementType } from '@/types/popper';

export const getAnchorOrigin = (direction: DirectionType) => {
  switch (direction) {
    case 'up':
      return HORIZONTAL_CENTER_VERTICAL_TOP;
    case 'down':
      return HORIZONTAL_CENTER_VERTICAL_BOTTOM;
    case 'left':
      return HORIZONTAL_LEFT_VERTICAL_CENTER;
    case 'right':
      return HORIZONTAL_RIGHT_VERTICAL_CENTER;
  }
};

export const getPopperOrigin = (direction: DirectionType) => {
  switch (direction) {
    case 'up':
      return HORIZONTAL_CENTER_VERTICAL_BOTTOM;
    case 'down':
      return HORIZONTAL_CENTER_VERTICAL_TOP;
    case 'left':
      return HORIZONTAL_RIGHT_VERTICAL_CENTER;
    case 'right':
      return HORIZONTAL_LEFT_VERTICAL_CENTER;
  }
};

export const getTooltipPlacement = (
  direction: DirectionType
): PlacementType => {
  switch (direction) {
    case 'down':
    case 'up':
      return 'left';
    case 'left':
    case 'right':
      return 'top';
  }
};
