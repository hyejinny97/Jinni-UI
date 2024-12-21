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
    onClick?: (event: MouseEvent) => void;
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
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Enter' && focus && onClick) {
        onClick(e);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onClick, focus]);

  return (
    <Component
      ref={rippleTargetRef}
      className={cn(
        'JinniMenuItem',
        { dense },
        { disabled },
        { selected },
        { focus },
        className
      )}
      style={newStyle}
      href={href}
      onClick={onClick}
      {...rest}
    >
      {children}
      <RippleContainer />
    </Component>
  );
};

export default MenuItem;
