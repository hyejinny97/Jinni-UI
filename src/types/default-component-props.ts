import type { StyleType } from '@/types/style';

export interface DefaultComponentProps<T>
  extends Omit<React.HTMLAttributes<T>, 'style'> {
  className?: string;
  style?: StyleType;
}
