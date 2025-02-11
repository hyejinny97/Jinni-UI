import { createContext } from 'react';

type ExpandContextType = {
  isExpanded: boolean;
  toggleExpanded: (event: React.SyntheticEvent) => void;
  disabled: boolean;
};

const ExpandContext = createContext<ExpandContextType | null>(null);

export default ExpandContext;
