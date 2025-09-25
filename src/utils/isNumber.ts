export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

export const isPositiveInteger = (value: number): boolean => {
  return Number.isInteger(value) && value > 0;
};

export const isNegativeInteger = (value: number): boolean => {
  return Number.isInteger(value) && value < 0;
};

export const isFloat = (value: number): boolean => {
  return value % 1 !== 0;
};
