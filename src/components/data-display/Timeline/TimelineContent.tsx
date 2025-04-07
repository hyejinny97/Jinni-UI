import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type TimelineContentProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {};

const TimelineContent = <T extends AsType = 'div'>(
  props: TimelineContentProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniTimelineContent', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TimelineContent;
