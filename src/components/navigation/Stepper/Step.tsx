import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import StepStatusContext from './Stepper.context';

export type StatusType = 'completed' | 'active' | 'pending';

type StepProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
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
  const newStyle = useStyle(style);

  return (
    <StepStatusContext.Provider value={status}>
      <Component
        className={cn('JinniStep', className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </StepStatusContext.Provider>
  );
};

export default Step;
