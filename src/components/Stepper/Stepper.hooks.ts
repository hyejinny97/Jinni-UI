import { useContext } from 'react';
import StepperContext from './Stepper.contexts';

export const useStepper = () => {
  const value = useContext(StepperContext);
  if (!value) throw new Error('StepperContext value is null');
  return value;
};
