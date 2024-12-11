import './ripple.scss';
import cn from 'classnames';
import { useState, useEffect, useRef } from 'react';

interface useRippleProps {
  rippleColor: 'white' | 'black';
}

const useRipple = ({ rippleColor }: useRippleProps) => {
  const [showRipple, setShowRipple] = useState(false);
  const rippleTargetRef = useRef<HTMLElement>(null);
  const ripplePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const rippleTargetEl = rippleTargetRef.current;
    if (!rippleTargetEl) return;
    rippleTargetEl.style.position = 'relative';

    const handleClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      if (!target) return;
      const x = e.clientX - target.getBoundingClientRect().left;
      const y = e.clientY - target.getBoundingClientRect().top;
      ripplePosition.current = { x, y };
      setShowRipple(true);
    };
    rippleTargetEl.addEventListener('click', handleClick);
    return () => rippleTargetEl.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (!showRipple) return;
    setTimeout(() => setShowRipple(false), 1000);
  }, [showRipple]);

  const RippleContainer = () => (
    <div className="JinniRippleContainer">
      {showRipple && (
        <span
          className={cn('JinniRipple', rippleColor)}
          style={{
            left: ripplePosition.current.x,
            top: ripplePosition.current.y
          }}
        />
      )}
    </div>
  );

  return { RippleContainer, rippleTargetRef };
};

export default useRipple;
