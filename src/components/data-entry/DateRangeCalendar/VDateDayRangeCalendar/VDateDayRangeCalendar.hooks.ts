import { useState, useLayoutEffect, useRef } from 'react';
import { VDateDayRangeCalendarProps } from './VDateDayRangeCalendar';
import { RangeType } from '@/types/date-component';
import { dateToMonth } from '@/utils/date-component';

type UseSelectedDateProps = Pick<
  VDateDayRangeCalendarProps,
  'defaultValue' | 'value' | 'onChange'
>;

type UseScrollProps = {
  baseDisplayedDateRef: React.MutableRefObject<Date>;
};

export const useSelectedDate = ({
  defaultValue,
  value,
  onChange
}: UseSelectedDateProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledSelectedDate, setUncontrolledSelectedDate] = useState<
    RangeType<Date | null>
  >(defaultValue || { start: null, end: null });
  const selectedDate: RangeType<Date | null> = isControlled
    ? value
    : uncontrolledSelectedDate;

  const onSelectDate = (newValue: RangeType<Date | null>) => {
    if (!isControlled) setUncontrolledSelectedDate(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    selectedDate,
    onSelectDate
  };
};

export const useScroll = ({ baseDisplayedDateRef }: UseScrollProps) => {
  const dateDayRangeCalendarElRef = useRef<HTMLElement>();

  useLayoutEffect(() => {
    const dateDayRangeCalendarEl = dateDayRangeCalendarElRef.current;
    const baseDisplayedDate = baseDisplayedDateRef.current;
    if (!dateDayRangeCalendarEl || !baseDisplayedDate) return;

    const baseMonth = dateToMonth(baseDisplayedDate);
    const calendarsElRef = dateDayRangeCalendarEl.querySelectorAll<HTMLElement>(
      '.JinniVDateDayRangeCalendarPart'
    );

    for (const element of calendarsElRef) {
      const { value } = element.dataset;
      if (value && dateToMonth(new Date(value)) === baseMonth) {
        const offsetTop =
          element.getBoundingClientRect().top -
          dateDayRangeCalendarEl.getBoundingClientRect().top +
          dateDayRangeCalendarEl.scrollTop;
        dateDayRangeCalendarEl.scrollTo({
          top: offsetTop
        });
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    dateDayRangeCalendarElRef
  };
};
