import './MenuItem.scss';
import cn from 'classnames';
import { useEffect } from 'react';
import useStyle from '@/hooks/useStyle';
import { useRipple } from '@/hooks/useRipple';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';

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

const MenuItem = <T extends AsType = 'li'>(props: MenuItemProps<T>) => {
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

  useEffect(() => {
    const menuItemEl = rippleTargetRef.current;
    if (!menuItemEl) return;
    if (focus) menuItemEl.focus();
  }, [rippleTargetRef, focus]);

  useEffect(() => {
    const menuItemEl = rippleTargetRef.current;
    if (!menuItemEl) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (!(e.code === 'Enter' && focus)) return;
      if (onClick) onClick(e);
      if (href) window.location.assign(href);
    };

    menuItemEl.addEventListener('keydown', handleKeydown);
    return () => {
      menuItemEl.removeEventListener('keydown', handleKeydown);
    };
  }, [onClick, focus, rippleTargetRef, href]);

  return (
    <Component
      ref={rippleTargetRef}
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
};

export default MenuItem;
