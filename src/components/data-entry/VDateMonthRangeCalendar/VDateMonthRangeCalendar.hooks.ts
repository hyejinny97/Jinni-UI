import { useState, useLayoutEffect, useRef } from 'react';
import { VDateMonthRangeCalendarProps } from './VDateMonthRangeCalendar';
import { RangeType } from '@/types/date-component';

type UseSelectedDateProps = Pick<
  VDateMonthRangeCalendarProps,
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
  const dateMonthRangeCalendarElRef = useRef<HTMLElement>();

  useLayoutEffect(() => {
    const dateMonthRangeCalendarEl = dateMonthRangeCalendarElRef.current;
    const baseDisplayedDate = baseDisplayedDateRef.current;
    if (!dateMonthRangeCalendarEl || !baseDisplayedDate) return;

    const baseYear = baseDisplayedDate.getFullYear();
    const calendarsElRef =
      dateMonthRangeCalendarEl.querySelectorAll<HTMLElement>(
        '.JinniVDateMonthRangeCalendarPart'
      );

    for (const element of calendarsElRef) {
      const { value } = element.dataset;
      if (value && new Date(value).getFullYear() === baseYear) {
        const offsetTop =
          element.getBoundingClientRect().top -
          dateMonthRangeCalendarEl.getBoundingClientRect().top +
          dateMonthRangeCalendarEl.scrollTop;
        dateMonthRangeCalendarEl.scrollTo({
          top: offsetTop
        });
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    dateMonthRangeCalendarElRef
  };
};
