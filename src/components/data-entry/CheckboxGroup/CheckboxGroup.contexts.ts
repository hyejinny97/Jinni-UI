import { createContext } from 'react';
import { CheckboxGroupProps } from './CheckboxGroup';

type CheckboxGroupContextProps = {
  checkedValue: Array<string>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & Pick<
  CheckboxGroupProps,
  | 'name'
  | 'icon'
  | 'checkedIcon'
  | 'color'
  | 'rippleColor'
  | 'rippleStartLocation'
  | 'disableRipple'
>;

const CheckboxGroupContext = createContext<CheckboxGroupContextProps | null>(
  null
);

export default CheckboxGroupContext;
