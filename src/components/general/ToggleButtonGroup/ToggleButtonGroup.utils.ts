import { ValueType } from '@/components/general/ToggleButton';
import { SomeButtonProps } from './ToggleButtonGroup';

const isSelected = (
  value: ValueType,
  selectedValue: ValueType | ValueType[] | null
) => {
  if (selectedValue === null) return false;
  else if (Array.isArray(selectedValue)) return selectedValue.includes(value);
  else return selectedValue === value;
};

export const insertProps = (
  elements: Array<JSX.Element>,
  selectedValue: ValueType | ValueType[] | null,
  handleChange: (
    valueToSelected: ValueType
  ) => (event: React.MouseEvent, selected: boolean) => void,
  buttonProps: SomeButtonProps
): Array<JSX.Element> => {
  return elements.map((element) => {
    return {
      ...element,
      props: {
        selected: isSelected(element.props.value, selectedValue),
        onChange: handleChange(element.props.value),
        ...buttonProps,
        ...element.props
      }
    };
  });
};
