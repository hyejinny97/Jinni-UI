import './Modal.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Backdrop } from '@/components/feedback/Backdrop';
import { useModalSize, useKeydown } from './Modal.hooks';
import { Responsive } from '@/types/breakpoint';
import { Box, BoxProps } from '@/components/layout/Box';

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
  ModalContentProps?: BoxProps<P>;
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
    ModalContentProps,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const isFullSize = size === 'full';
  const newStyle = useStyle(style);
  const modalSize = useModalSize({ size });
  useKeydown({ onClose });

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    const { target, currentTarget } = e;
    if (target !== currentTarget || !onClose) return;
    onClose(e, 'backdropClick');
  };

  return (
    <>
      {open && (
        <Backdrop>
          <Component
            className={cn('JinniModal', scrollBehavior, className)}
            style={newStyle}
            onClick={handleBackdropClick}
            {...rest}
          >
            <Box
              className={cn('JinniModalContent', modalSize, scrollBehavior)}
              elevation={15}
              round={isFullSize ? 0 : 4}
              {...(ModalContentProps as BoxProps<P>)}
            >
              {children}
            </Box>
          </Component>
        </Backdrop>
      )}
    </>
  );
};

export default Modal;
