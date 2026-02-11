import {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
  useMemo
} from 'react';
import { AutocompleteProps } from './Autocomplete';
import AutocompleteContext from './Autocomplete.contexts';
import { transformToArray } from '@/utils/transformToArray';
import { OptionValueType } from './AutocompleteOption';
import { getOptionsInfo } from './Autocomplete.utils';

type UseAutocompleteValueProps<Multiple extends boolean> = Pick<
  AutocompleteProps<Multiple>,
  'defaultValue' | 'value' | 'onChange' | 'multiple'
>;

type UseInputValueProps = Pick<
  AutocompleteProps,
  'inputValue' | 'onInputChange'
>;

type UseBackgroundClickProps<Multiple extends boolean = false> = Required<
  Pick<AutocompleteProps, 'mode'>
> &
  Pick<AutocompleteProps<Multiple>, 'multiple'> & {
    inputBaseElRef: React.RefObject<HTMLElement>;
    autocompleteValue: OptionValueType[];
    valueToLabel: (value: OptionValueType) => string;
    changeInputValue: (
      event: Event | React.SyntheticEvent,
      newValue: string
    ) => void;
    initInputValue: (event: Event | React.SyntheticEvent) => void;
    closeMenu: () => void;
  };

type UseAutocompleteValueLabel = Pick<AutocompleteProps, 'children'>;

export const useAutocompleteValue = <Multiple extends boolean = false>({
  defaultValue,
  value,
  onChange,
  multiple
}: UseAutocompleteValueProps<Multiple>) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<OptionValueType[]>(
    transformToArray(defaultValue)
  );
  const autocompleteValue: OptionValueType[] = isControlled
    ? transformToArray(value)
    : uncontrolledValue;

  const remove = (array: OptionValueType[], element: OptionValueType) => {
    return array.filter((ele) => ele !== element);
  };

  const insert = (array: OptionValueType[], element: OptionValueType) => {
    return [...array, element];
  };

  const changeAutocompleteValue = (
    event: Event | React.SyntheticEvent,
    newValue: OptionValueType
  ) => {
    let newAutocompleteValue = [];
    if (multiple) {
      newAutocompleteValue = autocompleteValue.includes(newValue)
        ? remove(autocompleteValue, newValue)
        : insert(autocompleteValue, newValue);
    } else {
      newAutocompleteValue = [newValue];
    }

    if (!isControlled) setUncontrolledValue(newAutocompleteValue);
    if (onChange)
      onChange(
        event,
        (multiple
          ? newAutocompleteValue
          : newAutocompleteValue[0]) as Multiple extends true
          ? OptionValueType[]
          : OptionValueType
      );
  };

  const initAutocompleteValue = (event: Event | React.SyntheticEvent) => {
    if (!isControlled) setUncontrolledValue([]);
    if (onChange)
      onChange(
        event,
        (multiple ? [] : '') as Multiple extends true
          ? OptionValueType[]
          : OptionValueType
      );
  };

  return {
    autocompleteValue,
    changeAutocompleteValue,
    initAutocompleteValue
  };
};

export const useInputValue = ({
  inputValue,
  onInputChange
}: UseInputValueProps) => {
  const isControlled = inputValue !== undefined;
  const [uncontrolledInputValue, setUncontrolledInputValue] =
    useState<string>('');

  const changeInputValue = useCallback(
    (event: Event | React.SyntheticEvent, newValue: string) => {
      if (!isControlled) setUncontrolledInputValue(newValue);
      if (onInputChange) onInputChange(event, newValue);
    },
    [isControlled, onInputChange]
  );

  const initInputValue = useCallback(
    (event: Event | React.SyntheticEvent) => changeInputValue(event, ''),
    [changeInputValue]
  );

  return {
    autocompleteInputValue: isControlled ? inputValue : uncontrolledInputValue,
    changeInputValue,
    initInputValue
  };
};

export const useBackgroundClick = <Multiple extends boolean = false>({
  inputBaseElRef,
  mode,
  multiple,
  autocompleteValue,
  valueToLabel,
  changeInputValue,
  initInputValue,
  closeMenu
}: UseBackgroundClickProps<Multiple>) => {
  const menuListElRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const inputBaseEl = inputBaseElRef.current;
      const menuListEl = menuListElRef.current;
      if (!inputBaseEl || !menuListEl) return;

      const clickedEl = event.target as Node;
      const isBackgroundClicked = !(
        inputBaseEl.contains(clickedEl) || menuListEl.contains(clickedEl)
      );

      if (isBackgroundClicked && mode === 'strict') {
        closeMenu();
        if (multiple) initInputValue(event);
        else
          changeInputValue(
            event,
            autocompleteValue[0] ? valueToLabel(autocompleteValue[0]) : ''
          );
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [
    inputBaseElRef,
    mode,
    multiple,
    autocompleteValue,
    valueToLabel,
    changeInputValue,
    initInputValue,
    closeMenu
  ]);

  return { menuListElRef };
};

export const useAutocompleteValueLabel = ({
  children
}: UseAutocompleteValueLabel) => {
  const optionsInfo = useMemo(() => getOptionsInfo(children), [children]);

  const valueToLabel = useCallback(
    (value: OptionValueType): string => {
      const label = optionsInfo[value];
      if (label) return label;
      if (typeof value === 'string') return value;
      throw new Error('value에 해당되는 label이 없습니다.');
    },
    [optionsInfo]
  );

  return {
    valueToLabel
  };
};

export const useAutocompleteContext = () => {
  const value = useContext(AutocompleteContext);
  if (!value) throw Error('AutocompleteContext value is null');
  return value;
};
