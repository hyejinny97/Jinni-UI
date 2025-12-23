import './TimelineItem.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useTimeline } from '../Timeline.hooks';

type TimelineItemProps<T extends AsType = 'li'> = DefaultComponentProps<T> & {};

const TimelineItem = <T extends AsType = 'li'>(props: TimelineItemProps<T>) => {
  const { children, className, style, as: Component = 'li', ...rest } = props;
  const { orientation } = useTimeline();
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniTimelineItem', orientation, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TimelineItem;
