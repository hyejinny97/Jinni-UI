import { createContext } from 'react';
import { StepperProps } from './Stepper';

type StepperContextProps = Required<
  Pick<StepperProps, 'orientation' | 'alignment' | 'connectorColor'>
>;

const StepperContext = createContext<StepperContextProps | null>(null);

export default StepperContext;
