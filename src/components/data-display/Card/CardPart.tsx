import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type CardPartProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  partName?: 'Header' | 'Body' | 'Footer';
  children: React.ReactNode;
};

const CardPart = <T extends AsType = 'div'>(props: CardPartProps<T>) => {
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
      className={cn(`JinniCard${partName}`, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const CardHeader = (props: CardPartProps) =>
  CardPart({ partName: 'Header', ...props });

export const CardBody = (props: CardPartProps) =>
  CardPart({ partName: 'Body', ...props });

export const CardFooter = (props: CardPartProps) =>
  CardPart({ partName: 'Footer', ...props });
