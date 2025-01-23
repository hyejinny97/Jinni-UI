import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';

export type DrawerContentPartProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    partName?: 'Header' | 'Body' | 'Footer';
    children: React.ReactNode;
  };

const DrawerContentPart = <T extends AsType = 'div'>(
  props: DrawerContentPartProps<T>
) => {
  const {
    partName,
    children,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn(`JinniDrawer${partName}`, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const DrawerHeader = (props: DrawerContentPartProps) =>
  DrawerContentPart({ partName: 'Header', ...props });

export const DrawerBody = (props: DrawerContentPartProps) =>
  DrawerContentPart({ partName: 'Body', ...props });

export const DrawerFooter = (props: DrawerContentPartProps) =>
  DrawerContentPart({ partName: 'Footer', ...props });
