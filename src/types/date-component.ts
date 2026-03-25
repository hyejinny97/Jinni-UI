import {
  CHRONOLOGICAL_ORDER,
  INCLUDE_DISABLED_DATE
} from '@/constants/date-component';

export type YearDigitType = 'numeric' | '2-digit';
export type MonthDigitType = 'numeric' | '2-digit' | 'long' | 'short';
export type DayDigitType = 'numeric' | '2-digit';

export type DateOptions =
  | {
      dateStyle: 'short' | 'medium';
    }
  | {
      year?: YearDigitType;
      month?: MonthDigitType;
      day?: DayDigitType;
    };

export type DateValidationError = 'minDate' | 'maxDate' | 'disabledDate';

export type DateComponentProps = {
  defaultValue?: Date;
  value?: Date | null;
  onChange?: (value: Date) => void;
  locale?: string;
  options?: DateOptions;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Array<Date>;
  readOnly?: boolean;
  disabled?: boolean;
};

export type RangeFieldType = 'start' | 'end';

export type RangeType<T> = Partial<Record<RangeFieldType, T>>;

export type RangeAdornmentType<T> = RangeType<T> & { dateRangeField?: T };

export type DateRangeValidationError = RangeType<DateValidationError> & {
  [CHRONOLOGICAL_ORDER]?: boolean;
  [INCLUDE_DISABLED_DATE]?: boolean;
};

export type DateRangeComponentProps = {
  defaultValue?: RangeType<Date>;
  value?: RangeType<Date | null>;
  onChange?: (value: RangeType<Date | null>) => void;
  locale?: string;
  options?: DateOptions;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Array<Date>;
  readOnly?: boolean;
  disabled?: boolean;
};
