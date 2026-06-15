import { useContext } from 'react';
import StepContext from './Step.contexts';

export const useStep = () => {
  const value = useContext(StepContext);
  if (!value) throw new Error('StepContext value is null');
  return value;
};
