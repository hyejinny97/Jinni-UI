import './DayCalendar.scss';
import React, { useMemo } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Grid, GridProps } from '@/components/layout/Grid';
import {
  getLocaleDays,
  getLocaleWeekDays,
  isSameDay,
  isLowerDay,
  isHigherDay,
  getWeekNumber
} from './DayCalendar.utils';
import Day, { DayProps } from './Day';
import { LocaleDayType, DaysType, WeekDaysType } from './DayCalendar.types';

type DayCalendarProps<T extends AsType = 'div'> = Omit<
  GridProps<T>,
  'children' | 'onSelect'
> & {
  locale?: string;
  displayedDate: Date;
  selectedDate?: Date | null;
  onSelect?: (selectedDate: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Array<Date>;
  readOnly?: boolean;
  disabled?: boolean;
  showDaysOutsideCurrentMonth?: boolean;
  fixedWeekNumber?: number;
  displayWeekNumber?: boolean;
  renderDay?: (dayProps: Omit<DayProps, 'ref'>) => React.ReactNode;
};

const DayCalendar = <T extends AsType = 'div'>(props: DayCalendarProps<T>) => {
  const {
    locale,
    displayedDate,
    selectedDate,
    onSelect,
    minDate,
    maxDate,
    disabledDates,
    readOnly = false,
    disabled = false,
    showDaysOutsideCurrentMonth = false,
    fixedWeekNumber,
    displayWeekNumber = false,
    renderDay = (dayProps: Omit<DayProps, 'ref'>, key: number) => (
      <Day key={key} {...dayProps} />
    ),
    className,
    ...rest
  } = props;
  const todayDate = new Date();
  const year = displayedDate.getFullYear();
  const month = displayedDate.getMonth();
  const weekDays: WeekDaysType = useMemo(() => {
    const localeWeekDays = getLocaleWeekDays(locale);
    return displayWeekNumber
      ? [{ type: 'week-number', format: '#' }, ...localeWeekDays]
      : localeWeekDays;
  }, [locale]);
  const days: DaysType = useMemo(() => {
    let days: DaysType;
    const firstDay = new Date(year, month, 1);
    const weekDayOfFirstDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks =
      fixedWeekNumber || Math.ceil((weekDayOfFirstDay + daysInMonth) / 7);
    if (showDaysOutsideCurrentMonth) {
      days = getLocaleDays({
        year,
        month,
        locale,
        startDay: -weekDayOfFirstDay + 1,
        endDay: weeks * 7 - weekDayOfFirstDay
      });
    } else {
      const startEmptyDays = Array(weekDayOfFirstDay).fill({
        type: 'empty-day'
      });
      const endEmptyDays = Array(
        weeks * 7 - daysInMonth - weekDayOfFirstDay
      ).fill({ type: 'empty-day' });
      const localeDays = getLocaleDays({
        year,
        month,
        locale,
        startDay: 1,
        endDay: daysInMonth
      });
      days = [...startEmptyDays, ...localeDays, ...endEmptyDays];
    }
    if (displayWeekNumber) {
      const firstWeekNumber = getWeekNumber(firstDay);
      return days
        .map((day, idx) => {
          if (idx % 7 === 0) {
            return [
              {
                type: 'week-number',
                format: `${firstWeekNumber + Math.floor(idx / 7)}. `
              },
              day
            ];
          }
          return day;
        })
        .flat() as DaysType;
    }
    return days;
  }, [
    year,
    month,
    locale,
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    displayWeekNumber
  ]);
  const gridColumns = displayWeekNumber ? 8 : 7;

  const renderLocaleDay = (day: LocaleDayType) => {
    const { type, format, value } = day;
    const selected =
      !!selectedDate &&
      isSameDay({ baseDate: value, targetDate: selectedDate });
    const marked = isSameDay({ baseDate: value, targetDate: todayDate });
    const isDisabled =
      disabled ||
      isLowerDay({ baseDate: minDate, targetDate: value }) ||
      isHigherDay({ baseDate: maxDate, targetDate: value }) ||
      (disabledDates &&
        disabledDates.some((disabledDate) =>
          isSameDay({ baseDate: value, targetDate: disabledDate })
        ));
    const dayProps = {
      day: value,
      className: type,
      children: format,
      selected,
      marked,
      onClick: () => onSelect && onSelect(value),
      readOnly,
      disabled: isDisabled,
      disableRipple: type === 'outside-day'
    };
    return renderDay(dayProps, value.getTime());
  };

  return (
    <div className={cn('JinniDayCalendar', className)} {...rest}>
      <Grid className="JinniWeekDayContainer" columns={gridColumns} spacing={4}>
        {weekDays.map(({ type, format }, idx) => (
          <span key={`${format}/${idx}`} className={cn('JinniWeekDay', type)}>
            {format}
          </span>
        ))}
      </Grid>
      <Grid className="JinniDayContainer" columns={gridColumns} spacing={4}>
        {days.map((day, idx) => {
          switch (day.type) {
            case 'day':
            case 'outside-day':
              return renderLocaleDay(day);
            case 'empty-day':
              return <span key={`empty-day-${idx}`} className="empty-day" />;
            case 'week-number':
              return (
                <span key={`week-number-${idx}`} className="week-number">
                  {day.format}
                </span>
              );
          }
        })}
      </Grid>
    </div>
  );
};

export default DayCalendar;
