import './LinearSpeedDial.scss';
import cn from 'classnames';
import { useRef } from 'react';
import { AsType } from '@/types/default-component-props';
import { Popper, PopperProps } from '@/components/_share/Popper';
import { getAnchorOrigin, getPopperOrigin } from './LinearSpeedDial.utils';
import {
  useClose,
  useKeyboardAccessibility,
  useStaggeredTransition
} from './LinearSpeedDial.hooks';
import { LinearSpeedDialContext } from './LinearSpeedDial.contexts';

export type CloseReason =
  | 'backgroundClick'
  | 'blur'
  | 'mouseLeave'
  | 'escapeKeyDown';
export type PlacementType = 'down' | 'left' | 'right' | 'up';

export type LinearSpeedDialProps<T extends AsType = 'div'> = Omit<
  Partial<PopperProps<T>>,
  'anchorOrigin' | 'popperOrigin'
> & {
  children: React.ReactNode;
  open: boolean;
  onClose?: (event: Event | React.SyntheticEvent, reason: CloseReason) => void;
  placement?: PlacementType;
  offset?: number;
  disableStaggeredTransition?: boolean;
};

const LinearSpeedDial = <T extends AsType = 'div'>(
  props: LinearSpeedDialProps<T>
) => {
  const {
    children,
    open,
    onClose,
    placement = 'up',
    offset = 16,
    anchorReference = 'anchorEl',
    anchorElRef,
    anchorPosition,
    positionType,
    disableStaggeredTransition,
    className,
    style,
    ...rest
  } = props;
  const speedDialContentElRef = useRef<HTMLDivElement>(null);
  const { speedDialElRef } = useClose({ open, onClose, anchorElRef });
  useKeyboardAccessibility({
    open,
    placement,
    speedDialContentElRef
  });
  useStaggeredTransition({
    open,
    disableStaggeredTransition,
    speedDialContentElRef
  });

  return (
    <LinearSpeedDialContext.Provider value={{ open, placement }}>
      <Popper
        ref={speedDialElRef}
        className={cn('JinniLinearSpeedDial', className)}
        anchorReference={anchorReference}
        anchorElRef={anchorElRef}
        anchorOrigin={anchorElRef && getAnchorOrigin(placement)}
        popperOrigin={getPopperOrigin(placement)}
        anchorPosition={anchorPosition}
        positionType={positionType}
        style={{ '--offset': `${offset}px`, ...style }}
        {...rest}
      >
        <div
          ref={speedDialContentElRef}
          className={cn('JinniLinearSpeedDialContent', placement)}
        >
          {children}
        </div>
      </Popper>
    </LinearSpeedDialContext.Provider>
  );
};

export default LinearSpeedDial;
