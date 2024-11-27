import { insertProps } from './Chip.utils';

interface ChipAvatarProps {
  children: JSX.Element;
  style?: React.CSSProperties;
}

export const ChipLeftAvatar = ({ children, style }: ChipAvatarProps) => (
  <span className="JinniChipAvatar left">
    {insertProps(children, { style })}
  </span>
);

export const ChipRightAvatar = ({ children, style }: ChipAvatarProps) => (
  <span className="JinniChipAvatar right">
    {insertProps(children, { style })}
  </span>
);
