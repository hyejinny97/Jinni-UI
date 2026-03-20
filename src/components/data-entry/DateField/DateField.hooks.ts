import {
  useState,
  useMemo,
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect
} from 'react';
import { DateFieldProps } from './DateField';
import { DateObjectType, TokensType, KeyDatePartType } from './DateField.types';
import {
  getLocaleNumberValues,
  getLocaleMonthValues,
  getLocaleDayValues,
  findYearTokenType,
  findMonthTokenType,
  findDayTokenType,
  dateToTimeStamp,
  getLastDay
} from './DateField.utils';
import { TOKENS } from './DateField.constants';
import {
  DateValidationError,
  YearDigitType,
  MonthDigitType,
  DayDigitType
} from '@/types/date-component';
import { isAvailableLocale } from '@/utils/dateTimeFormat';
import { isNumber } from '@/utils/isNumber';

type HandleDateChangeType = ({ year, month, day }: DateObjectType) => void;

type UseDateValue = Pick<
  DateFieldProps,
  'defaultValue' | 'value' | 'onChange'
> & {
  dateToDateObject: (date: Date | undefined | null) => DateObjectType;
  dateObjectToDate: ({ year, month, day }: DateObjectType) => Date;
};

type UseValidation = Pick<
  DateFieldProps,
  'minDate' | 'maxDate' | 'disabledDates' | 'onErrorStatus'
> & {
  dateValue: DateObjectType;
  dateObjectToDate: ({ year, month, day }: DateObjectType) => Date;
};

type UseInputProps = {
  dateValue: DateObjectType;
  yearDigit: YearDigitType | null;
  monthDigit: MonthDigitType | null;
  dayDigit: DayDigitType | null;
  localeNumberValues: Array<string>;
  localeMonthValues: Array<string>;
  localeDayValues: Array<string>;
  handleDateChange: HandleDateChangeType;
  focusNextDatePartOrBlur: (currentDatePartEl: HTMLElement) => void;
  dateObjectToDate: ({ year, month, day }: DateObjectType) => Date;
};

type UseFocusProps = {
  datePartsElRef: React.MutableRefObject<HTMLElement[]>;
};

export const useDateValue = ({
  defaultValue,
  value,
  onChange,
  dateToDateObject,
  dateObjectToDate
}: UseDateValue) => {
  const isControlled = value !== undefined;
  const [uncontrolledDate, setUncontrolledDate] = useState<DateObjectType>(
    dateToDateObject(defaultValue)
  );
  const dateValue: DateObjectType = isControlled
    ? dateToDateObject(value)
    : uncontrolledDate;

  const handleDateChange: HandleDateChangeType = ({ year, month, day }) => {
    const newDateObj = {
      year: year ?? dateValue.year,
      month: month ?? dateValue.month,
      day: day ?? dateValue.day
    };
    const newDate = dateObjectToDate(newDateObj);
    if (!isControlled) setUncontrolledDate(newDateObj);
    if (onChange) onChange(newDate);
  };

  return {
    dateValue,
    handleDateChange
  };
};

export const useValidation = ({
  dateValue,
  minDate,
  maxDate,
  disabledDates,
  onErrorStatus,
  dateObjectToDate
}: UseValidation) => {
  const minDateInTimeStamp = useMemo<number | undefined>(
    () => minDate && dateToTimeStamp(minDate),
    [minDate]
  );
  const maxDateInTimeStamp = useMemo<number | undefined>(
    () => maxDate && dateToTimeStamp(maxDate),
    [maxDate]
  );
  const disabledDatesInTimeStamp = useMemo<number[] | undefined>(
    () => disabledDates && disabledDates.map(dateToTimeStamp),
    [disabledDates]
  );

  const validateDate = useCallback(
    (date: Date | null): DateValidationError | undefined => {
      if (date === null) return;
      const dateInTimeStamp = dateToTimeStamp(date);
      if (
        isNumber(minDateInTimeStamp) &&
        dateInTimeStamp < minDateInTimeStamp
      ) {
        return 'minDate';
      }
      if (
        isNumber(maxDateInTimeStamp) &&
        dateInTimeStamp > maxDateInTimeStamp
      ) {
        return 'maxDate';
      }
      if (
        disabledDatesInTimeStamp &&
        disabledDatesInTimeStamp.includes(dateInTimeStamp)
      ) {
        return 'disabledDate';
      }
    },
    [minDateInTimeStamp, maxDateInTimeStamp, disabledDatesInTimeStamp]
  );

  const validationError = useMemo<DateValidationError | undefined>(
    () =>
      Object.keys(dateValue).length > 0
        ? validateDate(dateObjectToDate(dateValue))
        : undefined,
    [dateValue, validateDate, dateObjectToDate]
  );

  useLayoutEffect(() => {
    onErrorStatus?.(!!validationError, validationError);
  }, [validationError, onErrorStatus]);

  return {
    isValidationError: !!validationError
  };
};

export const useDateFormat = ({
  locale,
  options,
  format
}: Pick<DateFieldProps, 'locale' | 'options' | 'format'>) => {
  const {
    yearDigit,
    monthDigit,
    dayDigit,
    localeNumberValues,
    localeMonthValues,
    localeDayValues,
    dateParts
  } = useMemo(() => {
    const dateTimeLocale = isAvailableLocale(locale) ? locale : 'en-US';
    let yearDigit: YearDigitType | null = null;
    let monthDigit: MonthDigitType | null = null;
    let dayDigit: DayDigitType | null = null;
    let localeNumberValues: Array<string>;
    let localeMonthValues: Array<string>;
    let localeDayValues: Array<string>;
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
          options.year = yearDigit = TOKENS[token].digit;
        } else if (TOKENS[token].type === 'month') {
          options.month = monthDigit = TOKENS[token].digit;
        } else if (TOKENS[token].type === 'day') {
          options.day = dayDigit = TOKENS[token].digit;
        }
      });
      const dateTimeFormat = new Intl.DateTimeFormat(dateTimeLocale, options);
      localeNumberValues = getLocaleNumberValues(dateTimeLocale);
      localeMonthValues = getLocaleMonthValues(dateTimeFormat);
      localeDayValues = getLocaleDayValues(dateTimeFormat);
      dateParts = parts.map((part) => {
        if (allTokens.includes(part))
          return { type: TOKENS[part as TokensType].type, value: part };
        else return { type: 'literal', value: part };
      });
    } else {
      const dateTimeFormat = new Intl.DateTimeFormat(dateTimeLocale, options);
      localeNumberValues = getLocaleNumberValues(dateTimeLocale);
      localeMonthValues = getLocaleMonthValues(dateTimeFormat);
      localeDayValues = getLocaleDayValues(dateTimeFormat);
      dateParts = dateTimeFormat.formatToParts().map((part) => {
        switch (part.type) {
          case 'year': {
            const yearToken = findYearTokenType(dateTimeFormat);
            yearDigit = TOKENS[yearToken].digit;
            return {
              type: 'year',
              value: yearToken
            };
          }
          case 'month': {
            const monthToken = findMonthTokenType(
              localeMonthValues,
              dateTimeLocale
            );
            monthDigit = TOKENS[monthToken].digit;
            return {
              type: 'month',
              value: monthToken
            };
          }
          case 'day': {
            const dayToken = findDayTokenType(localeDayValues);
            dayDigit = TOKENS[dayToken].digit;
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

    return {
      yearDigit,
      monthDigit,
      dayDigit,
      localeNumberValues,
      localeMonthValues,
      localeDayValues,
      dateParts
    };
  }, [locale, options, format]);

  const yearNmToLocale = (year: number): string => {
    const yearByDigit =
      yearDigit === '2-digit' ? String(year).slice(-2) : String(year);
    return [...yearByDigit]
      .map((char) => localeNumberValues[Number(char)])
      .join('');
  };

  const yearLocaleToNm = (localeYear: string): number => {
    return parseInt(
      [...localeYear].map((char) => localeNumberValues.indexOf(char)).join('')
    );
  };

  const dateToDateObject = (date: Date | undefined | null): DateObjectType => {
    if (date === undefined || date === null) return {};
    return {
      year: yearNmToLocale(date.getFullYear()),
      month: localeMonthValues[date.getMonth()],
      day: localeDayValues[date.getDate() - 1]
    };
  };

  const dateObjectToDate = ({ year, month, day }: DateObjectType): Date => {
    const date = new Date(1970, 0, 1);
    if (year !== undefined) {
      date.setFullYear(yearLocaleToNm(year));
    }
    if (month !== undefined) {
      date.setMonth(localeMonthValues.indexOf(month));
    }
    if (day !== undefined) {
      date.setDate(localeDayValues.indexOf(day) + 1);
    }
    return date;
  };

  return {
    yearDigit,
    monthDigit,
    dayDigit,
    localeNumberValues,
    localeMonthValues,
    localeDayValues,
    dateParts,
    dateToDateObject,
    dateObjectToDate
  };
};

export const useFocus = ({ datePartsElRef }: UseFocusProps) => {
  const focusPrevDatePart = useCallback(
    (currentDatePartEl: HTMLElement): boolean => {
      const currentIndex = datePartsElRef.current.indexOf(currentDatePartEl);
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        const prevDatePartEl = datePartsElRef.current[prevIndex];
        prevDatePartEl.focus();
        return true;
      }
      return false;
    },
    [datePartsElRef]
  );

  const focusNextDatePart = useCallback(
    (currentDatePartEl: HTMLElement): boolean => {
      const currentIndex = datePartsElRef.current.indexOf(currentDatePartEl);
      const nextIndex = currentIndex + 1;
      if (nextIndex < datePartsElRef.current.length) {
        const nextDatePartEl = datePartsElRef.current[nextIndex];
        nextDatePartEl.focus();
        return true;
      }
      return false;
    },
    [datePartsElRef]
  );

  const focusNextDatePartOrBlur = (currentDatePartEl: HTMLElement) => {
    const focused = focusNextDatePart(currentDatePartEl);
    if (!focused) {
      currentDatePartEl.blur();
    }
  };

  useEffect(() => {
    const datePartsEl = datePartsElRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        focusPrevDatePart(event.currentTarget as HTMLElement);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        focusNextDatePart(event.currentTarget as HTMLElement);
      }
    };

    datePartsEl.forEach((datePartEl) => {
      datePartEl.addEventListener('keydown', handleKeyDown);
    });
    return () => {
      datePartsEl.forEach((datePartEl) => {
        datePartEl.removeEventListener('keydown', handleKeyDown);
      });
    };
  }, [datePartsElRef, focusPrevDatePart, focusNextDatePart]);

  return {
    focusNextDatePartOrBlur
  };
};

export const useInput = ({
  dateValue,
  yearDigit,
  monthDigit,
  dayDigit,
  localeNumberValues,
  localeMonthValues,
  localeDayValues,
  handleDateChange,
  focusNextDatePartOrBlur,
  dateObjectToDate
}: UseInputProps) => {
  const prevMonthRef = useRef<string>('');
  const adjustedLocaleDayValues = useMemo(() => {
    const lastDay = getLastDay(dateObjectToDate(dateValue));
    return localeDayValues.slice(0, lastDay);
  }, [dateValue, localeDayValues, dateObjectToDate]);

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
          if (!newYear.startsWith('0'))
            focusNextDatePartOrBlur(e.currentTarget);
          return;
        }
        case 'month': {
          let candidates: Array<string> = [];
          switch (monthDigit) {
            case 'long':
            case 'short': {
              const newValue = prevMonthRef.current + value.slice(-1);
              const newValueLowerCase = newValue.toLocaleLowerCase();
              candidates = localeMonthValues.filter((month) =>
                month.toLocaleLowerCase().startsWith(newValueLowerCase)
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
            focusNextDatePartOrBlur(e.currentTarget);
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
              candidates = adjustedLocaleDayValues.filter((day) =>
                day.startsWith(value)
              );
              break;
            }
            case '2-digit': {
              const newValue = value.slice(-2);
              const ZERO = adjustedLocaleDayValues[0][0];
              candidates = adjustedLocaleDayValues.filter((day) => {
                const dayWithoutZero = day[0] === ZERO ? day.slice(1) : day;
                return dayWithoutZero.startsWith(newValue);
              });
            }
          }
          if (candidates.length === 1) {
            handleDateChange({ day: candidates[0] });
            focusNextDatePartOrBlur(e.currentTarget);
          } else if (candidates.length > 1) {
            handleDateChange({ day: candidates[0] });
          }
        }
      }
    };

  return {
    handleInputChange
  };
};
