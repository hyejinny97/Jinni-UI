import { SizeType } from './Rating';

export const getContainerWidthStyle = ({
  value,
  max
}: {
  value: number;
  max: number;
}) => {
  return { width: `${(value / max) * 100}%` };
};

export const getIconsSizeStyle = ({
  size,
  max
}: {
  size: SizeType;
  max: number;
}) => {
  let iconWidth;
  switch (size) {
    case 'sm':
      iconWidth = 18;
      break;
    case 'md':
      iconWidth = 24;
      break;
    case 'lg':
      iconWidth = 30;
  }

  return {
    width: `${iconWidth * max}px`,
    height: `${iconWidth}px`
  };
};

export const ceilByStep = ({
  value,
  step
}: {
  value: number;
  step: number;
}) => {
  let ceiledValue = 0;
  while (ceiledValue < value) {
    ceiledValue += step;
  }
  return ceiledValue;
};
