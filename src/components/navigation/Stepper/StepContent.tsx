import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type StepContentProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {};

const StepContent = <T extends AsType = 'div'>(props: StepContentProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniStepContent', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default StepContent;
