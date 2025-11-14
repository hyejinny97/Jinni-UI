import { createContext } from 'react';

type AccordionItemContextType = {
  isExpanded: boolean;
  toggleExpand: (event: React.SyntheticEvent) => void;
  disabled: boolean;
};

const AccordionItemContext = createContext<AccordionItemContextType | null>(
  null
);

export default AccordionItemContext;
