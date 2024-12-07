import './RippleContainer.scss';
import cn from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type RippleContainerProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children?: React.ReactNode;
    active?: boolean;
    rippleColor?: 'white' | 'black';
  };

const RippleContainer = <T extends AsType = 'div'>(
  props: RippleContainerProps<T>
) => {
  const {
    children,
    active = true,
    rippleColor = 'black',
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const [showRipple, setShowRipple] = useState(false);
  const rippleTarget = useRef<HTMLDivElement>(null);
  const ripplePosition = useRef({ x: 0, y: 0 });
  const newStyle = useStyle(style);

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
    setTimeout(() => setShowRipple(false), 1000);
  }, [showRipple]);

  return (
    <Component
      ref={rippleTarget}
      className={cn('JinniRippleTarget', className)}
      style={newStyle}
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
    </Component>
  );
};

export default RippleContainer;
