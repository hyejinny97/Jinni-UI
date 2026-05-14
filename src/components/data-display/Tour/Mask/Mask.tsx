import './Mask.scss';
import { useId } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useMaskSize, useSpotlightSize } from './Mask.hooks';
import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

export type MaskOptionalProps = {
  spotlightPadding?: number;
  spotlightShape?: 'rectangular' | 'rounded' | 'circular';
  maskColor?: ColorType;
};

export type MaskProps<T extends AsType = 'svg'> = DefaultComponentProps<T> &
  MaskOptionalProps & {
    spotlightElRef: React.RefObject<HTMLElement>;
  };

const ROUNDED = 4;

const Mask = <T extends AsType = 'svg'>(props: MaskProps<T>) => {
  const {
    spotlightElRef,
    spotlightPadding = 5,
    spotlightShape = 'rectangular',
    maskColor = 'rgba(0,0,0,0.7)',
    className,
    style,
    ...rest
  } = props;
  const maskId = useId();
  const normalizedMaskColor = useColor(maskColor);
  const { maskSize } = useMaskSize();
  const { spotlightSize } = useSpotlightSize({
    spotlightElRef,
    spotlightPadding
  });
  const newStyle = useStyle({ ...maskSize, ...style });

  let spotlight = <></>;
  switch (spotlightShape) {
    case 'rectangular':
      spotlight = <rect {...spotlightSize} fill="black" />;
      break;
    case 'rounded':
      spotlight = (
        <rect {...spotlightSize} rx={ROUNDED} ry={ROUNDED} fill="black" />
      );
      break;
    case 'circular': {
      const { x, y, width, height } = spotlightSize;
      spotlight = (
        <circle
          cx={x + width / 2}
          cy={y + height / 2}
          r={Math.max(width, height) / 2}
          fill="black"
        />
      );
    }
  }

  return (
    <>
      {createPortal(
        <svg className={cn('JinniMask', className)} style={newStyle} {...rest}>
          <defs>
            <mask id={maskId}>
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {spotlight}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={normalizedMaskColor}
            mask={`url(#${maskId})`}
          />
        </svg>,
        document.body
      )}
    </>
  );
};

export default Mask;
