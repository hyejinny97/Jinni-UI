import { PlacementType } from '../LinearSpeedDial';

export const getTooltipPlacement = (placement: PlacementType) => {
  switch (placement) {
    case 'down':
    case 'up':
      return 'left';
    case 'left':
    case 'right':
      return 'top';
  }
};
