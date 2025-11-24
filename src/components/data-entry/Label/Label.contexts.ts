import { createContext } from 'react';
import { LabelProps } from './Label';

type LabelContextProps = Pick<LabelProps, 'required' | 'disabled' | 'size'>;

const LabelContext = createContext<LabelContextProps | null>(null);

export default LabelContext;
