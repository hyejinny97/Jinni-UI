export type DateOptions =
  | {
      dateStyle: 'short' | 'medium';
    }
  | {
      year?: 'numeric' | '2-digit';
      month?: 'numeric' | '2-digit' | 'long' | 'short';
      day?: 'numeric' | '2-digit';
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
