import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import ExpandProvider from './ExpandProvider';

export type AccordionItemProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'onChange'
> & {
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
    defaultExpanded,
    expanded,
    onChange,
    disabled,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <ExpandProvider
      defaultExpanded={defaultExpanded}
      expanded={expanded}
      onChange={onChange}
      disabled={disabled}
    >
      <Component
        className={cn('JinniAccordionItem', className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </ExpandProvider>
  );
};

export default AccordionItem;
