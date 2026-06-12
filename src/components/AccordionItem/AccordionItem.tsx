import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useExpand } from './AccordionItem.hooks';
import AccordionItemContext from './AccordionItem.contexts';

export type AccordionItemProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'onChange'
> & {
  children: React.ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  disabled?: boolean;
};

const AccordionItem = <T extends AsType = 'div'>(
  props: AccordionItemProps<T>
) => {
  const {
    children,
    defaultExpanded = false,
    expanded,
    onChange,
    disabled,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { isExpanded, toggleExpand } = useExpand({
    defaultExpanded,
    expanded,
    onChange
  });
  const newStyle = useStyle(style);

  return (
    <AccordionItemContext.Provider
      value={{ isExpanded, toggleExpand, disabled: !!disabled }}
    >
      <Component
        className={cn('JinniAccordionItem', className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
