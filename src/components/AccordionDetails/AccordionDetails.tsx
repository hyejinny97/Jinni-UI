'use client';

import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useAccordionItem } from '../AccordionItem';

export type AccordionDetailsProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
  };

const AccordionDetails = <T extends AsType = 'div'>(
  props: AccordionDetailsProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const accordionItemContext = useAccordionItem();
  const newStyle = useStyle(style);

  if (!accordionItemContext) return null;
  const { disabled, isExpanded } = accordionItemContext;

  return (
    <Component
      className={cn(
        'JinniAccordionDetails',
        { open: isExpanded && !disabled },
        className
      )}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default AccordionDetails;
