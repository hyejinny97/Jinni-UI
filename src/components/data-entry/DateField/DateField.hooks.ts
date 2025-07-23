import { useState, useMemo, useLayoutEffect, useRef } from 'react';
import { DateFieldProps } from './DateField';
import {
  DateObjectType,
  TokensType,
  KeyDatePartType,
  YearDigitTypes,
  MonthDigitTypes,
  DayDigitTypes
} from './DateField.types';
import {
  isAvailableLocale,
  getLocaleNumberValues,
  getLocaleMonthValues,
  getLocaleDayValues,
  findYearTokenType,
  findMonthTokenType,
  findDayTokenType
} from './DateField.utils';
import {
  TOKENS,
  YEAR_DIGITS,
  MONTH_DIGITS,
  DAY_DIGITS
} from './DateField.constants';
import { ValidationError } from './DateField.types';

type UseDateValue = Pick<
  DateFieldProps,
  | 'defaultValue'
  | 'value'
  | 'onChange'
  | 'minDate'
  | 'maxDate'
  | 'disabledDates'
> & {
  dateToDateObject: (date: Date | undefined | null) => DateObjectType;
  dateObjectToDate: ({ year, month, day }: DateObjectType) => Date;
  getLocaleDayValuesByYearMonth: (
    date?: Date | null | undefined
  ) => Array<string>;
};

type HandleDateChangeType = ({ year, month, day }: DateObjectType) => void;

export const useDateValue = ({
  defaultValue,
  value,
  minDate,
  maxDate,
  disabledDates,
  onChange,
  dateToDateObject,
  dateObjectToDate,
  getLocaleDayValuesByYearMonth
}: UseDateValue) => {
  const isControlled = value !== undefined;
  const [uncontrolledDate, setUncontrolledDate] = useState<DateObjectType>(
    dateToDateObject(defaultValue)
  );
  const [validationError, setValidationError] = useState<
    ValidationError | undefined
  >();
  const date = isControlled ? dateToDateObject(value) : uncontrolledDate;
  const [localeDayValues, setLocaleDayValues] = useState<Array<string>>(
    getLocaleDayValuesByYearMonth(isControlled ? value : defaultValue)
  );

  const dateToTimeStamp = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(year, month, day).getTime();
  };

  const validateDate = (date: Date | null): ValidationError | undefined => {
    if (date === null) return;
    const dateInTimeStamp = dateToTimeStamp(date);
    if (minDate) {
      const minDateInTimeStamp = dateToTimeStamp(minDate);
      if (dateInTimeStamp < minDateInTimeStamp) return 'minDate';
    }
    if (maxDate) {
      const maxDateInTimeStamp = dateToTimeStamp(maxDate);
      if (dateInTimeStamp > maxDateInTimeStamp) return 'maxDate';
    }
    if (disabledDates) {
      const disabledDatesInTimeStamp = disabledDates.map((date) =>
        dateToTimeStamp(date)
      );
      if (disabledDatesInTimeStamp.includes(dateInTimeStamp))
        return 'disabledDate';
    }
  };

  const handleDateChange: HandleDateChangeType = ({ year, month, day }) => {
    const newDateObject = {
      ...date,
      year: year !== undefined ? year : date.year,
      month: month !== undefined ? month : date.month,
      day: day !== undefined ? day : date.day
    };
    const validDate = dateObjectToDate(newDateObject);
    if (date.year !== newDateObject.year || date.month !== newDateObject.month)
      setLocaleDayValues(getLocaleDayValuesByYearMonth(validDate));
    const validDateObject = dateToDateObject(validDate);
    const validationError = validateDate(validDate);
    if (!isControlled) setUncontrolledDate(validDateObject);
    if (onChange) onChange(validDate, validationError);
  };

  useLayoutEffect(() => {
    const date = isControlled ? value : dateObjectToDate(uncontrolledDate);
    const newValidationError = validateDate(date);
    setValidationError(newValidationError);
  }, [value, uncontrolledDate]);

  return {
    date,
    handleDateChange,
    isValidationError: !!validationError,
    localeDayValues
  };
};

export const useDateFormat = ({
  locale,
  options,
  format
}: Pick<DateFieldProps, 'locale' | 'options' | 'format'>) => {
  const {
    dateTimeFormat,
    yearDigit,
    monthDigit,
    dayDigit,
    localeNumberValues,
    localeMonthValues,
    defaultLocaleDayValues,
    dateParts
  } = useMemo(() => {
    const dateTimeLocale = isAvailableLocale(locale) ? locale : 'en-US';
    let dateTimeFormat: Intl.DateTimeFormat;
    let yearDigit: YearDigitTypes;
    let monthDigit: MonthDigitTypes;
    let dayDigit: DayDigitTypes;
    let localeNumberValues: Array<string>;
    let localeMonthValues: Array<string>;
    let defaultLocaleDayValues: Array<string>;
    let dateParts: Intl.DateTimeFormatPart[];

    if (format !== undefined) {
      const allTokens = Object.keys(TOKENS);
      const regex = new RegExp(`(${allTokens.join('|')})`, 'g');
      const parts = format.split(regex).filter((part) => part !== '');
      const options: Intl.DateTimeFormatOptions = {};
      parts.forEach((part) => {
        if (!allTokens.includes(part)) return;
        const token = part as TokensType;
        if (TOKENS[token].type === 'year') {
          options.year = TOKENS[token].digit;
          yearDigit = TOKENS[token].digit;
        } else if (TOKENS[token].type === 'month') {
          options.month = TOKENS[token].digit;
          monthDigit = TOKENS[token].digit;
        } else if (TOKENS[token].type === 'day') {
          options.day = TOKENS[token].digit;
          dayDigit = TOKENS[token].digit;
        }
      });
      dateTimeFormat = new Intl.DateTimeFormat(dateTimeLocale, options);
      localeNumberValues = getLocaleNumberValues(dateTimeLocale);
      localeMonthValues = getLocaleMonthValues(dateTimeFormat);
      defaultLocaleDayValues = getLocaleDayValues(dateTimeFormat);
      dateParts = parts.map((part) => {
        if (allTokens.includes(part))
          return { type: TOKENS[part as TokensType].type, value: part };
        else return { type: 'literal', value: part };
      });
    } else {
      dateTimeFormat = new Intl.DateTimeFormat(dateTimeLocale, options);
      localeNumberValues = getLocaleNumberValues(dateTimeLocale);
      localeMonthValues = getLocaleMonthValues(dateTimeFormat);
      defaultLocaleDayValues = getLocaleDayValues(dateTimeFormat);
      dateParts = dateTimeFormat.formatToParts().map((part) => {
        switch (part.type) {
          case 'year': {
            const yearToken = findYearTokenType(dateTimeFormat);
            yearDigit = yearToken.length === 2 ? '2-digit' : 'numeric';
            return {
              type: 'year',
              value: yearToken
            };
          }
          case 'month': {
            const monthToken = findMonthTokenType(
              localeMonthValues,
              dateTimeLocale
            ) as TokensType;
            monthDigit = TOKENS[monthToken].digit as MonthDigitTypes;
            return {
              type: 'month',
              value: monthToken
            };
          }
          case 'day': {
            const dayToken = findDayTokenType(defaultLocaleDayValues);
            dayDigit = dayToken.length === 2 ? '2-digit' : 'numeric';
            return {
              type: 'day',
              value: dayToken
            };
          }
          default:
            return { type: 'literal', value: part.value };
        }
      });
    }
    yearDigit ||= YEAR_DIGITS[0];
    monthDigit ||= MONTH_DIGITS[0];
    dayDigit ||= DAY_DIGITS[0];
    return {
      dateTimeFormat,
      yearDigit,
      monthDigit,
      dayDigit,
      localeNumberValues,
      localeMonthValues,
      defaultLocaleDayValues,
      dateParts
    };
  }, [locale, options, format]);

  const transformToLocaleYear = (year: number): string => {
    const yearByDigit =
      yearDigit === '2-digit' ? String(year).slice(-2) : String(year);
    return [...yearByDigit]
      .map((char) => localeNumberValues[Number(char)])
      .join('');
  };

  const transformToNumberYear = (localeYear: string): number => {
    return parseInt(
      [...localeYear].map((char) => localeNumberValues.indexOf(char)).join('')
    );
  };

  const dateToDateObject = (date: Date | undefined | null): DateObjectType => {
    if (date === undefined || date === null) return {};
    return {
      year: transformToLocaleYear(date.getFullYear()),
      month: localeMonthValues[date.getMonth()],
      day: defaultLocaleDayValues[date.getDate() - 1]
    };
  };

  const dateObjectToDate = ({ year, month, day }: DateObjectType): Date => {
    const date = new Date(1970, 0, 1);
    if (year !== undefined) {
      date.setFullYear(transformToNumberYear(year));
    }
    if (month !== undefined) {
      date.setMonth(localeMonthValues.indexOf(month));
    }
    if (day !== undefined) {
      date.setDate(defaultLocaleDayValues.indexOf(day) + 1);
    }
    return date;
  };

  return {
    yearDigit,
    monthDigit,
    dayDigit,
    localeNumberValues,
    localeMonthValues,
    getLocaleDayValuesByYearMonth: getLocaleDayValues.bind(
      null,
      dateTimeFormat
    ),
    dateParts,
    dateToDateObject,
    dateObjectToDate
  };
};

export const useInput = ({
  yearDigit,
  monthDigit,
  dayDigit,
  localeNumberValues,
  localeMonthValues,
  localeDayValues,
  handleDateChange
}: {
  yearDigit: YearDigitTypes;
  monthDigit: MonthDigitTypes;
  dayDigit: DayDigitTypes;
  localeNumberValues: Array<string>;
  localeMonthValues: Array<string>;
  localeDayValues: Array<string>;
  handleDateChange: HandleDateChangeType;
}) => {
  const datePartsElRef = useRef<Array<HTMLElement>>([]);
  const prevMonthRef = useRef<string>('');

  const focusNextDatePart = (currentDatePartEl: HTMLElement) => {
    const currentIndex = datePartsElRef.current.indexOf(currentDatePartEl);
    const nextIndex = currentIndex + 1;
    if (nextIndex < datePartsElRef.current.length) {
      const nextDatePartEl = datePartsElRef.current[nextIndex];
      nextDatePartEl.focus();
    } else {
      currentDatePartEl.blur();
    }
  };

  const handleInputChange =
    (type: KeyDatePartType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      if (value === undefined || value === null) return;
      switch (type) {
        case 'year': {
          const is2DigitType = yearDigit === '2-digit';
          const newValue = value.slice(is2DigitType ? -2 : -4);
          const isInvalidLocaleNumber = [...newValue].some(
            (char) => localeNumberValues.indexOf(char) === -1
          );
          if (isInvalidLocaleNumber) return;
          const newYear = is2DigitType
            ? newValue.padStart(2, '0')
            : newValue.padStart(4, '0');
          handleDateChange({
            year: newYear
          });
          if (!newYear.startsWith('0')) focusNextDatePart(e.currentTarget);
          return;
        }
        case 'month': {
          let candidates: Array<string> = [];
          switch (monthDigit) {
            case 'long':
            case 'short': {
              const newValue = prevMonthRef.current + value.slice(-1);
              candidates = localeMonthValues.filter((month) =>
                month
                  .toLocaleLowerCase()
                  .startsWith(newValue.toLocaleLowerCase())
              );
              prevMonthRef.current = newValue;
              break;
            }
            case 'numeric': {
              candidates = localeMonthValues.filter((month) =>
                month.startsWith(value)
              );
              break;
            }
            case '2-digit': {
              const newValue = value.slice(-2);
              const ZERO = localeMonthValues[0][0];
              candidates = localeMonthValues.filter((month) => {
                const monthWithoutZero =
                  month[0] === ZERO ? month.slice(1) : month;
                return monthWithoutZero.startsWith(newValue);
              });
            }
          }
          if (candidates.length === 1) {
            handleDateChange({ month: candidates[0] });
            focusNextDatePart(e.currentTarget);
            prevMonthRef.current = '';
          } else if (candidates.length > 1) {
            handleDateChange({ month: candidates[0] });
          }
          return;
        }
        case 'day': {
          let candidates: Array<string> = [];
          switch (dayDigit) {
            case 'numeric': {
              candidates = localeDayValues.filter((day) =>
                day.startsWith(value)
              );
              break;
            }
            case '2-digit': {
              const newValue = value.slice(-2);
              const ZERO = localeDayValues[0][0];
              candidates = localeDayValues.filter((day) => {
                const dayWithoutZero = day[0] === ZERO ? day.slice(1) : day;
                return dayWithoutZero.startsWith(newValue);
              });
            }
          }
          if (candidates.length === 1) {
            handleDateChange({ day: candidates[0] });
            focusNextDatePart(e.currentTarget);
          } else if (candidates.length > 1) {
            handleDateChange({ day: candidates[0] });
          }
        }
      }
    };

  return {
    datePartsElRef,
    handleInputChange
  };
};
