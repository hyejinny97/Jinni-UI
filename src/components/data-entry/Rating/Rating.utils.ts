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
