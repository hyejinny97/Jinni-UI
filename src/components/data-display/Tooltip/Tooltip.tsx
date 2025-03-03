import './Tooltip.scss';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import { useRef, useMemo, isValidElement, cloneElement } from 'react';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import usePopperPosition from '@/hooks/usePopperPosition';
import { getAnchorOrigin, getPopperOrigin } from './Tooltip.utils';
import { useOpen, useHandleTriggers } from './Tooltip.hooks';
import TooltipContent, { TooltipContentProps } from './TooltipContent';

export type PlacementType =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end';

export type TriggerType = 'click' | 'hover' | 'focus';

export type TooltipProps<T extends AsType = 'span'> = Omit<
  DefaultComponentProps<T>,
  'content'
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
  TooltipContentProps?: TooltipContentProps;
};

const Tooltip = <T extends AsType = 'span'>(props: TooltipProps<T>) => {
  const {
    children,
    content,
    placement = 'bottom',
    arrow = false,
    offset = 14,
    triggers = ['click', 'hover', 'focus'],
    open,
    onOpen,
    onClose,
    TooltipContentProps,
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  const anchorElRef = useRef<HTMLElement>(null);
  const { isOpen, handleOpen, handleClose } = useOpen({
    open,
    onOpen,
    onClose
  });
  const anchorOrigin = useMemo(() => getAnchorOrigin(placement), [placement]);
  const popperOrigin = useMemo(() => getPopperOrigin(placement), [placement]);
  const { popperRef, popperPosition } = usePopperPosition({
    anchorReference: 'anchorEl',
    anchorElRef,
    anchorOrigin,
    popperOrigin,
    open: isOpen
  });
  const newStyle = useStyle({
    ...popperPosition,
    '--offset': `${offset}px`,
    ...style
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

  return (
    <>
      {isSingleElement ? (
        cloneElement(children, {
          ...tooltipAnchorProps,
          className: cn(
            'JinniTooltipAnchor',
            (children as React.ReactElement).props.className
          )
        })
      ) : (
        <span {...tooltipAnchorProps}>{children}</span>
      )}
      {isOpen &&
        createPortal(
          <Component
            ref={popperRef}
            className={cn('JinniTooltip', className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={newStyle}
            {...rest}
          >
            <TooltipContent
              placement={placement}
              arrow={arrow}
              {...TooltipContentProps}
            >
              {content}
            </TooltipContent>
          </Component>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
