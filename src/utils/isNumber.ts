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

export const validatePositiveInteger = ({
  value,
  allow = ['zero', 'negativeInteger', 'float'],
  errorMessage = '양의 정수 값을 입력해야 합니다.'
}: {
  value: number;
  allow?: Array<'zero' | 'negativeInteger' | 'float'>;
  errorMessage?: string;
}): number => {
  if (isPositiveInteger(value)) {
    return value;
  }
  if (allow.includes('zero') && value === 0) {
    return value;
  }
  if (allow.includes('negativeInteger') && isNegativeInteger(value)) {
    return -value;
  }
  if (allow.includes('float') && isFloat(value)) {
    return value > 0 ? Math.floor(value) : Math.floor(-value);
  }
  console.error(errorMessage);
  throw new Error(errorMessage);
};
