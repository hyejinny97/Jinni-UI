import './ToggleButtonGroup.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ToggleButtonProps } from '@/components/general/ToggleButton';
import { ValueType } from '@/components/general/ToggleButton';
import { useSelectedValue } from './ToggleButtonGroup.hooks';
import ToggleButtonGroupContext from './ToggleButtonGroup.contexts';

export type SomeToggleButtonProps = Pick<
  ToggleButtonProps,
  | 'color'
  | 'size'
  | 'overlayColor'
  | 'disableOverlay'
  | 'rippleColor'
  | 'disableRipple'
  | 'rippleStartLocation'
  | 'elevation'
  | 'disabled'
>;

export type ToggleButtonGroupProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'children' | 'defaultValue' | 'onChange'
> &
  SomeToggleButtonProps & {
    children: React.ReactNode;
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
    defaultValue = null,
    value,
    onChange,
    orientation = 'horizontal',
    color,
    size,
    overlayColor,
    disableOverlay,
    rippleColor,
    disableRipple,
    rippleStartLocation,
    elevation,
    disabled,
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
    <ToggleButtonGroupContext.Provider
      value={{
        selectedValue,
        handleChange,
        color,
        size,
        overlayColor,
        disableOverlay,
        rippleColor,
        disableRipple,
        rippleStartLocation,
        elevation,
        disabled
      }}
    >
      <Component
        role="group"
        className={cn('JinniToggleButtonGroup', orientation, className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </ToggleButtonGroupContext.Provider>
  );
};

export default ToggleButtonGroup;
