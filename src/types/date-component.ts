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
