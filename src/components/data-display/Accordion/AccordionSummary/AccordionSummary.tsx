import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { useAccordionItem } from '../AccordionItem';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';

export type AccordionSummaryProps<T extends AsType = 'h3'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    expandIcon?: React.ReactNode | false;
    ButtonBaseProps?: ButtonBaseProps;
  };

const AccordionSummary = <T extends AsType = 'h3'>(
  props: AccordionSummaryProps<T>
) => {
  const {
    children,
    expandIcon = <ArrowDownIcon color="gray-700" />,
    ButtonBaseProps,
    className,
    style,
    as: Component = 'h3',
    ...rest
  } = props;
  const { disabled, isExpanded, toggleExpand } = useAccordionItem();
  const newStyle = useStyle(style);

  return (
    <Component
      className="JinniAccordionSummaryRoot"
      onClick={toggleExpand}
      style={newStyle}
      {...rest}
    >
      <ButtonBase
        className={cn('JinniAccordionSummary', className)}
        disabled={disabled}
        aria-expanded={isExpanded}
        {...ButtonBaseProps}
      >
        <div className="JinniAccordionSummaryContent">{children}</div>
        {expandIcon && (
          <span
            className={cn('JinniAccordionSummaryExpandIcon', { isExpanded })}
          >
            {expandIcon}
          </span>
        )}
      </ButtonBase>
    </Component>
  );
};

export default AccordionSummary;
