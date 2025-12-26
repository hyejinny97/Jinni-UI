import './Stepper.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import StepperContext from './Stepper.contexts';
import { ColorType } from '@/types/color';

export type StepperProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
    alignment?: 'left' | 'right' | 'top' | 'bottom';
    connectorColor?: ColorType;
  };

const Stepper = <T extends AsType = 'div'>(props: StepperProps<T>) => {
  const {
    children,
    orientation = 'horizontal',
    alignment = 'right',
    connectorColor = 'gray-400',
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <StepperContext.Provider value={{ orientation, alignment, connectorColor }}>
      <Component
        className={cn('JinniStepper', orientation, alignment, className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </StepperContext.Provider>
  );
};

export default Stepper;
