import { useEffect } from 'react';
import { TriggerType, TooltipProps } from './Tooltip';
import { isBoolean } from '@/utils/isBoolean';

export const useHandleTriggers = ({
  triggers,
  anchorElRef,
  popperRef,
  setUncontrolledOpen,
  controlledOpen,
  onOpen,
  onClose
}: {
  triggers: Array<TriggerType>;
  anchorElRef: React.RefObject<HTMLElement>;
  popperRef: React.RefObject<HTMLElement>;
  setUncontrolledOpen: React.Dispatch<React.SetStateAction<boolean>>;
  controlledOpen: TooltipProps['open'];
  onOpen: TooltipProps['onOpen'];
  onClose: TooltipProps['onClose'];
}) => {
  const isControlledTooltip = isBoolean(controlledOpen);
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
      if (isControlledTooltip && onClose) onClose(e);
      else setUncontrolledOpen(false);
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [
    anchorElRef,
    popperRef,
    hasClickTrigger,
    setUncontrolledOpen,
    isControlledTooltip,
    onClose
  ]);

  return {
    handleMouseEnter: (e: React.MouseEvent) => {
      if (!hasHoverTrigger) return;
      if (isControlledTooltip && onOpen) onOpen(e);
      else setUncontrolledOpen(true);
    },
    handleMouseLeave: (e: React.MouseEvent) => {
      if (!hasHoverTrigger) return;
      if (isControlledTooltip && onClose) onClose(e);
      else setUncontrolledOpen(false);
    },
    handleAnchorClick: (e: React.MouseEvent) => {
      if (!hasClickTrigger) return;
      if (isControlledTooltip && onOpen) onOpen(e);
      else setUncontrolledOpen(true);
    },
    handleFocus: (e: React.FocusEvent) => {
      if (!hasFocusTrigger) return;
      if (isControlledTooltip && onOpen) onOpen(e);
      else setUncontrolledOpen(true);
    },
    handleBlur: (e: React.FocusEvent) => {
      if (!hasFocusTrigger) return;
      if (isControlledTooltip && onClose) onClose(e);
      else setUncontrolledOpen(false);
    }
  };
};
