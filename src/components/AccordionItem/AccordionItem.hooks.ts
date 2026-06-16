import { useState, useContext } from 'react';
import { AccordionItemProps } from './AccordionItem';
import AccordionItemContext from './AccordionItem.contexts';

type useExpandProps = Pick<AccordionItemProps, 'expanded' | 'onChange'> &
  Required<Pick<AccordionItemProps, 'defaultExpanded'>>;

export const useExpand = ({
  defaultExpanded,
  expanded,
  onChange
}: useExpandProps) => {
  const isControlled = expanded !== undefined;
  const [uncontrolledExpanded, setUncontrolledExpanded] =
    useState<boolean>(defaultExpanded);

  const toggleExpand = (event: React.SyntheticEvent) => {
    if (!isControlled) setUncontrolledExpanded((prevExpanded) => !prevExpanded);
    if (onChange)
      onChange(event, isControlled ? !expanded : !uncontrolledExpanded);
  };

  return {
    isExpanded: isControlled ? expanded : uncontrolledExpanded,
    toggleExpand
  };
};

export const useAccordionItem = () => {
  const value = useContext(AccordionItemContext);
  return value;
};
