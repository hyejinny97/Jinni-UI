import { RadioProps } from './Radio';
import { useRadioGroupContext } from '@/components/data-entry/RadioGroup';

type useCheckProps = Pick<RadioProps, 'checked' | 'onChange' | 'value'>;

export const useCheck = ({ checked, onChange, value }: useCheckProps) => {
  const radioGroupContext = useRadioGroupContext();
  return {
    isChecked: radioGroupContext
      ? radioGroupContext.checkedValue === value
      : checked,
    handleChange: radioGroupContext ? radioGroupContext.handleChange : onChange
  };
};
