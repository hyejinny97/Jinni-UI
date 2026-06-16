import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';

export type ModalFooterProps<T extends AsType = 'div'> =
  DefaultComponentProps<T>;

const ModalFooter = <T extends AsType = 'div'>(props: ModalFooterProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniModalFooter', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default ModalFooter;
