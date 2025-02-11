import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useExpand } from './Accordion.hooks';

export type AccordionDetailsProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {};

const AccordionDetails = <T extends AsType = 'div'>(
  props: AccordionDetailsProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const { isExpanded } = useExpand();
  const newStyle = useStyle(style);

  if (!isExpanded) return null;

  return (
    <Component
      className={cn('JinniAccordionDetails', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default AccordionDetails;
