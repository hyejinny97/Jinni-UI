import './Tooltip.scss';
import cn from 'classnames';
import React, {
  useRef,
  useMemo,
  isValidElement,
  cloneElement,
  MutableRefObject
} from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useOpen, useHandleTriggers } from './Tooltip.hooks';
import { PlacementType } from '@/types/popper';
import {
  placementToAnchorOrigin,
  placementToPopperOrigin
} from '@/utils/popper';
import { Popper } from '@/components/_share/Popper';
import { Box, BoxProps } from '@/components/layout/Box';
import { Motion } from '@/components/motion/Motion';
import { AnimatePresence } from '@/components/motion/AnimatePresence';

export type TriggerType = 'click' | 'hover' | 'focus';

export type TooltipProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'content' | 'children'
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
  enterDelay?: number;
  leaveDelay?: number;
  TransitionComponent?: React.ComponentType<{ children: React.ReactNode }>;
};

type ScaleFadeProps = {
  children: React.ReactNode;
  enterDelay: number;
  leaveDelay: number;
};

const ScaleFade = ({ children, enterDelay, leaveDelay }: ScaleFadeProps) => {
  return (
    <Motion
      initial={{ transform: 'scale(0.9)', opacity: 0 }}
      animate={{ transform: 'scale(1)', opacity: 1 }}
      exit={{ transform: 'scale(0.9)', opacity: 0 }}
      transition={{
        enter: `transform var(--jinni-duration-short3) var(--jinni-easing-emphasized) ${enterDelay}ms, opacity var(--jinni-duration-short3) var(--jinni-easing-emphasized) ${enterDelay}ms`,
        exit: `transform var(--jinni-duration-short3) var(--jinni-easing-emphasized) ${leaveDelay}ms, opacity var(--jinni-duration-short3) var(--jinni-easing-emphasized) ${leaveDelay}ms`
      }}
    >
      {children}
    </Motion>
  );
};

const Tooltip = <T extends AsType = 'div'>(props: TooltipProps<T>) => {
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
    enterDelay = 0,
    leaveDelay = 0,
    TransitionComponent = ScaleFade,
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
          if (element.ref)
            (element.ref as MutableRefObject<HTMLElement>).current = el;
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
      <AnimatePresence>
        {isOpen && (
          <Popper
            ref={popperRef}
            className={cn('JinniTooltip', className)}
            anchorReference="anchorEl"
            anchorElRef={anchorElRef}
            anchorOrigin={anchorOrigin}
            popperOrigin={popperOrigin}
            style={{
              '--transform-origin': `${popperOrigin.horizontal} ${popperOrigin.vertical}`,
              '--offset': `${offset}px`,
              ...style
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...rest}
          >
            <TransitionComponent
              enterDelay={enterDelay}
              leaveDelay={leaveDelay}
            >
              <Box
                role="tooltip"
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
            </TransitionComponent>
          </Popper>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tooltip;
