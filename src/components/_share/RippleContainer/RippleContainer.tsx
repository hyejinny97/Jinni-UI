import './RippleContainer.scss';
import cn from 'classnames';
import { useState, useRef, useEffect } from 'react';

interface RippleContainerProps extends React.HtmlHTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
  active?: boolean;
  rippleColor?: 'white' | 'black';
}

const RippleContainer = ({
  className,
  children,
  active = true,
  rippleColor = 'black',
  ...rest
}: RippleContainerProps) => {
  const [showRipple, setShowRipple] = useState(false);
  const rippleTarget = useRef<HTMLDivElement>(null);
  const ripplePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const rippleTargetEl = rippleTarget.current;
    if (!rippleTargetEl || !active) return;

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
  }, [active]);

  useEffect(() => {
    if (!showRipple) return;
    setTimeout(() => setShowRipple(false), 500);
  }, [showRipple]);

  return (
    <div
      ref={rippleTarget}
      className={cn(className, { JinniRippleTarget: active })}
      {...rest}
    >
      {children}
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
};

export default RippleContainer;
