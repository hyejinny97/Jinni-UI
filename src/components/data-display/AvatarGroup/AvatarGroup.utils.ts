import type { AvatarGroupProps } from './AvatarGroup';
import {
  isPositiveInteger,
  isNegativeInteger,
  isFloat
} from '@/utils/isNumber';

const VALIDATION_ERROR_MESSAGE = '양의 정수 값을 입력해야 합니다.';

export const validatePositiveInteger = (value: number): number => {
  let validatedValue: number;
  let showConsoleError: boolean = true;
  if (value === 0) {
    validatedValue = value;
  } else if (isPositiveInteger(value)) {
    validatedValue = value;
    showConsoleError = false;
  } else if (isNegativeInteger(value)) {
    validatedValue = -value;
  } else if (isFloat(value)) {
    validatedValue = value > 0 ? Math.floor(value) : Math.floor(-value);
  } else {
    throw new Error(VALIDATION_ERROR_MESSAGE);
  }
  if (showConsoleError) console.error(VALIDATION_ERROR_MESSAGE);
  return validatedValue;
};

export const getAvatarWidth = ({
  size
}: Required<Pick<AvatarGroupProps, 'size'>>): string => {
  if (typeof size === 'number') return `${size}px`;

  switch (size) {
    case 'xs':
      return '24px';
    case 'sm':
      return '32px';
    case 'md':
      return '48px';
    case 'lg':
      return '64px';
    case 'xl':
      return '96px';
  }
};
