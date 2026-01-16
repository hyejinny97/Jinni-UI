export const roundToDecimal = ({
  value,
  digits
}: {
  value: number;
  digits: number;
}) => {
  return Math.round(value * 10 ** digits) / 10 ** digits;
};
