import { useState, useContext } from 'react';
import { ToggleButtonGroupProps } from './ToggleButtonGroup';
import { ValueType } from '@/components/general/ToggleButton';
import ToggleButtonGroupContext from './ToggleButtonGroup.contexts';

type UseSelectedValueProps = Required<
  Pick<ToggleButtonGroupProps, 'defaultValue'>
> &
  Pick<ToggleButtonGroupProps, 'value' | 'onChange'>;

export const useSelectedValue = ({
  defaultValue,
  value,
  onChange
}: UseSelectedValueProps) => {
  const isControlled = value !== undefined;
  const isMultiple = isControlled
    ? Array.isArray(value)
    : Array.isArray(defaultValue);
  const [uncontrolledValue, setUncontrolledValue] = useState<
    ValueType | Array<ValueType> | null
  >(defaultValue);

  const toggle = (
    valueArray: Array<ValueType>,
    selectedValue: ValueType,
    selected: boolean
  ): Array<ValueType> => {
    if (selected) return [...valueArray, selectedValue];
    else return valueArray.filter((val) => val !== selectedValue);
  };

  const handleExclusiveChange =
    (selectedValue: ValueType) =>
    (event: React.MouseEvent, selected: boolean) => {
      if (!isControlled) setUncontrolledValue(selected ? selectedValue : null);
      if (onChange) onChange(event, selected ? selectedValue : null);
    };

  const handleMultipleChange =
    (selectedValue: ValueType) =>
    (event: React.MouseEvent, selected: boolean) => {
      let newValue: Array<ValueType>;
      if (isControlled) {
        if (!Array.isArray(value)) return;
        newValue = toggle(value, selectedValue, selected);
      } else {
        if (!Array.isArray(uncontrolledValue)) return;
        newValue = toggle(uncontrolledValue, selectedValue, selected);
        setUncontrolledValue(newValue);
      }

      if (onChange) onChange(event, newValue);
    };

  return {
    selectedValue: isControlled ? value : uncontrolledValue,
    handleChange: isMultiple ? handleMultipleChange : handleExclusiveChange
  };
};

export const useToggleButtonGroup = () => {
  const value = useContext(ToggleButtonGroupContext);
  return value;
};
