import { PlacementType } from './Tooltip';
import { OriginType } from '@/types/popper';

export const getAnchorOrigin = (placement: PlacementType): OriginType => {
  switch (placement) {
    case 'top-start':
      return { horizontal: 'left', vertical: 'top' };
    case 'top':
      return { horizontal: 'center', vertical: 'top' };
    case 'top-end':
      return { horizontal: 'right', vertical: 'top' };
    case 'bottom-start':
      return { horizontal: 'left', vertical: 'bottom' };
    case 'bottom':
      return { horizontal: 'center', vertical: 'bottom' };
    case 'bottom-end':
      return { horizontal: 'right', vertical: 'bottom' };
    case 'left-start':
      return { horizontal: 'left', vertical: 'top' };
    case 'left':
      return { horizontal: 'left', vertical: 'center' };
    case 'left-end':
      return { horizontal: 'left', vertical: 'bottom' };
    case 'right-start':
      return { horizontal: 'right', vertical: 'top' };
    case 'right':
      return { horizontal: 'right', vertical: 'center' };
    case 'right-end':
      return { horizontal: 'right', vertical: 'bottom' };
  }
};

export const getPopperOrigin = (placement: PlacementType): OriginType => {
  switch (placement) {
    case 'top-start':
      return { horizontal: 'left', vertical: 'bottom' };
    case 'top':
      return { horizontal: 'center', vertical: 'bottom' };
    case 'top-end':
      return { horizontal: 'right', vertical: 'bottom' };
    case 'bottom-start':
      return { horizontal: 'left', vertical: 'top' };
    case 'bottom':
      return { horizontal: 'center', vertical: 'top' };
    case 'bottom-end':
      return { horizontal: 'right', vertical: 'top' };
    case 'left-start':
      return { horizontal: 'right', vertical: 'top' };
    case 'left':
      return { horizontal: 'right', vertical: 'center' };
    case 'left-end':
      return { horizontal: 'right', vertical: 'bottom' };
    case 'right-start':
      return { horizontal: 'left', vertical: 'top' };
    case 'right':
      return { horizontal: 'left', vertical: 'center' };
    case 'right-end':
      return { horizontal: 'left', vertical: 'bottom' };
  }
};
