import './LinearSpeedDial.scss';
import cn from 'classnames';
import { useRef, Fragment } from 'react';
import { AsType } from '@/types/default-component-props';
import Popper, { PopperProps } from '@/components/Popper';
import {
  getAnchorOrigin,
  getPopperOrigin,
  getOrientation
} from './LinearSpeedDial.utils';
import { useClose, useKeyboardAccessibility } from './LinearSpeedDial.hooks';
import { LinearSpeedDialContext } from './LinearSpeedDial.contexts';
import { DistributiveOmit } from '@/types/distributiveOmit';

export type CloseReason =
  | 'backgroundClick'
  | 'blur'
  | 'mouseLeave'
  | 'escapeKeyDown';
export type PlacementType = 'down' | 'left' | 'right' | 'up';

export type LinearSpeedDialProps<T extends AsType = 'div'> = DistributiveOmit<
  PopperProps<T>,
  'anchorOrigin' | 'popperOrigin'
> & {
  children: React.ReactNode;
  open: boolean;
  onClose?: (event: Event | React.SyntheticEvent, reason: CloseReason) => void;
  placement?: PlacementType;
  offset?: number;
  WrapperComponent?: React.ComponentType<{ children: React.ReactNode }>;
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
    container = document.body,
    WrapperComponent = Fragment,
    className,
    style,
    ...rest
  } = props;
  const speedDialContentElRef = useRef<HTMLDivElement>(null);
  const { speedDialElRef } = useClose({
    open,
    onClose,
    anchorElRef,
    container
  });
  useKeyboardAccessibility({
    open,
    placement,
    speedDialContentElRef,
    container
  });

  const popperAnchorProps: PopperProps<T> =
    anchorReference === 'anchorEl'
      ? {
          anchorReference: 'anchorEl',
          anchorElRef: anchorElRef!,
          anchorOrigin: getAnchorOrigin(placement)
        }
      : {
          anchorReference: 'anchorPosition',
          anchorPosition: anchorPosition!
        };

  return (
    <LinearSpeedDialContext value={{ placement, positionType, container }}>
      <WrapperComponent>
        {open && (
          <Popper
            ref={speedDialElRef}
            role="menu"
            aria-orientation={getOrientation(placement)}
            className={cn('JinniLinearSpeedDial', className)}
            {...popperAnchorProps}
            popperOrigin={getPopperOrigin(placement)}
            positionType={positionType}
            container={container}
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
        )}
      </WrapperComponent>
    </LinearSpeedDialContext>
  );
};

export default LinearSpeedDial;
