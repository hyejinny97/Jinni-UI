import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useStepStatus } from './Stepper.hooks';

type StepTitleProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
};

const StepTitle = <T extends AsType = 'div'>(props: StepTitleProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const stepStatus = useStepStatus();
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniStepTitle', stepStatus, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default StepTitle;
