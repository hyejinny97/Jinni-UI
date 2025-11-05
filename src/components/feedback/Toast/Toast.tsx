import './Toast.scss';
import cn from 'classnames';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useClose } from './Toast.hooks';
import { Box, BoxProps } from '@/components/layout/Box';
import { Motion } from '@/components/motion/Motion';
import { AnimatePresence } from '@/components/motion/AnimatePresence';

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
  TransitionComponent?: React.ComponentType<{ children: React.ReactNode }>;
};

const DEFAULT_ANCHOR_ORIGIN: AnchorOriginType = {
  horizontal: 'left',
  vertical: 'bottom'
};

const ScaleFade = ({ children }: { children: React.ReactNode }) => {
  return (
    <Motion
      initial={{ transform: 'scale(0.9)', opacity: 0 }}
      animate={{ transform: 'scale(1)', opacity: 1 }}
      exit={{ transform: 'scale(0.9)', opacity: 0 }}
      transition="transform var(--jinni-duration-short3) var(--jinni-easing-emphasized), opacity var(--jinni-duration-short3) var(--jinni-easing-emphasized)"
    >
      {children}
    </Motion>
  );
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
      TransitionComponent = ScaleFade,
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
      <AnimatePresence>
        {open && (
          <>
            {createPortal(
              <Component
                ref={ref}
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
                <TransitionComponent>
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
                </TransitionComponent>
              </Component>,
              document.body
            )}
          </>
        )}
      </AnimatePresence>
    );
  }
);

export default Toast;
