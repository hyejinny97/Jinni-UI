import type { ColorType } from '@/types/color';
import { editColorStyle } from '@/utils/editColorStyle';

interface ChipIconProps {
  children: JSX.Element;
  colorStyle: {
    fill: ColorType | string;
  };
}

export const ChipLeftIcon = ({ children, colorStyle }: ChipIconProps) => (
  <span className="JinniChipIcon left" style={editColorStyle(colorStyle)}>
    {children}
  </span>
);

export const ChipRightIcon = ({ children, colorStyle }: ChipIconProps) => (
  <span className="JinniChipIcon right" style={editColorStyle(colorStyle)}>
    {children}
  </span>
);
