import { useEffect, useState, useCallback } from 'react';
import { TriggerType, TooltipProps } from './Tooltip';
import { isBoolean } from '@/utils/isBoolean';

export const useOpen = ({
  open,
  onOpen,
  onClose
}: Pick<TooltipProps, 'open' | 'onOpen' | 'onClose'>) => {
  const isControlledTooltip = open !== undefined && isBoolean(open);
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(false);

  const handleOpen = useCallback(
    (event: React.SyntheticEvent | Event) => {
      if (!isControlledTooltip) setUncontrolledOpen(true);
      if (onOpen) {
        onOpen(event);
      }
    },
    [isControlledTooltip, onOpen]
  );

  const handleClose = useCallback(
    (event: React.SyntheticEvent | Event) => {
      if (!isControlledTooltip) setUncontrolledOpen(false);
      if (onClose) {
        onClose(event);
      }
    },
    [isControlledTooltip, onClose]
  );

  return {
    isOpen: isControlledTooltip ? open : uncontrolledOpen,
    handleOpen,
    handleClose
  };
};

export const useHandleTriggers = ({
  triggers,
  anchorElRef,
  popperRef,
  handleOpen,
  handleClose
}: {
  triggers: Array<TriggerType>;
  anchorElRef: React.RefObject<HTMLElement>;
  popperRef: React.RefObject<HTMLElement>;
  handleOpen: (event: React.SyntheticEvent | Event) => void;
  handleClose: (event: React.SyntheticEvent | Event) => void;
}) => {
  const hasClickTrigger = triggers.includes('click');
  const hasHoverTrigger = triggers.includes('hover');
  const hasFocusTrigger = triggers.includes('focus');

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchorEl = anchorElRef.current;
      const tooltipEl = popperRef.current;
      const clickedEl = e.target as Node;
      if (!hasClickTrigger) return;
      if (!anchorEl || !tooltipEl || !clickedEl) return;
      if (anchorEl.contains(clickedEl) || tooltipEl.contains(clickedEl)) return;
      handleClose(e);
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [anchorElRef, popperRef, hasClickTrigger, handleClose]);

  return {
    handleMouseEnter: (e: React.MouseEvent) => {
      if (!hasHoverTrigger) return;
      handleOpen(e);
    },
    handleMouseLeave: (e: React.MouseEvent) => {
      if (!hasHoverTrigger) return;
      handleClose(e);
    },
    handleAnchorClick: (e: React.MouseEvent) => {
      if (!hasClickTrigger) return;
      handleOpen(e);
    },
    handleFocus: (e: React.FocusEvent) => {
      if (!hasFocusTrigger) return;
      handleOpen(e);
    },
    handleBlur: (e: React.FocusEvent) => {
      if (!hasFocusTrigger) return;
      handleClose(e);
    }
  };
};
