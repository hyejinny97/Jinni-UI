import './Button.scss';
import cn from 'classnames';
import type { ColorType } from '@/types/color';
import type { ElevationLevelType } from '@/types/elevation';
import { useRipple } from '@/hooks/useRipple';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { CircularProgress } from '@/components/feedback/CircularProgress';
import { getColorStyle, getCircularProgressSize } from './Button.utils';
import { ButtonLabel } from './ButtonLabel';
import {
  ButtonLeftIcon,
  ButtonCenterIcon,
  ButtonRightIcon
} from './ButtonIcon';
import {
  ButtonLeftLoadingState,
  ButtonCenterLoadingState,
  ButtonRightLoadingState
} from './ButtonLoadingState';

export type VariantType = 'filled' | 'subtle-filled' | 'outlined' | 'text';
export type SizeType = 'sm' | 'md' | 'lg';

type ButtonProps<T extends AsType = 'button'> = DefaultComponentProps<T> & {
  variant?: VariantType;
  shape?: 'pill' | 'rounded';
  href?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  centerIcon?: JSX.Element;
  loading?: boolean;
  loadingState?: React.ReactNode;
  loadingStatePosition?: 'left' | 'center' | 'right';
  elevation?: ElevationLevelType;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: SizeType;
  isSquareSize?: boolean;
  color?: ColorType;
};

const Button = <T extends AsType = 'button'>(props: ButtonProps<T>) => {
  const {
    children,
    variant = 'filled',
    shape = 'rounded',
    href,
    leftIcon,
    rightIcon,
    centerIcon,
    loading = false,
    loadingState,
    loadingStatePosition = 'center',
    elevation = 0,
    onClick,
    disabled = false,
    fullWidth = false,
    size = 'md',
    isSquareSize = false,
    color = 'primary',
    className,
    style,
    as: Component = href ? 'a' : 'button',
    ...rest
  } = props;
  const circularProgressSize = getCircularProgressSize(size);
  const { buttonColorStyle, iconColorStyle, circularProgressColor } =
    getColorStyle({
      color,
      variant,
      disabled
    });
  const buttonStyle = useStyle({
    elevation,
    ...buttonColorStyle,
    ...style
  });
  const iconStyle = useStyle({ ...iconColorStyle });
  const { rippleTargetRef, RippleContainer } = useRipple({
    rippleColor: variant === 'filled' ? 'white' : 'black'
  });

  const newLoadingState = loadingState || (
    <CircularProgress
      progressColor={circularProgressColor}
      size={circularProgressSize}
    />
  );

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    const isAnchorTag = Component === 'a';
    if (isAnchorTag && disabled) {
      e.preventDefault();
    }
    if (onClick && !disabled) onClick();
  };

  let leftContent = leftIcon && (
    <ButtonLeftIcon style={iconStyle}>{leftIcon}</ButtonLeftIcon>
  );
  let rightContent = rightIcon && (
    <ButtonRightIcon style={iconStyle}>{rightIcon}</ButtonRightIcon>
  );
  let centerContent = centerIcon ? (
    <ButtonCenterIcon style={iconStyle}>{centerIcon}</ButtonCenterIcon>
  ) : (
    <ButtonLabel>{children}</ButtonLabel>
  );
  if (loading) {
    switch (loadingStatePosition) {
      case 'left':
        leftContent = (
          <ButtonLeftLoadingState>{newLoadingState}</ButtonLeftLoadingState>
        );
        break;
      case 'right':
        rightContent = (
          <ButtonRightLoadingState>{newLoadingState}</ButtonRightLoadingState>
        );
        break;
      case 'center':
        centerContent = (
          <ButtonCenterLoadingState>{newLoadingState}</ButtonCenterLoadingState>
        );
        leftContent = undefined;
        rightContent = undefined;
        break;
    }
  }

  return (
    <Component
      ref={rippleTargetRef}
      className={cn(
        'JinniButton',
        variant,
        size,
        shape,
        { 'square-size': isSquareSize },
        { disabled },
        { fullWidth },
        className
      )}
      onClick={handleClick}
      href={href}
      disabled={disabled}
      style={buttonStyle}
      {...rest}
    >
      {leftContent}
      {centerContent}
      {rightContent}
      <RippleContainer />
    </Component>
  );
};

export default Button;
