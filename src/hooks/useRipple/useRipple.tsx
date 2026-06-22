import './ripple.scss';
import { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import useOverlay from '@/hooks/useOverlay';
import useJinni from '@/hooks/useJinni';
import { ColorType } from '@/types/color';

export interface UseRippleProps {
  rippleColor?: ColorType;
  rippleStartLocation?: 'center' | 'clicked';
  disableRipple?: boolean;
}

const DURATION_TIME = 500; // ms

const useRipple = (props: UseRippleProps) => {
  const { theme } = useJinni();
  const {
    rippleColor = theme === 'light' ? 'black' : 'white',
    rippleStartLocation = 'clicked',
    disableRipple = false
  } = props;
  const rippleOverlay = useOverlay({
    color: rippleColor,
    alpha: rippleColor === 'black' ? 5 : 7
  });

  const rippleTargetRef = useRef<HTMLElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);
  const rippleTriggerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const rippleTargetEl = rippleTargetRef.current;
    if (!rippleTargetEl) return;

    const rippleTargetPosition =
      window.getComputedStyle(rippleTargetEl).position;
    if (!rippleTargetPosition || rippleTargetPosition === 'static') {
      rippleTargetEl.style.position = 'relative';
    }

    if (!rippleTriggerRef.current) {
      rippleTriggerRef.current = rippleTargetEl;
    }
  }, []);

  useEffect(() => {
    const rippleTargetEl = rippleTargetRef.current;
    const rippleTriggerEl = rippleTriggerRef.current;
    if (!rippleTargetEl || !rippleTriggerEl || disableRipple) return;

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
      const timeoutId = setTimeout(() => {
        rippleContainerEl.removeChild(ripple);
        clearTimeout(timeoutId);
      }, DURATION_TIME);
    };

    const handleKeyDown = (e: KeyboardEvent) =>
      (e.code === 'Enter' || e.code === 'Space') && createRipple(e);

    rippleTriggerEl.addEventListener('mousedown', createRipple);
    rippleTriggerEl.addEventListener('keydown', handleKeyDown);
    return () => {
      rippleTriggerEl.removeEventListener('mousedown', createRipple);
      rippleTriggerEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [rippleColor, rippleStartLocation, disableRipple]);

  const RippleContainer = useCallback(
    () => (
      <div
        ref={rippleContainerRef}
        className="JinniRippleContainer"
        style={{
          '--ripple-overlay': rippleOverlay,
          '--duration-time': `${DURATION_TIME}ms`
        }}
      ></div>
    ),
    [rippleOverlay]
  );

  return { rippleTriggerRef, rippleTargetRef, RippleContainer };
};

export default useRipple;
