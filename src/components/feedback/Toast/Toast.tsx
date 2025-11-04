import './Toast.scss';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useClose } from './Toast.hooks';
import { Box, BoxProps } from '@/components/layout/Box';

export type CloseReason = 'timeout' | 'backgroundClick' | 'escapeKeydown';
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
  message?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
  autoHideDuration?: number | null;
  anchorOrigin?: AnchorOriginType;
  BoxProps?: BoxProps;
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
    BoxProps,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
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
            {children || (
              <Box
                className={cn('JinniToastContent', className)}
                elevation={3}
                round={4}
                {...BoxProps}
              >
                <div className="JinniToastContentMessage">{message}</div>
                <div className="JinniToastContentAction">{action}</div>
              </Box>
            )}
          </Component>,
          document.body
        )}
    </>
  );
};

export default Toast;
