import './LinearSpeedDial.scss';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import usePopperPosition from '@/hooks/usePopperPosition';
import { getAnchorOrigin, getPopperOrigin } from './LinearSpeedDial.utils';
import { useHandleEvent } from './LinearSpeedDial.hooks';
import LinearSpeedDialContext from './LinearSpeedDial.contexts';

export type OpenReason = 'anchorClick' | 'focus' | 'mouseEnter';
export type CloseReason =
  | 'backgroundClick'
  | 'blur'
  | 'mouseLeave'
  | 'escapeKeyDown';
export type DirectionType = 'down' | 'left' | 'right' | 'up';

export type LinearSpeedDialProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'children'
> & {
  children: Array<JSX.Element>;
  anchorElRef: React.RefObject<HTMLElement>;
  open: boolean;
  onOpen?: (event: Event | React.SyntheticEvent, reason: OpenReason) => void;
  onClose?: (event: Event | React.SyntheticEvent, reason: CloseReason) => void;
  offset?: string;
  direction?: DirectionType;
};

const LinearSpeedDial = <T extends AsType = 'div'>(
  props: LinearSpeedDialProps<T>
) => {
  const {
    children,
    anchorElRef,
    open,
    onOpen,
    onClose,
    offset = '16px',
    direction = 'up',
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { popperRef: speedDialRef, popperPosition: speedDialPosition } =
    usePopperPosition({
      anchorReference: 'anchorEl',
      anchorElRef,
      anchorOrigin: getAnchorOrigin(direction),
      popperOrigin: getPopperOrigin(direction),
      open
    });
  useHandleEvent({ anchorElRef, speedDialRef, open, onOpen, onClose });
  const newStyle = useStyle({
    '--offset': offset,
    ...speedDialPosition,
    ...style
  });

  return (
    <LinearSpeedDialContext.Provider value={{ direction }}>
      {open &&
        createPortal(
          <Component
            ref={speedDialRef}
            className={cn('JinniLinearSpeedDial', className)}
            style={newStyle}
            onMouseEnter={(event: MouseEvent) => {
              if (onOpen) onOpen(event, 'mouseEnter');
              if (props.onMouseEnter) props.onMouseEnter(event);
            }}
            onMouseLeave={(event: MouseEvent) => {
              if (onClose) onClose(event, 'mouseLeave');
              if (props.onMouseLeave) props.onMouseLeave(event);
            }}
            {...rest}
          >
            <div className={cn('JinniLinearSpeedDialContent', direction)}>
              {children}
            </div>
          </Component>,
          document.body
        )}
    </LinearSpeedDialContext.Provider>
  );
};

export default LinearSpeedDial;
