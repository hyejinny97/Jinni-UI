import './CircularSpeedDial.scss';
import { useRef, Fragment } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Popper, PopperProps } from '@/components/_share/Popper';
import { getDefaultPlacement } from './CircularSpeedDial.utils';
import { HORIZONTAL_CENTER_VERTICAL_CENTER } from './CircularSpeedDial.constants';
import {
  useSpeedDialContent,
  useClose,
  useKeyboardAccessibility
} from './CircularSpeedDial.hooks';
import { CircularSpeedDialContext } from './CircularSpeedDial.contexts';
import { DistributiveOmit } from '@/types/distributiveOmit';

export type VariantType = 'circular' | 'semi-circular' | 'quarter-circular';
export type PlacementMap = {
  circular: undefined;
  'semi-circular': 'up' | 'down' | 'left' | 'right';
  'quarter-circular': 'up-left' | 'up-right' | 'down-left' | 'down-right';
};
export type CloseReason =
  | 'backgroundClick'
  | 'blur'
  | 'mouseLeave'
  | 'escapeKeyDown';

export type CircularSpeedDialProps<T extends AsType = 'div'> = DistributiveOmit<
  PopperProps<T>,
  'anchorOrigin' | 'popperOrigin'
> & {
  children: React.ReactNode;
  open: boolean;
  onClose?: (event: Event | React.SyntheticEvent, reason: CloseReason) => void;
  variant?: VariantType;
  placement?: PlacementMap[VariantType];
  offset?: number;
  WrapperComponent?: React.ComponentType<{ children: React.ReactNode }>;
};

const CircularSpeedDial = <T extends AsType = 'div'>(
  props: CircularSpeedDialProps<T>
) => {
  const {
    children,
    open,
    onClose,
    variant = 'circular',
    placement = getDefaultPlacement(variant),
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
  useSpeedDialContent({
    open,
    offset,
    placement,
    anchorElRef,
    speedDialContentElRef
  });
  const { speedDialElRef } = useClose({
    open,
    onClose,
    anchorElRef,
    container
  });
  useKeyboardAccessibility({
    open,
    speedDialContentElRef,
    container
  });

  const popperAnchorProps: PopperProps =
    anchorReference === 'anchorEl'
      ? {
          anchorReference: 'anchorEl',
          anchorElRef: anchorElRef!,
          anchorOrigin: HORIZONTAL_CENTER_VERTICAL_CENTER
        }
      : {
          anchorReference: 'anchorPosition',
          anchorPosition: anchorPosition!
        };

  return (
    <CircularSpeedDialContext.Provider value={{ positionType, container }}>
      <WrapperComponent>
        {open && (
          <Popper
            ref={speedDialElRef}
            role="menu"
            className={cn('JinniCircularSpeedDial', className)}
            {...popperAnchorProps}
            popperOrigin={HORIZONTAL_CENTER_VERTICAL_CENTER}
            positionType={positionType}
            container={container}
            style={style}
            {...rest}
          >
            <div
              ref={speedDialContentElRef}
              className={cn('JinniCircularSpeedDialContent', placement)}
            >
              {children}
            </div>
          </Popper>
        )}
      </WrapperComponent>
    </CircularSpeedDialContext.Provider>
  );
};

export default CircularSpeedDial;
