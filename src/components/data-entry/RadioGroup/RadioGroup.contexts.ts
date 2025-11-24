import { createContext } from 'react';
import { RadioGroupProps } from './RadioGroup';

type RadioGroupContextProps = {
  checkedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & Pick<
  RadioGroupProps,
  | 'name'
  | 'icon'
  | 'checkedIcon'
  | 'color'
  | 'rippleColor'
  | 'rippleStartLocation'
  | 'disableRipple'
>;

const RadioGroupContext = createContext<RadioGroupContextProps | null>(null);

export default RadioGroupContext;
