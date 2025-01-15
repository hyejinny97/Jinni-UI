import './Toast.scss';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import ToastContent, { ToastContentProps } from './ToastContent';
import { useClose } from './Toast.hooks';

export type CloseReason = 'timeout' | 'clickAway' | 'escapeKeydown';
export type AnchorOriginType = {
  horizontal: 'left' | 'center' | 'right';
  vertical: 'top' | 'bottom';
};

export type ToastProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  open: boolean;
  onClose?: (
    event: React.SyntheticEvent | Event | null,
    reason: CloseReason
  ) => void;
  message: React.ReactNode;
  action?: React.ReactNode;
  autoHideDuration?: number | null;
  anchorOrigin?: AnchorOriginType;
  children?: React.ReactNode;
  ToastContentProps?: Partial<ToastContentProps>;
};

const DEFAULT_ANCHOR_ORIGIN: AnchorOriginType = {
  horizontal: 'left',
  vertical: 'bottom'
};

const Toast = <T extends AsType = 'div'>(props: ToastProps<T>) => {
  const {
    open,
    onClose,
    message,
    action,
    autoHideDuration = null,
    anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
    children,
    ToastContentProps,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const hasCustomToastContent = !!children;
  const { pauseTimer, resumeTimer } = useClose({
    onClose,
    open,
    autoHideDuration
  });
  const newStyle = useStyle(style);

  return (
    <>
      {open &&
        createPortal(
          <Component
            className={cn(
              'JinniToast',
              anchorOrigin.horizontal,
              anchorOrigin.vertical,
              className
            )}
            style={newStyle}
            onMouseOver={pauseTimer}
            onMouseLeave={resumeTimer}
            {...rest}
          >
            {hasCustomToastContent ? (
              children
            ) : (
              <ToastContent
                message={message}
                action={action}
                {...ToastContentProps}
              />
            )}
          </Component>,
          document.body
        )}
    </>
  );
};

export default Toast;
