import './Timeline.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type TimelineProps<T extends AsType = 'ul'> = DefaultComponentProps<T> & {
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
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn(
        'JinniTimeline',
        { reverse, showLastConnector },
        orientation,
        alignment,
        className
      )}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Timeline;
