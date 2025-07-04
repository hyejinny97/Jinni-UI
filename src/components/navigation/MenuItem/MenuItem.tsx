import './MenuItem.scss';
import React, { forwardRef, MutableRefObject } from 'react';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { useRipple } from '@/hooks/useRipple';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useFocus, useKeydown } from './MenuItem.hooks';

export type MenuItemProps<T extends AsType = 'li'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    dense?: boolean;
    disabled?: boolean;
    selected?: boolean;
    href?: string;
    focus?: boolean;
    onClick?: (event: MouseEvent | KeyboardEvent) => void;
  };

const MenuItem = forwardRef(
  <T extends AsType = 'li'>(
    props: MenuItemProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      dense = false,
      disabled = false,
      selected = false,
      href,
      focus = false,
      onClick,
      className,
      style,
      as: Component = href ? 'a' : 'li',
      ...rest
    } = props;
    const newStyle = useStyle(style);
    const { rippleTargetRef, RippleContainer } = useRipple({
      rippleColor: 'black'
    });
    useFocus({ rippleTargetRef, focus });
    useKeydown({
      rippleTargetRef,
      onClick,
      href,
      focus
    });

    return (
      <Component
        ref={(element: HTMLElement | null) => {
          if (element) {
            (rippleTargetRef as MutableRefObject<HTMLElement>).current =
              element;
            if (typeof ref === 'function') {
              ref(element);
            } else if (ref && 'current' in ref) {
              (ref as MutableRefObject<HTMLElement>).current = element;
            }
          }
        }}
        className={cn(
          'JinniMenuItem',
          { dense },
          { disabled },
          { selected },
          className
        )}
        style={newStyle}
        href={href}
        onClick={onClick}
        tabIndex={focus ? 0 : -1}
        {...rest}
      >
        {children}
        <RippleContainer />
      </Component>
    );
  }
);

export default MenuItem;
