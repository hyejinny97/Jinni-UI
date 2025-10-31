import './Backdrop.scss';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useWindowScroll } from './Backdrop.hooks';
import useJinni from '@/hooks/useJinni';

type BackdropProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children?: React.ReactNode;
  invisible?: boolean;
  disableScroll?: boolean;
};

const Backdrop = <T extends AsType = 'div'>(props: BackdropProps<T>) => {
  const {
    children,
    onClick,
    invisible,
    disableScroll,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { theme } = useJinni();
  const backdropElRef = useWindowScroll({ disableScroll });
  const newStyle = useStyle(style);

  const handleBackdropClick = (e: React.MouseEvent) => {
    const { target, currentTarget } = e;
    if (target !== currentTarget || !onClick) return;
    onClick(e);
  };

  return (
    <>
      {createPortal(
        <Component
          ref={backdropElRef}
          className={cn(
            'JinniBackdrop',
            { invisible },
            `${theme}-theme`,
            className
          )}
          onClick={handleBackdropClick}
          style={newStyle}
          data-disable-scroll={disableScroll}
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
