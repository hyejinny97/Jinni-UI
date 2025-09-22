import './Button.scss';
import cn from 'classnames';
import { forwardRef } from 'react';
import type { ColorType } from '@/types/color';
import type { ElevationLevelType } from '@/types/elevation';
import { AsType } from '@/types/default-component-props';
import { CircularProgress } from '@/components/feedback/CircularProgress';
import { getColorStyle, getCircularProgressSize } from './Button.utils';
import ButtonLabel from './ButtonLabel';
import ButtonIcon from './ButtonIcon';
import ButtonLoadingState from './ButtonLoadingState';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import useColor from '@/hooks/useColor';

export type VariantType = 'filled' | 'subtle-filled' | 'outlined' | 'text';
export type SizeType = 'sm' | 'md' | 'lg';

export type ButtonProps<T extends AsType = 'button'> = Omit<
  ButtonBaseProps<T>,
  'children'
> & {
  children?: React.ReactNode;
  variant?: VariantType;
  shape?: 'pill' | 'rounded';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  centerIcon?: React.ReactNode;
  loading?: boolean;
  loadingState?: React.ReactNode;
  loadingStatePosition?: 'left' | 'center' | 'right';
  elevation?: ElevationLevelType;
  fullWidth?: boolean;
  size?: SizeType;
  isSquareSize?: boolean;
  color?: ColorType;
};

const Button = forwardRef(
  <T extends AsType = 'button'>(
    props: ButtonProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      variant = 'filled',
      shape = 'rounded',
      size = 'md',
      color = 'primary',
      leftIcon,
      rightIcon,
      centerIcon,
      loading = false,
      loadingState,
      loadingStatePosition = 'center',
      disabled = false,
      fullWidth = false,
      isSquareSize = false,
      overlayColor = variant === 'filled' ? 'white' : 'black',
      rippleColor = variant === 'filled' ? 'white' : 'black',
      className,
      style,
      ...rest
    } = props;
    const normalizedColor = useColor(color);
    const { textColor, backgroundColor, borderColor } = getColorStyle({
      color: normalizedColor,
      variant
    });
    const DefaultLoadingState = (
      <CircularProgress
        progressColor={
          getColorStyle({
            color: normalizedColor,
            variant
          }).textColor
        }
        size={getCircularProgressSize(size)}
      />
    );

    let leftContent = leftIcon && (
      <ButtonIcon className="left">{leftIcon}</ButtonIcon>
    );
    let rightContent = rightIcon && (
      <ButtonIcon className="right">{rightIcon}</ButtonIcon>
    );
    let centerContent = (
      <>
        {centerIcon && <ButtonIcon className="center">{centerIcon}</ButtonIcon>}
        {children && <ButtonLabel>{children}</ButtonLabel>}
      </>
    );
    if (loading) {
      switch (loadingStatePosition) {
        case 'left':
          leftContent = (
            <ButtonLoadingState className="left">
              {loadingState || DefaultLoadingState}
            </ButtonLoadingState>
          );
          break;
        case 'right':
          rightContent = (
            <ButtonLoadingState className="right">
              {loadingState || DefaultLoadingState}
            </ButtonLoadingState>
          );
          break;
        case 'center':
          centerContent = (
            <>
              <ButtonLoadingState className="center">
                {loadingState || DefaultLoadingState}
              </ButtonLoadingState>
              {children && <ButtonLabel>{children}</ButtonLabel>}
            </>
          );
          leftContent = undefined;
          rightContent = undefined;
          break;
      }
    }

    return (
      <ButtonBase
        ref={ref}
        className={cn(
          'JinniButton',
          size,
          shape,
          { 'square-size': isSquareSize },
          { fullWidth },
          {
            hasCenterIcon:
              centerIcon || (loading && loadingStatePosition === 'center')
          },
          className
        )}
        disabled={disabled || loading}
        overlayColor={overlayColor}
        rippleColor={rippleColor}
        style={{
          '--text-color': textColor,
          '--background-color': backgroundColor,
          '--border-color': borderColor,
          ...style
        }}
        {...rest}
      >
        {leftContent}
        {centerContent}
        {rightContent}
      </ButtonBase>
    );
  }
);

Button.displayName = 'Button';

export default Button;
