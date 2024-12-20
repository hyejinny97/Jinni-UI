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
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
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
