import type { ColorType } from '@/types/color';
import { insertProps } from './Chip.utils';

interface ChipAvatarProps {
  children: JSX.Element;
  colorStyle: {
    backgroundColor: ColorType | string;
    color: ColorType | string;
  };
}

export const ChipLeftAvatar = ({ children, colorStyle }: ChipAvatarProps) => (
  <span className="JinniChipAvatar left">
    {insertProps(children, { colorStyle })}
  </span>
);

export const ChipRightAvatar = ({ children, colorStyle }: ChipAvatarProps) => (
  <span className="JinniChipAvatar right">
    {insertProps(children, { colorStyle })}
  </span>
);
