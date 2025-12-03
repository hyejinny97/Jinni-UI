export const getContainerWidthStyle = ({
  value,
  max
}: {
  value: number;
  max: number;
}) => {
  return { width: `${(value / max) * 100}%` };
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

export const floorByStep = ({
  value,
  step,
  max
}: {
  value: number;
  step: number;
  max: number;
}) => {
  let floorValue = max;
  while (floorValue > value) {
    floorValue -= step;
  }
  return floorValue;
};
