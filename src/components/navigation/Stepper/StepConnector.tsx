import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';
import { useStepStatus } from './Stepper.hooks';

export type StepConnectorProps<T extends AsType = 'span'> =
  DefaultComponentProps<T> & {
    color?: ColorType;
  };

const StepConnector = <T extends AsType = 'span'>(
  props: StepConnectorProps<T>
) => {
  const {
    color = 'gray-400',
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  const stepStatus = useStepStatus();
  const isCompleted = stepStatus === 'completed';
  const colorByStatus = isCompleted ? color : 'gray-400';
  const newStyle = useStyle({ '--color': colorByStatus, ...style });

  return (
    <Component
      className={cn('JinniStepConnector', className)}
      style={newStyle}
      {...rest}
    />
  );
};

export default StepConnector;
