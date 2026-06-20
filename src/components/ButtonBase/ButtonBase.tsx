'use client';

import './ButtonBase.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useRipple, UseRippleProps } from '@/hooks/useRipple';
import type { ElevationLevelType } from '@/types/elevation';
import { useElevationEffect } from './ButtonBase.hooks';
import useJinni from '@/hooks/useJinni';
import useOverlay from '@/hooks/useOverlay';
import { ColorType } from '@/types/color';
import { mergeRefs } from '@/utils/mergeRefs';

export type ButtonBaseProps<T extends AsType = 'button'> = Omit<
  DefaultComponentProps<T>,
  'children'
> &
  UseRippleProps & {
    type?: 'button' | 'submit' | 'reset';
    children?: React.ReactNode;
    href?: string;
    disabled?: boolean;
    overlayColor?: ColorType;
    disableOverlay?: boolean;
    elevation?: ElevationLevelType;
  };

const ButtonBase = <T extends AsType = 'button'>({
  ref,
  ...props
}: ButtonBaseProps<T>) => {
  const { theme } = useJinni();
  const {
    type,
    children,
    href,
    disabled = false,
    overlayColor = theme === 'light' ? 'black' : 'white',
    disableOverlay = disabled ? true : false,
    rippleColor = theme === 'light' ? 'black' : 'white',
    rippleStartLocation = 'clicked',
    disableRipple = disabled ? true : false,
    elevation,
    className,
    style,
    as,
    ...rest
  } = props;
  const Component = (as ?? (href ? 'a' : 'button')) as React.ElementType;
  const { buttonBaseElRef } = useElevationEffect({
    elevation,
    disabled
  });
  const { rippleTargetRef, RippleContainer } = useRipple({
    rippleColor,
    rippleStartLocation,
    disableRipple
  });
  const hoverOverlay = useOverlay({
    color: overlayColor,
    alpha: overlayColor === 'black' ? 2 : 5
  });
  const newStyle = useStyle({ '--hover-overlay': hoverOverlay, ...style });

  return (
    <Component
      ref={mergeRefs(
        ref as React.Ref<HTMLElement>,
        buttonBaseElRef,
        rippleTargetRef
      )}
      className={cn(
        'JinniButtonBase',

        {
          [`elevation-${elevation}`]: elevation,
          disabled,
          disableOverlay
        },
        className
      )}
      type={type}
      href={href}
      style={newStyle}
      disabled={disabled}
      {...rest}
    >
      {!disableRipple && <RippleContainer />}
      {children}
    </Component>
  );
};

export default ButtonBase;
