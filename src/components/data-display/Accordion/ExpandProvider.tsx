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

  const handleChange = (event: React.SyntheticEvent) => {
    if (!isControlledAccordion)
      setUncontrolledExpanded((prevExpanded) => !prevExpanded);
    if (onChange) {
      onChange(
        event,
        isControlledAccordion ? !expanded : !uncontrolledExpanded
      );
    }
  };

  const value = {
    isExpanded: isControlledAccordion ? expanded : uncontrolledExpanded,
    toggleExpanded: handleChange,
    disabled: !!disabled
  };

  return (
    <ExpandContext.Provider value={value}>{children}</ExpandContext.Provider>
  );
};

export default ExpandProvider;
