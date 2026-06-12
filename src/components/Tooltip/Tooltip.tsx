import './Tooltip.scss';
import cn from 'classnames';
import React, {
  useRef,
  useMemo,
  isValidElement,
  cloneElement,
  MutableRefObject,
  Fragment
} from 'react';
import { AsType } from '@/types/default-component-props';
import { useOpen, useHandleTriggers } from './Tooltip.hooks';
import { PlacementType } from '@/types/placement';
import {
  placementToAnchorOrigin,
  placementToPopperOrigin
} from '@/utils/placement';
import Popper, { PopperProps } from '@/components/Popper';
import { Box, BoxProps } from '@/components/layout/Box';

export type TriggerType = 'click' | 'hover' | 'focus';

export type TooltipProps<T extends AsType = 'div'> = Omit<
  PopperProps<T>,
  | 'anchorReference'
  | 'anchorOrigin'
  | 'popperOrigin'
  | 'anchorElRef'
  | 'anchorPosition'
  | 'content'
> & {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: PlacementType;
  arrow?: boolean;
  offset?: number;
  triggers?: Array<TriggerType>;
  open?: boolean;
  onOpen?: (event: React.SyntheticEvent | Event) => void;
  onClose?: (event: React.SyntheticEvent | Event) => void;
  BoxProps?: BoxProps;
  WrapperComponent?: React.ComponentType<{ children: React.ReactNode }>;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  TransitionComponent?: React.ComponentType<any>;
};

const TooltipComponent = <T extends AsType = 'div'>(props: TooltipProps<T>) => {
  const {
    children,
    content,
    placement = 'bottom',
    arrow,
    offset = 14,
    triggers = ['click', 'hover', 'focus'],
    open,
    onOpen,
    onClose,
    BoxProps,
    WrapperComponent = Fragment,
    TransitionComponent,
    positionType,
    container,
    className,
    style,
    ...rest
  } = props;
  const anchorElRef = useRef<HTMLElement>(null);
  const popperRef = useRef<HTMLElement>(null);
  const anchorOrigin = useMemo(
    () => placementToAnchorOrigin(placement),
    [placement]
  );
  const popperOrigin = useMemo(
    () => placementToPopperOrigin(placement),
    [placement]
  );
  const { isOpen, handleOpen, handleClose } = useOpen({
    open,
    onOpen,
    onClose
  });
  const {
    handleMouseEnter,
    handleMouseLeave,
    handleAnchorClick,
    handleFocus,
    handleBlur
  } = useHandleTriggers({
    triggers,
    anchorElRef,
    popperRef,
    handleOpen,
    handleClose
  });
  const tooltipAnchorProps = {
    ref: anchorElRef,
    className: 'JinniTooltipAnchor',
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleAnchorClick,
    onFocus: handleFocus,
    onBlur: handleBlur
  };
  const isSingleElement = isValidElement(children);

  let anchor = <span {...tooltipAnchorProps}>{children}</span>;
  if (isSingleElement) {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const element = children as React.ReactElement & { ref?: React.Ref<any> };
    anchor = cloneElement(element, {
      ...tooltipAnchorProps,
      ref: (el: HTMLElement | null) => {
        if (el) {
          if (element.ref) {
            if (typeof element.ref === 'function') {
              element.ref(el);
            } else if ('current' in element.ref) {
              (element.ref as MutableRefObject<HTMLElement>).current = el;
            }
          }
          (anchorElRef as MutableRefObject<HTMLElement>).current = el;
        }
      },
      className: cn(element.props.className, tooltipAnchorProps.className),
      onMouseEnter: (e: React.MouseEvent) => {
        if (element.props.onMouseEnter) element.props.onMouseEnter(e);
        tooltipAnchorProps.onMouseEnter(e);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        if (element.props.onMouseLeave) element.props.onMouseLeave(e);
        tooltipAnchorProps.onMouseLeave(e);
      },
      onClick: (e: React.MouseEvent) => {
        if (element.props.onClick) element.props.onClick(e);
        tooltipAnchorProps.onClick(e);
      },
      onFocus: (e: React.FocusEvent) => {
        if (element.props.onFocus) element.props.onFocus(e);
        tooltipAnchorProps.onFocus(e);
      },
      onBlur: (e: React.FocusEvent) => {
        if (element.props.onBlur) element.props.onBlur(e);
        tooltipAnchorProps.onBlur(e);
      }
    });
  }

  return (
    <>
      {anchor}
      <WrapperComponent>
        {isOpen && (
          <Popper
            role="tooltip"
            ref={popperRef}
            className={cn('JinniTooltip', className)}
            as={TransitionComponent}
            anchorReference="anchorEl"
            anchorElRef={anchorElRef}
            anchorOrigin={anchorOrigin}
            popperOrigin={popperOrigin}
            positionType={positionType}
            container={container}
            style={{
              '--transform-origin': `${popperOrigin.horizontal} ${popperOrigin.vertical}`,
              '--offset': `${offset}px`,
              ...style
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...rest}
          >
            <Box
              className={cn(
                'JinniTooltipContent',
                { arrow },
                placement,
                className
              )}
              round={4}
              {...BoxProps}
            >
              {content}
            </Box>
          </Popper>
        )}
      </WrapperComponent>
    </>
  );
};

const Tooltip = React.memo(
  TooltipComponent
) as unknown as typeof TooltipComponent;

export default Tooltip;
