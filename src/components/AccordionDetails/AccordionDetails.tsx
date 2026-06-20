'use client';

import cn from 'classnames';
import { Fragment } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useAccordionItem } from '../AccordionItem';

export type AccordionDetailsProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    WrapperComponent?: React.ComponentType<{ children: React.ReactNode }>;
    TransitionComponent?: React.ComponentType<{ children: React.ReactNode }>;
  };

const AccordionDetails = <T extends AsType = 'div'>(
  props: AccordionDetailsProps<T>
) => {
  const {
    children,
    className,
    style,
    as: Component = 'div',
    WrapperComponent = Fragment,
    TransitionComponent = Fragment,
    ...rest
  } = props;
  const accordionItemContext = useAccordionItem();
  const newStyle = useStyle(style);

  if (!accordionItemContext) return null;
  const { disabled, isExpanded } = accordionItemContext;

  return (
    <WrapperComponent>
      {isExpanded && !disabled && (
        <TransitionComponent>
          <Component
            className={cn('JinniAccordionDetails', className)}
            style={newStyle}
            {...rest}
          >
            {children}
          </Component>
        </TransitionComponent>
      )}
    </WrapperComponent>
  );
};

export default AccordionDetails;
