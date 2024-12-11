import type { StyleType } from '@/types/style';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type AsType = keyof JSX.IntrinsicElements | React.ComponentType<any>;
type DefaultProps<T extends AsType> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : React.ComponentPropsWithoutRef<T>;

export type DefaultComponentProps<T extends AsType> = Omit<
  DefaultProps<T>,
  'style'
> & {
  as?: T;
  className?: string;
  style?: StyleType;
};
