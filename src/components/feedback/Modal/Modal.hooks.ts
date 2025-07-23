import { useEffect } from 'react';
import useBreakpoint from '@/hooks/useBreakpoint';
import { isResponsive, editResponsive } from '@/utils/responsive';
import { ModalProps } from './Modal';

type useKeydownProps = Pick<ModalProps, 'onClose'>;
type useModalSizeProps = Pick<ModalProps, 'size'>;

export const useKeydown = ({ onClose }: useKeydownProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (!onClose) return;
      if (e.key === 'Escape') {
        onClose(e, 'escapeKeydown');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
};

export const useModalSize = ({ size }: useModalSizeProps) => {
  const breakpoint = useBreakpoint();

  if (isResponsive(size)) return editResponsive(size, breakpoint);
  return size;
};
