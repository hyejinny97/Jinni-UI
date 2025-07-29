import './Backdrop.scss';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useOverflowHidden } from './Backdrop.hooks';

type BackdropProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children?: React.ReactNode;
  open: boolean;
  invisible?: boolean;
  disableScroll?: boolean;
};

const Backdrop = <T extends AsType = 'div'>(props: BackdropProps<T>) => {
  const {
    children,
    open,
    onClick,
    invisible = false,
    disableScroll = false,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle(style);
  useOverflowHidden({ open, disableScroll });

  const handleBackdropClick = (e: React.MouseEvent) => {
    const { target, currentTarget } = e;
    if (target !== currentTarget || !onClick) return;
    onClick(e);
  };

  return (
    <>
      {open &&
        createPortal(
          <Component
            className={cn('JinniBackdrop', { invisible }, className)}
            style={newStyle}
            onClick={handleBackdropClick}
            {...rest}
          >
            {children}
          </Component>,
          document.body
        )}
    </>
  );
};

export default Backdrop;
