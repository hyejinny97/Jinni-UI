import { createContext } from 'react';
import { SomeDotProps } from './Dots';
import { DotValueType } from './Dot';

type DotsContextProps = {
  selectedValue: DotValueType | null;
  handleChange: (
    event: Event | React.SyntheticEvent,
    newValue: DotValueType
  ) => void;
} & SomeDotProps;

const DotsContext = createContext<DotsContextProps | null>(null);

export default DotsContext;
