import { createContext } from 'react';

type SelectContextType = {
  selectValue: string | string[] | undefined;
  handleChange: (
    event: Event | React.SyntheticEvent,
    selectedOptionValue: string
  ) => void;
  multiple: boolean;
};

const SelectContext = createContext<SelectContextType | null>(null);

export default SelectContext;
