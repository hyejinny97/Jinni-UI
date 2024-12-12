import './ripple.scss';
import { useEffect, useLayoutEffect, useRef } from 'react';

interface useRippleProps {
  rippleColor: 'white' | 'black';
}

const useRipple = ({ rippleColor }: useRippleProps) => {
  const rippleTargetRef = useRef<HTMLElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const rippleTargetEl = rippleTargetRef.current;
    if (!rippleTargetEl) return;
    rippleTargetEl.style.position = 'relative';
  }, []);

  useEffect(() => {
    const rippleTargetEl = rippleTargetRef.current;
    if (!rippleTargetEl) return;

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
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.className = `JinniRipple ${rippleColor}`;

      rippleContainerEl.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 500);
    };
    rippleTargetEl.addEventListener('click', handleClick);
    return () => rippleTargetEl.removeEventListener('click', handleClick);
  }, [rippleColor]);

  const RippleContainer = () => (
    <div ref={rippleContainerRef} className="JinniRippleContainer"></div>
  );

  return { rippleTargetRef, RippleContainer };
};

export default useRipple;
