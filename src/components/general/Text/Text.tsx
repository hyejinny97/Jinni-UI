import './Text.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type TextProps<T extends AsType = 'p'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  lineClamp?: number;
};

const Text = <T extends AsType = 'p'>(props: TextProps<T>) => {
  const {
    children,
    lineClamp,
    className,
    style,
    as: Component = 'p',
    ...rest
  } = props;
  const newStyle = useStyle({ '--line-clamp': lineClamp, ...style });

  return (
    <Component
      className={cn('JinniText', { lineClamp }, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Text;
