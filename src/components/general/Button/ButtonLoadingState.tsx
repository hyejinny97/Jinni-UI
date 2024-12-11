interface ButtonLoadingStateProps {
  children: React.ReactNode;
}

export const ButtonLeftLoadingState = ({
  children
}: ButtonLoadingStateProps) => (
  <span className="JinniButtonLoadingState left">{children}</span>
);

export const ButtonCenterLoadingState = ({
  children
}: ButtonLoadingStateProps) => (
  <span className="JinniButtonLoadingState center">{children}</span>
);

export const ButtonRightLoadingState = ({
  children
}: ButtonLoadingStateProps) => (
  <span className="JinniButtonLoadingState right">{children}</span>
);
