import { useContext } from 'react';
import { ExitContext } from '../AnimatePresence';

export const useExit = () => useContext(ExitContext);
