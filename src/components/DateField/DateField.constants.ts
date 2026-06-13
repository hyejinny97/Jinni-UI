export const KEY_DATE_PARTS = ['year', 'month', 'day'] as const;

export const YEAR_TOKENS = ['YYYY', 'YY'] as const;
export const MONTH_TOKENS = ['MMMM', 'MMM', 'MM', 'M'] as const;
export const DAY_TOKENS = ['DD', 'D'] as const;

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
