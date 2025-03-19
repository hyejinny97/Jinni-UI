import cn from 'classnames';

interface ButtonIconProps {
  className: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

const ButtonIcon = ({ className, children }: ButtonIconProps) => (
  <span className={cn('JinniButtonIcon', className)}>{children}</span>
);

export default ButtonIcon;
