import './Timeline.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import TimelineContext from './Timeline.contexts';
import { useTimelineItemChildren } from './Timeline.hooks';

export type TimelineProps<T extends AsType = 'ul'> =
  DefaultComponentProps<T> & {
    orientation?: 'horizontal' | 'vertical';
    alignment?: 'before' | 'after' | 'alternate' | 'alternate-reverse';
    reverse?: boolean;
    showLastConnector?: boolean;
  };

const Timeline = <T extends AsType = 'ul'>(props: TimelineProps<T>) => {
  const {
    orientation = 'vertical',
    alignment = 'after',
    reverse = false,
    showLastConnector = false,
    children,
    className,
    style,
    as: Component = 'ul',
    ...rest
  } = props;
  const { timelineItemChildren } = useTimelineItemChildren({ children });
  const newStyle = useStyle(style);

  return (
    <TimelineContext.Provider value={{ orientation }}>
      <Component
        className={cn(
          'JinniTimeline',
          { showLastConnector },
          orientation,
          alignment,
          className
        )}
        style={newStyle}
        {...rest}
      >
        {reverse ? timelineItemChildren.reverse() : timelineItemChildren}
      </Component>
    </TimelineContext.Provider>
  );
};

export default Timeline;
