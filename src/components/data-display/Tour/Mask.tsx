import './Mask.scss';
import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type MaskProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  excludeEl: HTMLElement;
  maskHolePadding: number;
};

const Mask = <T extends AsType = 'div'>(props: MaskProps<T>) => {
  const {
    excludeEl,
    maskHolePadding,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const [hole, setHole] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const newStyle = useStyle(style);

  useLayoutEffect(() => {
    const setExcludeArea = () => {
      const { left, top, width, height } = excludeEl.getBoundingClientRect();
      setHole({
        x: left - maskHolePadding,
        y: top - maskHolePadding,
        width: width + 2 * maskHolePadding,
        height: height + 2 * maskHolePadding
      });
    };

    setExcludeArea();
    window.addEventListener('resize', setExcludeArea);
    return () => {
      window.removeEventListener('resize', setExcludeArea);
    };
  }, [excludeEl]);

  return (
    <>
      {createPortal(
        <svg className="JinniMask" style={newStyle} {...rest}>
          <defs>
            <mask id="mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                x={hole.x}
                y={hole.y}
                width={hole.width}
                height={hole.height}
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="inherit"
            mask="url(#mask)"
          />
        </svg>,
        document.body
      )}
    </>
  );
};

export default Mask;
