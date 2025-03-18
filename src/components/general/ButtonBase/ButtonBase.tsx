import './ButtonBase.scss';
import cn from 'classnames';
import { MutableRefObject, useRef } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useRipple, UseRippleProps } from '@/hooks/useRipple';
import type { ElevationLevelType } from '@/types/elevation';
import { useElevationEffect } from './ButtonBase.hooks';

type ButtonBaseProps<T extends AsType = 'button'> = DefaultComponentProps<T> &
  Partial<UseRippleProps> & {
    children: React.ReactNode;
    href?: string;
    disabled?: boolean;
    overlayColor?: 'black' | 'white';
    disableOverlay?: boolean;
    elevation?: ElevationLevelType;
  };

const ButtonBase = <T extends AsType = 'button'>(props: ButtonBaseProps<T>) => {
  const {
    children,
    href,
    disabled = false,
    overlayColor = 'black',
    disableOverlay = disabled ? true : false,
    rippleColor = 'black',
    rippleStartLocation = 'clicked',
    disableRipple = disabled ? true : false,
    elevation,
    className,
    style,
    as: Component = href ? 'a' : 'button',
    ...rest
  } = props;
  const buttonBaseElRef = useRef<HTMLElement>(null);
  const { rippleTargetRef, RippleContainer } = useRipple({
    rippleColor,
    rippleStartLocation,
    disableRipple
  });
  useElevationEffect({
    buttonBaseElRef,
    elevation,
    disabled
  });
  const newStyle = useStyle({ elevation, ...style });

  return (
    <Component
      ref={(element: HTMLElement) => {
        (buttonBaseElRef as MutableRefObject<HTMLElement>).current = element;
        (rippleTargetRef as MutableRefObject<HTMLElement>).current = element;
      }}
      className={cn(
        'JinniButtonBase',
        { [`overlay-${overlayColor}`]: !disableOverlay, disabled },
        className
      )}
      href={href}
      style={newStyle}
      disabled={disabled}
      {...rest}
    >
      {children}
      <RippleContainer />
    </Component>
  );
};

export default ButtonBase;
