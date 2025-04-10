import { useContext } from 'react';
import StepStatusContext from './Stepper.context';

export const useStepStatus = () => {
  const stepStatus = useContext(StepStatusContext);
  if (!stepStatus) throw Error('StepStatusContext value is null');
  return stepStatus;
};
