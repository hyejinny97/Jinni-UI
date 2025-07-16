export const KEY_DATE_PARTS = ['year', 'month', 'day'] as const;
export const YEAR_DIGITS = ['numeric', '2-digit'] as const;
export const MONTH_DIGITS = ['numeric', '2-digit', 'long', 'short'] as const;
export const DAY_DIGITS = ['numeric', '2-digit'] as const;

export const TOKENS = {
  YYYY: {
    type: 'year',
    digit: 'numeric'
  },
  YY: {
    type: 'year',
    digit: '2-digit'
  },
  MMMM: {
    type: 'month',
    digit: 'long'
  },
  MMM: {
    type: 'month',
    digit: 'short'
  },
  MM: {
    type: 'month',
    digit: '2-digit'
  },
  M: {
    type: 'month',
    digit: 'numeric'
  },
  DD: {
    type: 'day',
    digit: '2-digit'
  },
  D: {
    type: 'day',
    digit: 'numeric'
  }
} as const;
