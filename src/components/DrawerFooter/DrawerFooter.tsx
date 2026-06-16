import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';

export type DrawerFooterProps<T extends AsType = 'div'> =
  DefaultComponentProps<T>;

const DrawerFooter = <T extends AsType = 'div'>(
  props: DrawerFooterProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniDrawerFooter', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default DrawerFooter;
