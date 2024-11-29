import { DividerProps } from './Divider';

export const getBorderWidth = (
  orientation: DividerProps['orientation'],
  thickness: DividerProps['thickness']
) => {
  let borderWidth = {};
  if (orientation === 'horizontal') {
    borderWidth = {
      borderTopWidth: thickness
    };
  } else if (orientation === 'vertical') {
    borderWidth = {
      borderLeftWidth: thickness
    };
  }
  return borderWidth;
};
