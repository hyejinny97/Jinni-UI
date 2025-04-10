import { createContext } from 'react';
import { StatusType } from './Step';

const StepStatusContext = createContext<StatusType | null>(null);

export default StepStatusContext;
