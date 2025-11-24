import { UseRippleProps } from '@/hooks/useRipple';
import { ColorType } from '@/types/color';
import { useCheck } from './RadioGroup.hooks';
import RadioGroupContext from './RadioGroup.contexts';

export type RadioGroupProps = UseRippleProps & {
  children: React.ReactNode;
  name: string;
  defaultValue?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  color?: ColorType;
};

const RadioGroup = (props: RadioGroupProps) => {
  const {
    children,
    name,
    defaultValue = '',
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
    <RadioGroupContext.Provider
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
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;
