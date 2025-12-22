import { createContext } from 'react';
import { ValueType } from '@/components/general/ToggleButton';
import { SomeToggleButtonProps } from './ToggleButtonGroup';

type ToggleButtonGroupContextProps = {
  selectedValue: ValueType | ValueType[] | null;
  handleChange: (
    selectedValue: ValueType
  ) => (event: React.MouseEvent, selected: boolean) => void;
} & SomeToggleButtonProps;

const ToggleButtonGroupContext =
  createContext<ToggleButtonGroupContextProps | null>(null);

export default ToggleButtonGroupContext;
