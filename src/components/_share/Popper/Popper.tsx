import './Popper.scss';
import cn from 'classnames';
import { forwardRef, MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import { PopperType } from '@/types/popper';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { usePopperAbsolutePosition } from './Popper.hooks';
import useStyle from '@/hooks/useStyle';

export type PopperProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  anchorReference: PopperType['anchorReference'];
  anchorElRef?: PopperType['anchorElRef'];
  anchorOrigin?: PopperType['anchorOrigin'];
  anchorPosition?: PopperType['anchorPosition'];
  popperOrigin: PopperType['popperOrigin'];
};

const Popper = forwardRef(
  <T extends AsType = 'div'>(
    props: PopperProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
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
            ref={(element: HTMLElement | null) => {
              if (element) {
                (popperRef as MutableRefObject<HTMLElement>).current = element;
                if (typeof ref === 'function') {
                  ref(element);
                } else if (ref && 'current' in ref) {
                  (ref as MutableRefObject<HTMLElement>).current = element;
                }
              }
            }}
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
  }
);

export default Popper;
