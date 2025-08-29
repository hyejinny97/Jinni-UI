import { createContext } from 'react';

interface ExitContextProps {
  isExiting: boolean;
  onExitComplete: () => void;
}

const ExitContext = createContext<ExitContextProps | null>(null);

export default ExitContext;
