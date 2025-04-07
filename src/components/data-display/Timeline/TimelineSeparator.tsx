import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type TimelineSeparatorProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {};

const TimelineSeparator = <T extends AsType = 'div'>(
  props: TimelineSeparatorProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniTimelineSeparator', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TimelineSeparator;
