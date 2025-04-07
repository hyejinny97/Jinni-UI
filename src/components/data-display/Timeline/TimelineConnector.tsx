import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';

type TimelineConnectorProps<T extends AsType = 'span'> =
  DefaultComponentProps<T> & {
    variant?: 'solid' | 'dotted' | 'dashed';
    color?: ColorType;
  };

const TimelineConnector = <T extends AsType = 'span'>(
  props: TimelineConnectorProps<T>
) => {
  const {
    variant = 'solid',
    color = 'gray-400',
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  const newStyle = useStyle({ '--connector-color': color, ...style });

  return (
    <Component
      className={cn('JinniTimelineConnector', variant, className)}
      style={newStyle}
      {...rest}
    />
  );
};

export default TimelineConnector;
