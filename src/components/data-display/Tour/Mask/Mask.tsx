import './Mask.scss';
import { createPortal } from 'react-dom';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useMaskSize, useHole } from './Mask.hooks';

export type MaskProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
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
  const { size } = useMaskSize();
  const { hole } = useHole({ excludeEl, maskHolePadding });
  const newStyle = useStyle({ ...size, ...style });

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
