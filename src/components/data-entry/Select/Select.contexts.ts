import { createContext } from 'react';
import { OptionValueType } from './Option';

type SelectContextType = {
  multiple?: boolean;
  selectedValue: OptionValueType[];
  handleChange: (
    event: Event | React.SyntheticEvent,
    selectedOptionValue: OptionValueType
  ) => void;
  closeMenu: () => void;
};

const SelectContext = createContext<SelectContextType | null>(null);

export default SelectContext;
