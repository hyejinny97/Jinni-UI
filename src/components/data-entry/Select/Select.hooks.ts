import { useState, useContext, useMemo } from 'react';
import SelectContext from './Select.contexts';
import { transformToArray } from '@/utils/transformToArray';
import { SelectProps, SelectedOptionType } from './Select';
import { OptionValueType } from './Option';
import { getOptionsInfo } from './Select.utils';

type UseSelectedValueProps<Multiple extends boolean> = Pick<
  SelectProps<Multiple>,
  'defaultValue' | 'value' | 'onChange' | 'multiple'
>;

type UseSelectedOptionProps = Pick<SelectProps, 'children'> & {
  selectedValue: OptionValueType[];
};

export const useSelectedValue = <Multiple extends boolean>({
  defaultValue,
  value,
  onChange,
  multiple
}: UseSelectedValueProps<Multiple>) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<OptionValueType[]>(
    transformToArray(defaultValue)
  );
  const selectedValue: OptionValueType[] = isControlled
    ? transformToArray(value)
    : uncontrolledValue;

  const remove = (
    array: OptionValueType[],
    element: OptionValueType
  ): OptionValueType[] => {
    return array.filter((ele) => ele !== element);
  };

  const insert = (
    array: OptionValueType[],
    element: OptionValueType
  ): OptionValueType[] => {
    return [...array, element];
  };

  const handleChange = (
    event: Event | React.SyntheticEvent,
    selectedOptionValue: OptionValueType
  ) => {
    let newSelectedValue = [];
    if (multiple) {
      newSelectedValue = selectedValue.includes(selectedOptionValue)
        ? remove(selectedValue, selectedOptionValue)
        : insert(selectedValue, selectedOptionValue);
    } else {
      newSelectedValue = [selectedOptionValue];
    }

    if (!isControlled) setUncontrolledValue(newSelectedValue);
    if (onChange)
      onChange(
        event,
        (multiple
          ? newSelectedValue
          : newSelectedValue[0]) as Multiple extends true
          ? OptionValueType[]
          : OptionValueType
      );
  };

  return {
    selectedValue,
    handleChange
  };
};

export const useSelectedOption = ({
  children,
  selectedValue
}: UseSelectedOptionProps): SelectedOptionType => {
  const optionsInfo = useMemo(() => getOptionsInfo(children), [children]);
  return selectedValue.map((value) => ({
    value,
    label: optionsInfo[value]
  }));
};

export const useSelectContext = () => {
  const value = useContext(SelectContext);
  if (!value) throw Error('SelectContext value is null');
  return value;
};
