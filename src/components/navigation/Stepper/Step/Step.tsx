import './Step.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import StepContext from './Step.contexts';
import { useStepper } from '../Stepper.hooks';

export type StatusType = 'completed' | 'active' | 'pending';

export type StepProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  status?: StatusType;
};

const Step = <T extends AsType = 'div'>(props: StepProps<T>) => {
  const {
    children,
    status = 'pending',
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { orientation, alignment, connectorColor } = useStepper();
  const newStyle = useStyle({ '--connector-color': connectorColor, ...style });

  return (
    <StepContext.Provider value={{ status }}>
      <Component
        className={cn('JinniStep', orientation, alignment, status, className)}
        style={newStyle}
        {...rest}
      >
        <div className={cn('JinniStepConnector', 'before', orientation)} />
        {children}
        <div className={cn('JinniStepConnector', 'after', orientation)} />
      </Component>
    </StepContext.Provider>
  );
};

export default Step;
