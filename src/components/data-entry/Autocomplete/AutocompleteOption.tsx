import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { MenuItem, MenuItemProps } from '@/components/navigation/MenuItem';
import { useAutocompleteContext } from './Autocomplete.hooks';

type AutocompleteOptionProps<T extends AsType = 'li'> = Omit<
  MenuItemProps<T>,
  'value'
> & {
  children: React.ReactNode;
  value: string;
};

const AutocompleteOption = <T extends AsType = 'li'>(
  props: AutocompleteOptionProps<T>
) => {
  const { children, value, className, ...rest } = props;
  const {
    autocompleteInputValue,
    handleInputValueChange,
    initInputValue,
    autocompleteValue,
    handleValueChange,
    multiple,
    filterMenuOption
  } = useAutocompleteContext();
  const containInputValue = value
    .toLowerCase()
    .includes(autocompleteInputValue.toLowerCase());

  const handleClick = (e: MouseEvent) => {
    handleValueChange(e, value);
    if (multiple) initInputValue(e);
    else handleInputValueChange(e, value);
  };

  if (filterMenuOption && !containInputValue) return null;

  return (
    <MenuItem
      className={cn('JinniAutocompleteOption', className)}
      selected={
        multiple
          ? autocompleteValue.includes(value)
          : autocompleteValue === value
      }
      onClick={handleClick}
      {...rest}
    >
      {children}
    </MenuItem>
  );
};

export default AutocompleteOption;
