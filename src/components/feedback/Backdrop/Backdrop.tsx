import './Backdrop.scss';
import cn from 'classnames';
import { useEffect } from 'react';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';

type BackdropProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
};

const Backdrop = <T extends AsType = 'div'>(props: BackdropProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    };
  }, []);

  return (
    <Component
      className={cn('JinniBackdrop', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Backdrop;
