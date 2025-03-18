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
    overlayColor?: 'black' | 'white';
    disableOverlay?: boolean;
    elevation?: ElevationLevelType;
  };

const ButtonBase = <T extends AsType = 'button'>(props: ButtonBaseProps<T>) => {
  const {
    children,
    href,
    overlayColor = 'black',
    disableOverlay = false,
    rippleColor = 'black',
    rippleStartLocation = 'clicked',
    disableRipple = false,
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
    elevation
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
        { [`overlay-${overlayColor}`]: !disableOverlay },
        className
      )}
      href={href}
      style={newStyle}
      {...rest}
    >
      {children}
      <RippleContainer />
    </Component>
  );
};

export default ButtonBase;
