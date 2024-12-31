export type OriginType = {
  horizontal: 'center' | 'left' | 'right' | number;
  vertical: 'bottom' | 'center' | 'top' | number;
};

export type PopperType = {
  anchorReference: 'anchorEl' | 'anchorPosition';
  anchorEl: HTMLElement | null;
  anchorOrigin: OriginType;
  anchorPosition: { left: number; top: number };
  popperOrigin: OriginType;
};
