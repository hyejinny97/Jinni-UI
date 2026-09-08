export const isNumeric = (str: string) => {
  return !isNaN(Number(str)) && str.trim() !== '';
};

export const getDecimalLength = (num: number) => {
  if (Number.isInteger(num)) return 0;
  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
};

export const findMaxDecimalLength = (values: number[]): number => {
  return Math.max(...values.map(getDecimalLength));
};

export const findMaxDecimalPow = (...values: unknown[]) => {
  const maxDecimalLength = findMaxDecimalLength(
    values.filter((el) => typeof el === 'number')
  );
  return Math.pow(10, maxDecimalLength);
};
