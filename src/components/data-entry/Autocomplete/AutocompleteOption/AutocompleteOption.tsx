import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { MenuItem, MenuItemProps } from '@/components/navigation/MenuItem';
import { useAutocompleteContext } from '../Autocomplete.hooks';

export type OptionValueType = string | number;
export type OptionLabelType = string;

export type AutocompleteOptionProps<T extends AsType = 'li'> = Omit<
  MenuItemProps<T>,
  'value'
> & {
  children: React.ReactNode;
  value: OptionValueType;
  label: OptionLabelType;
};

const AutocompleteOption = <T extends AsType = 'li'>(
  props: AutocompleteOptionProps<T>
) => {
  const { children, value, label, className, ...rest } = props;
  const {
    multiple,
    isFiltered,
    autocompleteValue,
    autocompleteInputValue,
    changeAutocompleteValue,
    changeInputValue,
    initInputValue,
    closeMenu
  } = useAutocompleteContext();
  const containInputValue = label
    .toLowerCase()
    .includes(autocompleteInputValue.toLowerCase());
  const isSelected = autocompleteValue.includes(value);

  const handleClick = (e: MouseEvent) => {
    changeAutocompleteValue(e, value);
    if (multiple) {
      initInputValue(e);
    } else {
      changeInputValue(e, label);
      closeMenu(e);
    }
  };

  if (isFiltered && !containInputValue) return null;

  return (
    <MenuItem
      role="option"
      className={cn('JinniAutocompleteOption', className)}
      selected={isSelected}
      onClick={handleClick}
      aria-selected={isSelected}
      {...rest}
    >
      {children}
    </MenuItem>
  );
};

export default AutocompleteOption;
