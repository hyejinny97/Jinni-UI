import './ToggleButtonGroup.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ButtonProps } from '@/components/general/Button';
import { ValueType } from '@/components/general/ToggleButton';
import { useSelectedValue } from './ToggleButtonGroup.hooks';
import { insertProps } from './ToggleButtonGroup.utils';

export type SomeButtonProps = Pick<
  ButtonProps,
  | 'isSquareSize'
  | 'color'
  | 'size'
  | 'disabled'
  | 'overlayColor'
  | 'disableOverlay'
  | 'elevation'
  | 'rippleColor'
  | 'disableRipple'
  | 'rippleStartLocation'
>;

export type ToggleButtonGroupProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'children' | 'defaultValue' | 'onChange'
> &
  SomeButtonProps & {
    children: Array<JSX.Element>;
    defaultValue?: ValueType | Array<ValueType> | null;
    value?: ValueType | Array<ValueType> | null;
    onChange?: (
      event: React.MouseEvent,
      value: ValueType | Array<ValueType> | null
    ) => void;
    orientation?: 'horizontal' | 'vertical';
  };

const ToggleButtonGroup = <T extends AsType = 'div'>(
  props: ToggleButtonGroupProps<T>
) => {
  const {
    children,
    defaultValue,
    value,
    onChange,
    orientation = 'horizontal',
    isSquareSize,
    color,
    size,
    disabled,
    overlayColor,
    disableOverlay,
    elevation,
    rippleColor,
    disableRipple,
    rippleStartLocation,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { selectedValue, handleChange } = useSelectedValue({
    defaultValue,
    value,
    onChange
  });
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniToggleButtonGroup', orientation, className)}
      style={newStyle}
      {...rest}
    >
      {insertProps(children, selectedValue, handleChange, {
        isSquareSize,
        color,
        size,
        disabled,
        overlayColor,
        disableOverlay,
        elevation,
        rippleColor,
        disableRipple,
        rippleStartLocation
      })}
    </Component>
  );
};

export default ToggleButtonGroup;
