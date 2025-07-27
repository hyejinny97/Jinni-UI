import './DateRangeCalendarHeader.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ButtonBase } from '@/components/general/ButtonBase';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';

export type DateRangeCalendarHeaderProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    type: 'month' | 'day';
    displayedDate: Date;
    locale?: string;
    onPrev?: () => void;
    onNext?: () => void;
    readOnly?: boolean;
    disabled?: boolean;
    hidePrevButton?: boolean;
    hideNextButton?: boolean;
  };

const DateRangeCalendarHeader = <T extends AsType = 'div'>(
  props: DateRangeCalendarHeaderProps<T>
) => {
  const {
    type,
    locale,
    displayedDate,
    onPrev,
    onNext,
    readOnly = false,
    disabled = false,
    hidePrevButton = false,
    hideNextButton = false,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const dateTimeFormat = new Intl.DateTimeFormat(
    locale,
    type === 'day'
      ? {
          year: 'numeric',
          month: 'short'
        }
      : { year: 'numeric' }
  );
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniDateRangeCalendarHeader', className)}
      style={newStyle}
      {...rest}
    >
      <ButtonBase
        className={cn('JinniDateRangeCalendarHeaderControlButton', {
          hide: hidePrevButton
        })}
        onClick={onPrev}
        disabled={hidePrevButton}
      >
        <ArrowLeftIcon color="gray-500" />
      </ButtonBase>
      <span>{dateTimeFormat.format(displayedDate)}</span>
      <ButtonBase
        className={cn('JinniDateRangeCalendarHeaderControlButton', {
          hide: hideNextButton
        })}
        onClick={onNext}
        disabled={hideNextButton}
      >
        <ArrowRightIcon color="gray-500" />
      </ButtonBase>
    </Component>
  );
};

export default DateRangeCalendarHeader;
