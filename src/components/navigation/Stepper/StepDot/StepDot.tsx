import './StepDot.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';
import { useStep } from '../Step';
import { getDotColorStyle } from './StepDot.utils';
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
  completed: 'filled',
  active: 'filled',
  pending: 'filled'
} as const;

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
  const { status } = useStep();
  const normalizedColor = useColor(
    ['completed', 'active'].includes(status) ? color : 'gray-400'
  );
  const { borderColor, backgroundColor, textColor } = getDotColorStyle({
    color: normalizedColor,
    variant: variant[status]
  });
  const newStyle = useStyle({
    '--border-color': borderColor,
    '--background-color': backgroundColor,
    '--text-color': textColor,
    ...style
  });

  return (
    <Component
      className={cn('JinniStepDot', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default StepDot;
