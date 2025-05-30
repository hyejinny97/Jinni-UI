import { useState, useContext, useEffect } from 'react';
import { AutocompleteProps } from './Autocomplete';
import AutocompleteContext from './Autocomplete.contexts';
import { transformToArray } from '@/utils/transformToArray';

type UseValueProps<Multiple extends boolean = false> = {
  multiple: Multiple;
  defaultValue?: Multiple extends true ? string[] : string;
  value?: Multiple extends true ? string[] : string;
  onChange?: (
    event: Event | React.SyntheticEvent,
    value: Multiple extends true ? string[] : string
  ) => void;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useValue = <Multiple extends boolean = false>({
  defaultValue,
  value,
  onChange,
  setOpenMenu,
  multiple
}: UseValueProps<Multiple>) => {
  const INIT_VALUE = (multiple ? [] : '') as Multiple extends true
    ? string[]
    : string;
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue || INIT_VALUE
  );

  const remove = (array: Array<string>, element: string) => {
    return array.filter((ele) => ele !== element);
  };

  const insert = (array: Array<string>, element: string) => {
    return [...array, element];
  };

  const getNewAutocompleteValue = (newValue: string): string | string[] => {
    if (!multiple) return newValue;
    const valueArr = isControlled
      ? transformToArray(value)
      : transformToArray(uncontrolledValue);
    return valueArr.includes(newValue)
      ? remove(valueArr, newValue)
      : insert(valueArr, newValue);
  };

  const handleValueChange = (
    event: Event | React.SyntheticEvent,
    newValue: string
  ) => {
    const newAutocompleteValue = getNewAutocompleteValue(
      newValue
    ) as Multiple extends true ? string[] : string;
    if (!isControlled) setUncontrolledValue(newAutocompleteValue);
    if (onChange) onChange(event, newAutocompleteValue);
    setOpenMenu(false);
  };

  const initValue = (event: Event | React.SyntheticEvent) => {
    if (!isControlled) setUncontrolledValue(INIT_VALUE);
    if (onChange) onChange(event, INIT_VALUE);
  };

  return {
    autocompleteValue: isControlled ? value : uncontrolledValue,
    handleValueChange,
    initValue
  };
};

export const useInputValue = ({
  inputValue,
  defaultInputValue,
  onInputChange
}: Pick<AutocompleteProps, 'inputValue' | 'onInputChange'> & {
  defaultInputValue?: string;
}) => {
  const INIT_INPUT_VALUE = '';
  const isControlled = inputValue !== undefined;
  const [uncontrolledInputValue, setUncontrolledInputValue] = useState<string>(
    defaultInputValue || INIT_INPUT_VALUE
  );

  const handleInputValueChange = (
    event: Event | React.SyntheticEvent,
    newValue: string
  ) => {
    if (!isControlled) setUncontrolledInputValue(newValue);
    if (onInputChange) onInputChange(event, newValue);
  };

  const initInputValue = (event: Event | React.SyntheticEvent) =>
    handleInputValueChange(event, INIT_INPUT_VALUE);

  return {
    autocompleteInputValue: isControlled ? inputValue : uncontrolledInputValue,
    handleInputValueChange,
    initInputValue
  };
};

export const useAutocompleteContext = () => {
  const value = useContext(AutocompleteContext);
  if (!value) throw Error('AutocompleteContext value is null');
  return value;
};

export const useBackgroundClick = ({
  inputBaseElRef,
  menuListElRef,
  mode,
  multiple,
  autocompleteValue,
  handleInputValueChange,
  initInputValue
}: {
  inputBaseElRef: React.RefObject<HTMLElement>;
  menuListElRef: React.RefObject<HTMLElement>;
  autocompleteValue: string | string[];
  multiple: boolean;
  handleInputValueChange: (
    event: Event | React.SyntheticEvent,
    newValue: string
  ) => void;
  initInputValue: (event: Event | React.SyntheticEvent) => void;
} & Required<Pick<AutocompleteProps, 'mode'>>) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const inputBaseEl = inputBaseElRef.current;
      const menuListEl = menuListElRef.current;
      const clickedEl = event.target as Node;
      const isBackgroundClicked =
        !inputBaseEl?.contains(clickedEl) && !menuListEl?.contains(clickedEl);
      if (isBackgroundClicked && mode === 'strict') {
        if (multiple || Array.isArray(autocompleteValue)) initInputValue(event);
        else handleInputValueChange(event, autocompleteValue);
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [
    inputBaseElRef,
    menuListElRef,
    mode,
    multiple,
    autocompleteValue,
    handleInputValueChange,
    initInputValue
  ]);
};
