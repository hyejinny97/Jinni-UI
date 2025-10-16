import './Popper.scss';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import { PopperType } from '@/types/popper';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { usePopperAbsolutePosition } from './Popper.hooks';
import useStyle from '@/hooks/useStyle';

type PopperProps<T extends AsType = 'div'> = DefaultComponentProps<T> &
  Partial<PopperType> & {
    anchorReference: PopperType['anchorReference'];
    anchorElRef?: PopperType['anchorElRef'];
    anchorOrigin?: PopperType['anchorOrigin'];
    anchorPosition?: PopperType['anchorPosition'];
    popperOrigin: PopperType['popperOrigin'];
  };

const Popper = (props: PopperProps) => {
  const {
    children,
    anchorReference,
    anchorElRef,
    anchorOrigin,
    anchorPosition,
    popperOrigin,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { popperRef } = usePopperAbsolutePosition({
    anchorReference,
    anchorElRef,
    anchorOrigin,
    anchorPosition,
    popperOrigin
  });
  const newStyle = useStyle(style);

  return (
    <>
      {createPortal(
        <Component
          ref={popperRef}
          className={cn('JinniPopper', className)}
          style={newStyle}
          {...rest}
        >
          {children}
        </Component>,
        document.body
      )}
    </>
  );
};

export default Popper;
