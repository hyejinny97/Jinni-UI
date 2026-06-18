import './Modal.scss';
import cn from 'classnames';
import { Fragment, useId } from 'react';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import Backdrop from '@/components/Backdrop';
import { useModalSize, useKeyboardAccessibility } from './Modal.hooks';
import { Responsive } from '@/types/breakpoint';
import Box, { BoxProps } from '@/components/Box';
import ModalContext from './Modal.contexts';

export type CloseReason = 'escapeKeydown' | 'backdropClick';
type ModalSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ModalProps<
  T extends AsType = 'div',
  P extends AsType = 'div'
> = DefaultComponentProps<T> & {
  open: boolean;
  onClose?: (event: React.SyntheticEvent | Event, reason: CloseReason) => void;
  children: React.ReactNode;
  size?: ModalSizeType | Responsive<ModalSizeType>;
  scrollBehavior?: 'inside' | 'outside';
  BoxProps?: BoxProps<P>;
  WrapperComponent?: React.ComponentType<{ children: React.ReactNode }>;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  TransitionComponent?: React.ComponentType<any>;
  BackdropTransitionComponent?: React.ComponentType<any>;
};

const Modal = <T extends AsType = 'div', P extends AsType = 'div'>(
  props: ModalProps<T, P>
) => {
  const {
    open,
    onClose,
    children,
    size = 'md',
    scrollBehavior = 'inside',
    BoxProps,
    WrapperComponent = Fragment,
    TransitionComponent,
    BackdropTransitionComponent,
    className,
    style,
    as: Component = TransitionComponent || 'div',
    ...rest
  } = props;
  const modalHeaderId = useId();
  const modalBodyId = useId();
  const modalSize = useModalSize({ size });
  const { boxElRef } = useKeyboardAccessibility({ open, onClose });
  const newStyle = useStyle(style);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    const { target, currentTarget } = e;
    if (target !== currentTarget || !onClose) return;
    onClose(e, 'backdropClick');
  };

  return (
    <ModalContext value={{ modalHeaderId, modalBodyId }}>
      <WrapperComponent>
        {open && (
          <>
            {createPortal(
              <div className="JinniModalContainer">
                <Backdrop
                  as={BackdropTransitionComponent}
                  disablePortal
                  disableScroll
                  data-testid="modal-backdrop"
                />
                <Component
                  role="dialog"
                  aria-modal={true}
                  aria-labelledby={modalHeaderId}
                  aria-describedby={modalBodyId}
                  className={cn('JinniModal', scrollBehavior, className)}
                  onClick={handleBackdropClick}
                  style={newStyle}
                  {...rest}
                >
                  <Box
                    ref={boxElRef}
                    className={cn(
                      'JinniModalContent',
                      modalSize,
                      scrollBehavior
                    )}
                    elevation={15}
                    round={size === 'full' ? 0 : 4}
                    {...BoxProps}
                  >
                    {children}
                  </Box>
                </Component>
              </div>,
              document.body
            )}
          </>
        )}
      </WrapperComponent>
    </ModalContext>
  );
};

export default Modal;
