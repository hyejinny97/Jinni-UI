import { useState } from 'react';
import { AccordionItemProps } from './AccordionItem';
import ExpandContext from './Accordion.contexts';
import { isBoolean } from '@/utils/isBoolean';

type ExpandProviderProps = Pick<
  AccordionItemProps,
  'defaultExpanded' | 'expanded' | 'onChange' | 'disabled' | 'children'
>;

const ExpandProvider = ({
  defaultExpanded,
  expanded,
  onChange,
  disabled,
  children
}: ExpandProviderProps) => {
  const isControlledAccordion = expanded !== undefined && isBoolean(expanded);
  const [uncontrolledExpanded, setUncontrolledExpanded] =
    useState<boolean>(!!defaultExpanded);

  const handleChangeInControlledAccordion = (event: React.SyntheticEvent) => {
    if (!isControlledAccordion || !onChange) return;
    onChange(event, !expanded);
  };

  const handleChangeInUncontrolledAccordion = () => {
    if (isControlledAccordion) return;
    setUncontrolledExpanded((prevExpanded) => !prevExpanded);
  };

  const value = {
    isExpanded: isControlledAccordion ? expanded : uncontrolledExpanded,
    toggleExpanded: isControlledAccordion
      ? handleChangeInControlledAccordion
      : handleChangeInUncontrolledAccordion,
    disabled: !!disabled
  };

  return (
    <ExpandContext.Provider value={value}>{children}</ExpandContext.Provider>
  );
};

export default ExpandProvider;
