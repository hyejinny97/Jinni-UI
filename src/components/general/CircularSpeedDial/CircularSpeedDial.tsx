import './CircularSpeedDial.scss';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import usePopperPosition from '@/hooks/usePopperPosition';
import {
  getDefaultDirection,
  getMainCircleRadius,
  getRotationAngleList,
  insertProps
} from './CircularSpeedDial.utils';
import { HORIZONTAL_CENTER_VERTICAL_CENTER } from './CircularSpeedDial.constants';
import { useHandleEvent } from './CircularSpeedDial.hooks';
import CircularSpeedDialContext from './CircularSpeedDial.contexts';

export type VariantType = 'circular' | 'semi-circular' | 'quarter-circular';
export type DirectionMap = {
  'semi-circular': 'down' | 'left' | 'right' | 'up';
  'quarter-circular': 'down-left' | 'up-left' | 'down-right' | 'up-right';
  circular: undefined;
};
export type OpenReason = 'anchorClick' | 'focus' | 'mouseEnter';
export type CloseReason =
  | 'backgroundClick'
  | 'blur'
  | 'mouseLeave'
  | 'escapeKeyDown';

export type CircularSpeedDialProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'children'
> & {
  children: Array<JSX.Element>;
  anchorElRef: React.RefObject<HTMLElement>;
  open: boolean;
  onOpen?: (event: Event | React.SyntheticEvent, reason: OpenReason) => void;
  onClose?: (event: Event | React.SyntheticEvent, reason: CloseReason) => void;
  offset?: string;
  variant?: VariantType;
  direction?: DirectionMap[VariantType];
};

const CircularSpeedDial = <T extends AsType = 'div'>(
  props: CircularSpeedDialProps<T>
) => {
  const {
    children,
    anchorElRef,
    open,
    onOpen,
    onClose,
    offset = '16px',
    variant = 'circular',
    direction = getDefaultDirection(variant),
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const mainCircleRadius = getMainCircleRadius({
    anchorElRef,
    offset
  });
  const circularSpeedDialContentRadius = mainCircleRadius * 1.5;
  const rotationAngleList = getRotationAngleList({
    actionsNumber: children.length,
    direction
  });
  const { popperRef: speedDialRef, popperPosition: speedDialPosition } =
    usePopperPosition({
      anchorReference: 'anchorEl',
      anchorElRef,
      anchorOrigin: HORIZONTAL_CENTER_VERTICAL_CENTER,
      popperOrigin: HORIZONTAL_CENTER_VERTICAL_CENTER,
      open
    });
  useHandleEvent({ anchorElRef, speedDialRef, open, onOpen, onClose });
  const newStyle = useStyle({
    '--speedDialContentRadius': `${circularSpeedDialContentRadius}px`,
    ...speedDialPosition,
    ...style
  });

  return (
    <CircularSpeedDialContext.Provider
      value={{
        mainCircleRadius,
        circularSpeedDialContentRadius,
        rotationAngleList
      }}
    >
      {open &&
        createPortal(
          <Component
            ref={speedDialRef}
            className={cn('JinniCircularSpeedDial', className)}
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
            <div className="JinniCircularSpeedDialContent">
              {insertProps(children)}
            </div>
          </Component>,
          document.body
        )}
    </CircularSpeedDialContext.Provider>
  );
};

export default CircularSpeedDial;
