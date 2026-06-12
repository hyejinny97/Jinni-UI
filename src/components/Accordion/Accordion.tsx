import './Accordion.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

export type AccordionProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
  };

const Accordion = <T extends AsType = 'div'>(props: AccordionProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniAccordion', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Accordion;
