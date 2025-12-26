import './StepDescription.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useStep } from '../Step';

type StepDescriptionProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
  };

const StepDescription = <T extends AsType = 'div'>(
  props: StepDescriptionProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const { status } = useStep();
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniStepDescription', status, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default StepDescription;
