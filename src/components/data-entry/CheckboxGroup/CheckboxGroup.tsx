import { UseRippleProps } from '@/hooks/useRipple';
import { ColorType } from '@/types/color';
import { useCheck } from './CheckboxGroup.hooks';
import CheckboxGroupContext from './Checkbox.contexts';

export type CheckboxGroupProps = UseRippleProps & {
  children: React.ReactNode;
  name: string;
  defaultValue?: Array<string>;
  value?: Array<string>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  color?: ColorType;
};

const CheckboxGroup = (props: CheckboxGroupProps) => {
  const {
    children,
    name,
    defaultValue = [],
    value,
    onChange,
    icon,
    checkedIcon,
    color,
    rippleColor,
    rippleStartLocation,
    disableRipple
  } = props;
  const { checkedValue, handleChange } = useCheck({
    defaultValue,
    value,
    onChange
  });

  return (
    <CheckboxGroupContext.Provider
      value={{
        name,
        checkedValue,
        handleChange,
        icon,
        checkedIcon,
        color,
        rippleColor,
        rippleStartLocation,
        disableRipple
      }}
    >
      {children}
    </CheckboxGroupContext.Provider>
  );
};

export default CheckboxGroup;
