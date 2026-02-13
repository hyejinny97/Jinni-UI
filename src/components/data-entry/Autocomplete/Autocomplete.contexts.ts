import { createContext } from 'react';
import { OptionValueType } from './AutocompleteOption';

type AutocompleteContextType = {
  multiple: boolean;
  isFiltered: boolean;
  autocompleteValue: OptionValueType[];
  autocompleteInputValue: string;
  changeAutocompleteValue: (
    event: Event | React.SyntheticEvent,
    newValue: OptionValueType
  ) => void;
  changeInputValue: (
    event: Event | React.SyntheticEvent,
    newValue: string
  ) => void;
  initInputValue: (event: Event | React.SyntheticEvent) => void;
  closeMenu: (event: Event | React.SyntheticEvent) => void;
};

const AutocompleteContext = createContext<AutocompleteContextType | null>(null);

export default AutocompleteContext;
