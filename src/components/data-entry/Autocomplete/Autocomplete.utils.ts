import { isValidElement, Children } from 'react';
import {
  AutocompleteOption,
  AutocompleteOptionProps,
  OptionValueType,
  OptionLabelType
} from './AutocompleteOption';

export type OptionsInfoType = {
  [value: OptionValueType]: OptionLabelType;
};

export const getOptionsInfo = (children: React.ReactNode): OptionsInfoType => {
  const childrenArray = Children.toArray(children);
  const optionEls: Array<React.ReactElement<AutocompleteOptionProps>> =
    childrenArray.filter(
      (element): element is React.ReactElement =>
        isValidElement(element) && element.type === AutocompleteOption
    );

  const optionsInfo: OptionsInfoType = {};
  optionEls.forEach((el) => {
    optionsInfo[el.props.value] = el.props.label;
  });

  return optionsInfo;
};
