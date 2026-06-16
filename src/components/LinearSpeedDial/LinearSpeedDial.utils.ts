import { PlacementType } from './LinearSpeedDial';
import {
  HORIZONTAL_CENTER_VERTICAL_TOP,
  HORIZONTAL_CENTER_VERTICAL_BOTTOM,
  HORIZONTAL_LEFT_VERTICAL_CENTER,
  HORIZONTAL_RIGHT_VERTICAL_CENTER
} from './LinearSpeedDial.constants';

export const getAnchorOrigin = (placement: PlacementType) => {
  switch (placement) {
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

export const getPopperOrigin = (placement: PlacementType) => {
  switch (placement) {
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

export const findSpeedDialActionsByLayer = (
  root: HTMLElement
): HTMLElement[] => {
  const result: HTMLElement[] = [];
  const queue: HTMLElement[] = [];

  queue.push(...(Array.from(root.children) as HTMLElement[]));

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.classList.contains('JinniLinearSpeedDialAction')) {
      result.push(current);
      continue;
    }
    queue.push(...(Array.from(current.children) as HTMLElement[]));
  }

  return result;
};

export const getOrientation = (placement: PlacementType) => {
  switch (placement) {
    case 'up':
    case 'down':
      return 'vertical';
    case 'left':
    case 'right':
      return 'horizontal';
  }
};
