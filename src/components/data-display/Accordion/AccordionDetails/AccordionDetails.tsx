import cn from 'classnames';
import { useLayoutEffect, useRef, useState } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useAccordionItem } from '../AccordionItem';
import { Motion } from '@/components/motion/Motion';
import { AnimatePresence } from '@/components/motion/AnimatePresence';

export type AccordionDetailsProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    TransitionComponent?: React.ComponentType<{ children: React.ReactNode }>;
  };

const Collapse = ({ children }: { children: React.ReactNode }) => {
  const motionElRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState<string>('auto');

  useLayoutEffect(() => {
    const motionEl = motionElRef.current;
    if (!motionEl) return;

    setHeight(`${motionEl.scrollHeight}px`);
  }, [children]);

  return (
    <Motion
      ref={motionElRef}
      initial={{ height: '0' }}
      animate={{ height }}
      exit={{ height: '0' }}
      transition="height var(--jinni-duration-short3) var(--jinni-easing-emphasized)"
      style={{ overflow: 'hidden' }}
    >
      {children}
    </Motion>
  );
};

const AccordionDetails = <T extends AsType = 'div'>(
  props: AccordionDetailsProps<T>
) => {
  const {
    children,
    className,
    style,
    as: Component = 'div',
    TransitionComponent = Collapse,
    ...rest
  } = props;
  const accordionItemContext = useAccordionItem();
  const newStyle = useStyle(style);

  if (!accordionItemContext) return null;
  const { disabled, isExpanded } = accordionItemContext;

  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
};

export default AccordionDetails;
