import { createContext } from 'react';
import { NumberInputProps } from './NumberInput';

type NumberInputContextProps = Required<Pick<NumberInputProps, 'size'>> & {
  increase: (event: React.SyntheticEvent | Event) => void;
  decrease: (event: React.SyntheticEvent | Event) => void;
  disableIncrease: boolean;
  disableDecrease: boolean;
};

const NumberInputContext = createContext<NumberInputContextProps | null>(null);

export default NumberInputContext;
