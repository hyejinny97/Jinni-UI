import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';
import { useStepStatus } from './Stepper.hooks';
import { getDotColorStyle } from './Stepper.utils';
import useColor from '@/hooks/useColor';

export type VariantType = 'filled' | 'subtle-filled' | 'outlined' | 'text';

export type StepDotProps<T extends AsType = 'span'> =
  DefaultComponentProps<T> & {
    color?: ColorType;
    variant?: {
      completed: VariantType;
      active: VariantType;
      pending: VariantType;
    };
  };

const DEFAULT_VARIANT = {
  completed: 'filled' as VariantType,
  active: 'filled' as VariantType,
  pending: 'filled' as VariantType
};

const StepDot = <T extends AsType = 'span'>(props: StepDotProps<T>) => {
  const {
    children,
    color = 'primary',
    variant = DEFAULT_VARIANT,
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  const stepStatus = useStepStatus();
  const isCompleted = stepStatus === 'completed';
  const isActive = stepStatus === 'active';
  const colorByStatus = isCompleted || isActive ? color : 'gray-400';
  const normalizedColorByStatus = useColor(colorByStatus);
  const { borderColor, backgroundColor, textColor } = getDotColorStyle({
    color: normalizedColorByStatus,
    variant: variant[stepStatus]
  });
  const newStyle = useStyle({
    '--border-color': borderColor,
    '--background-color': backgroundColor,
    '--text-color': textColor,
    ...style
  });

  return (
    <Component
      className={cn('JinniStepDot', { hasChildren: !!children }, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default StepDot;
