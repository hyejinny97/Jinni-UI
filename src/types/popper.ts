export type OriginType = {
  horizontal: 'center' | 'left' | 'right' | number;
  vertical: 'bottom' | 'center' | 'top' | number;
};

export type PositionType = { left: number; top: number };

export type PopperType = {
  anchorReference: 'anchorEl' | 'anchorPosition';
  anchorElRef: React.RefObject<HTMLElement>;
  anchorOrigin: OriginType;
  anchorPosition: PositionType;
  popperOrigin: OriginType;
};

export type PlacementType =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end';
