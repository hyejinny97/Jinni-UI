interface ChipIconProps {
  children: JSX.Element;
  style?: React.CSSProperties;
}

export const ChipLeftIcon = ({ children, style }: ChipIconProps) => (
  <span className="JinniChipIcon left" style={style}>
    {children}
  </span>
);

export const ChipRightIcon = ({ children, style }: ChipIconProps) => (
  <span className="JinniChipIcon right" style={style}>
    {children}
  </span>
);
