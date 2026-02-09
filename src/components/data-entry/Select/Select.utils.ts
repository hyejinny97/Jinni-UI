import { isValidElement, Children } from 'react';
import { Option, OptionProps, OptionValueType } from './Option';

type OptionLabelType = React.ReactNode;
type OptionsInfoType = {
  [value: OptionValueType]: OptionLabelType;
};

export const getOptionsInfo = (children: React.ReactNode): OptionsInfoType => {
  const childrenArray = Children.toArray(children);
  const optionEls: Array<React.ReactElement<OptionProps>> =
    childrenArray.filter(
      (element): element is React.ReactElement =>
        isValidElement(element) && element.type === Option
    );

  const optionsInfo: OptionsInfoType = {};
  optionEls.forEach((el) => {
    optionsInfo[el.props.value] = el.props.children;
  });

  return optionsInfo;
};
