import { useState } from 'react';
import { ToggleButtonGroupProps } from './ToggleButtonGroup';
import { ValueType } from '@/components/general/ToggleButton';

export const useSelectedValue = ({
  defaultValue,
  value,
  onChange
}: Pick<ToggleButtonGroupProps, 'defaultValue' | 'value' | 'onChange'>) => {
  const isControlled = value !== undefined;
  const isMultiple = isControlled
    ? Array.isArray(value)
    : Array.isArray(defaultValue);
  const [uncontrolledValue, setUncontrolledValue] = useState<
    ValueType | Array<ValueType> | null
  >(defaultValue || null);

  const toggle = (
    valueArray: Array<ValueType>,
    valueToSelected: ValueType,
    selected: boolean
  ): Array<ValueType> => {
    if (selected) return [...valueArray, valueToSelected];
    else return valueArray.filter((val) => val !== valueToSelected);
  };

  const handleExclusiveChange =
    (valueToSelected: ValueType) =>
    (event: React.MouseEvent, selected: boolean) => {
      if (!isControlled)
        setUncontrolledValue(selected ? valueToSelected : null);
      if (onChange) onChange(event, selected ? valueToSelected : null);
    };

  const handleMultipleChange =
    (valueToSelected: ValueType) =>
    (event: React.MouseEvent, selected: boolean) => {
      let newValue: Array<ValueType>;
      if (!isControlled) {
        if (!Array.isArray(uncontrolledValue)) return;
        newValue = toggle(uncontrolledValue, valueToSelected, selected);
        setUncontrolledValue(newValue);
      } else {
        if (!Array.isArray(value)) return;
        newValue = toggle(value, valueToSelected, selected);
      }

      if (onChange) onChange(event, newValue);
    };

  return {
    selectedValue: isControlled ? value : uncontrolledValue,
    handleChange: isMultiple ? handleMultipleChange : handleExclusiveChange
  };
};
