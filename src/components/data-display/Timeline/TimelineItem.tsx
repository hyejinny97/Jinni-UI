import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type TimelineItemProps<T extends AsType = 'li'> = DefaultComponentProps<T> & {};

const TimelineItem = <T extends AsType = 'li'>(props: TimelineItemProps<T>) => {
  const { children, className, style, as: Component = 'li', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniTimelineItem', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TimelineItem;
