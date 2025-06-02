import { createContext } from 'react';

type AutocompleteContextType = {
  autocompleteInputValue: string;
  handleInputValueChange: (
    event: Event | React.SyntheticEvent,
    newValue: string
  ) => void;
  initInputValue: (event: Event | React.SyntheticEvent) => void;
  autocompleteValue: string | string[];
  handleValueChange: (
    event: Event | React.SyntheticEvent,
    newValue: string
  ) => void;
  multiple: boolean;
  filterMenuOption: boolean;
};

const AutocompleteContext = createContext<AutocompleteContextType | null>(null);

export default AutocompleteContext;
