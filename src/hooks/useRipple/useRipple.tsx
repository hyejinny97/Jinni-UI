import './ripple.scss';
import { useEffect, useLayoutEffect, useRef, useCallback } from 'react';

export interface UseRippleProps {
  rippleColor: 'white' | 'black';
  rippleStartLocation?: 'center' | 'clicked';
  disableRipple?: boolean;
}

const useRipple = ({
  rippleColor,
  rippleStartLocation = 'clicked',
  disableRipple = false
}: UseRippleProps) => {
  const rippleTargetRef = useRef<HTMLElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const rippleTargetEl = rippleTargetRef.current;
    if (!rippleTargetEl) return;

    const rippleTargetPosition = rippleTargetEl.style.position;
    if (!rippleTargetPosition || rippleTargetPosition === 'static') {
      rippleTargetEl.style.position = 'relative';
    }
  }, []);

  useEffect(() => {
    const rippleTargetEl = rippleTargetRef.current;
    if (!rippleTargetEl || disableRipple) return;

    const createRipple = (e: MouseEvent | KeyboardEvent) => {
      const rippleContainerEl = rippleContainerRef.current;
      if (!rippleContainerEl) return;

      const isKeyboardEvent = e instanceof KeyboardEvent;
      const startLocation = isKeyboardEvent ? 'center' : rippleStartLocation;

      const { left, top, width, height } =
        rippleTargetEl.getBoundingClientRect();
      const size = Math.max(width, height);

      const ripple = document.createElement('span');
      ripple.style.width = ripple.style.height = `${size}px`;
      switch (startLocation) {
        case 'clicked': {
          if (isKeyboardEvent) break;
          ripple.style.left = `${e.clientX - left}px`;
          ripple.style.top = `${e.clientY - top}px`;
          break;
        }
        case 'center':
          ripple.style.left = `${width / 2}px`;
          ripple.style.top = `${height / 2}px`;
          break;
      }
      ripple.className = `JinniRipple ${rippleColor}`;

      rippleContainerEl.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 500);
    };

    const handleKeyDown = (e: KeyboardEvent) =>
      (e.code === 'Enter' || e.code === 'Space') && createRipple(e);

    rippleTargetEl.addEventListener('mousedown', createRipple);
    rippleTargetEl.addEventListener('keydown', handleKeyDown);
    return () => {
      rippleTargetEl.removeEventListener('mousedown', createRipple);
      rippleTargetEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [rippleColor, rippleStartLocation, disableRipple]);

  const RippleContainer = useCallback(
    () => <div ref={rippleContainerRef} className="JinniRippleContainer"></div>,
    []
  );

  return { rippleTargetRef, RippleContainer };
};

export default useRipple;
