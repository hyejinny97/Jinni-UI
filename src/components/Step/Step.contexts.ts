import { createContext } from 'react';
import { StepProps } from './Step';

type StepContextProps = Required<Pick<StepProps, 'status'>>;

const StepContext = createContext<StepContextProps | null>(null);

export default StepContext;
