import './Toast.scss';
import cn from 'classnames';
import { forwardRef, MutableRefObject, Fragment } from 'react';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useClose, useActionFocus } from './Toast.hooks';
import Box, { BoxProps } from '@/components/Box';

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
  WrapperComponent?: React.ComponentType<{ children: React.ReactNode }>;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  TransitionComponent?: React.ComponentType<any>;
};

const DEFAULT_ANCHOR_ORIGIN: AnchorOriginType = {
  horizontal: 'left',
  vertical: 'bottom'
};

const Toast = forwardRef(
  <T extends AsType = 'div'>(
    props: ToastProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      open,
      onClose,
      message,
      action,
      autoHideDuration = null,
      anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
      children,
      BoxProps,
      WrapperComponent = Fragment,
      TransitionComponent,
      className,
      style,
      as: Component = TransitionComponent || 'div',
      ...rest
    } = props;
    const { pauseTimer, resumeTimer } = useClose({
      onClose,
      open,
      autoHideDuration
    });
    const { toastElRef } = useActionFocus({ open });
    const newStyle = useStyle(style);

    return (
      <WrapperComponent>
        {open && (
          <>
            {createPortal(
              <Component
                role="alert"
                ref={(element) => {
                  if (element) {
                    (toastElRef as MutableRefObject<HTMLElement>).current =
                      element;
                    if (typeof ref === 'function') {
                      ref(element);
                    } else if (ref && 'current' in ref) {
                      (ref as MutableRefObject<HTMLElement>).current = element;
                    }
                  }
                }}
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
        )}
      </WrapperComponent>
    );
  }
);

export default Toast;
