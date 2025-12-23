import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type TimelineOppositeContentProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {};

const TimelineOppositeContent = <T extends AsType = 'div'>(
  props: TimelineOppositeContentProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniTimelineOppositeContent', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TimelineOppositeContent;
