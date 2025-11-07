import './Modal.scss';
import cn from 'classnames';
import { useId } from 'react';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Backdrop } from '@/components/feedback/Backdrop';
import { useModalSize, useKeyboardAccessibility } from './Modal.hooks';
import { Responsive } from '@/types/breakpoint';
import { Box, BoxProps } from '@/components/layout/Box';
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
    className,
    style,
    as: Component = 'div',
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
    <ModalContext.Provider value={{ modalHeaderId, modalBodyId }}>
      {open &&
        createPortal(
          <div className="JinniModalContainer">
            <Backdrop
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
                className={cn('JinniModalContent', modalSize, scrollBehavior)}
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
    </ModalContext.Provider>
  );
};

export default Modal;
