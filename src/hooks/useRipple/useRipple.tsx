import './ripple.scss';
import { useEffect, useLayoutEffect, useRef, useCallback } from 'react';

interface useRippleProps {
  rippleColor: 'white' | 'black';
  rippleStartLocation?: 'center' | 'clicked';
  disableRipple?: boolean;
}

const useRipple = ({
  rippleColor,
  rippleStartLocation = 'clicked',
  disableRipple = false
}: useRippleProps) => {
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

    const handleClick = (e: MouseEvent) => {
      const rippleContainerEl = rippleContainerRef.current;
      if (!rippleContainerEl) return;

      const { left, top, width, height } =
        rippleTargetEl.getBoundingClientRect();
      const size = Math.max(width, height);
      const x = e.clientX - left;
      const y = e.clientY - top;

      const ripple = document.createElement('span');
      ripple.style.width = ripple.style.height = `${size}px`;
      switch (rippleStartLocation) {
        case 'clicked':
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          break;
        case 'center':
          ripple.style.left = `${size / 2}px`;
          ripple.style.top = `${size / 2}px`;
          break;
      }
      ripple.className = `JinniRipple ${rippleColor}`;

      rippleContainerEl.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 500);
    };
    rippleTargetEl.addEventListener('click', handleClick);
    return () => rippleTargetEl.removeEventListener('click', handleClick);
  }, [rippleColor, rippleStartLocation, disableRipple]);

  const RippleContainer = useCallback(
    () => <div ref={rippleContainerRef} className="JinniRippleContainer"></div>,
    []
  );

  return { rippleTargetRef, RippleContainer };
};

export default useRipple;
