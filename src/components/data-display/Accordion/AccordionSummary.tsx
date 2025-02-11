import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { useExpand } from './Accordion.hooks';

export type AccordionSummaryProps<T extends AsType = 'button'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    expandIcon?: React.ReactNode;
    HeadingComponent?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };

const AccordionSummary = <T extends AsType = 'button'>(
  props: AccordionSummaryProps<T>
) => {
  const {
    expandIcon = <ArrowDownIcon />,
    HeadingComponent = 'h3',
    children,
    className,
    style,
    as: Component = 'button',
    ...rest
  } = props;
  const { disabled, isExpanded, toggleExpanded } = useExpand();
  const newStyle = useStyle(style);

  return (
    <HeadingComponent className="JinniAccordionHeader" onClick={toggleExpanded}>
      <Component
        className={cn('JinniAccordionSummary', className)}
        style={newStyle}
        disabled={disabled}
        {...rest}
      >
        <div className="JinniAccordionSummaryContent">{children}</div>
        <span className={cn('JinniAccordionSummaryExpandIcon', { isExpanded })}>
          {expandIcon}
        </span>
      </Component>
    </HeadingComponent>
  );
};

export default AccordionSummary;
