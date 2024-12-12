interface ButtonIconProps {
  children: JSX.Element;
  style?: React.CSSProperties;
}

export const ButtonLeftIcon = ({ children, style }: ButtonIconProps) => (
  <span className="JinniButtonIcon left" style={style}>
    {children}
  </span>
);

export const ButtonCenterIcon = ({ children, style }: ButtonIconProps) => (
  <span className="JinniButtonIcon center" style={style}>
    {children}
  </span>
);

export const ButtonRightIcon = ({ children, style }: ButtonIconProps) => (
  <span className="JinniButtonIcon right" style={style}>
    {children}
  </span>
);
