import { useState, useContext } from 'react';
import SelectContext from './Select.contexts';
import { transformToArray } from '@/utils/transformToArray';

type UseSelectValueProps<Multiple extends boolean> = {
  multiple: Multiple;
  defaultValue?: Multiple extends true ? string[] : string;
  value?: Multiple extends true ? string[] : string;
  onChange?: (
    event: Event | React.SyntheticEvent,
    value: Multiple extends true ? string[] : string
  ) => void;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useSelectValue = <Multiple extends boolean>({
  defaultValue,
  value,
  onChange,
  setOpenMenu,
  multiple
}: UseSelectValueProps<Multiple>) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const remove = (array: Array<string>, element: string) => {
    return array.filter((ele) => ele !== element);
  };

  const insert = (array: Array<string>, element: string) => {
    return [...array, element];
  };

  const getNewSelectValue = (
    selectedOptionValue: string
  ): string | string[] => {
    if (!multiple) return selectedOptionValue;
    const valueArr = isControlled
      ? transformToArray(value)
      : transformToArray(uncontrolledValue);
    return valueArr.includes(selectedOptionValue)
      ? remove(valueArr, selectedOptionValue)
      : insert(valueArr, selectedOptionValue);
  };

  const handleChange = (
    event: Event | React.SyntheticEvent,
    selectedOptionValue: string
  ) => {
    const newSelectValue = getNewSelectValue(
      selectedOptionValue
    ) as Multiple extends true ? string[] : string;
    if (!isControlled) setUncontrolledValue(newSelectValue);
    if (onChange) onChange(event, newSelectValue);
    if (!multiple) setOpenMenu(false);
  };

  return {
    selectValue: isControlled ? value : uncontrolledValue,
    handleChange
  };
};

export const useSelectContext = () => {
  const value = useContext(SelectContext);
  if (!value) throw Error('SelectContext value is null');
  return value;
};
