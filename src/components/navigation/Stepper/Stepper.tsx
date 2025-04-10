import './Stepper.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

export type StepperProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
    alignment?: 'left' | 'right' | 'top' | 'bottom';
  };

const Stepper = <T extends AsType = 'div'>(props: StepperProps<T>) => {
  const {
    children,
    orientation = 'horizontal',
    alignment = 'right',
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniStepper', orientation, alignment, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Stepper;
