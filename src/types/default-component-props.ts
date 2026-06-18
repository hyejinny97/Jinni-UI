import type { ElementType, ComponentPropsWithRef } from 'react';
import type { StyleType } from '@/types/style';

export type AsType = ElementType;

export type DefaultComponentProps<T extends AsType> = Omit<
  ComponentPropsWithRef<T>,
  'className' | 'style'
> & {
  as?: T;
  className?: string;
  style?: StyleType;
};
