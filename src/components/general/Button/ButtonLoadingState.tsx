import cn from 'classnames';

interface ButtonLoadingStateProps {
  className: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

const ButtonLoadingState = ({
  className,
  children
}: ButtonLoadingStateProps) => (
  <span className={cn('JinniButtonLoadingState', className)}>{children}</span>
);

export default ButtonLoadingState;
