export const KEY_TIME_PARTS = [
  'hour',
  'minute',
  'second',
  'dayPeriod'
] as const;

export const TOKENS = {
  HH: {
    type: 'hour',
    hour12: false,
    hourCycle: 'h23',
    digit: '2-digit'
  },
  H: {
    type: 'hour',
    hour12: false,
    hourCycle: 'h23',
    digit: 'numeric'
  },
  hh: {
    type: 'hour',
    hour12: true,
    hourCycle: 'h11',
    digit: '2-digit'
  },
  h: {
    type: 'hour',
    hour12: true,
    hourCycle: 'h11',
    digit: 'numeric'
  },
  TT: {
    type: 'hour',
    hour12: false,
    hourCycle: 'h24',
    digit: '2-digit'
  },
  T: {
    type: 'hour',
    hour12: false,
    hourCycle: 'h24',
    digit: 'numeric'
  },
  tt: {
    type: 'hour',
    hour12: true,
    hourCycle: 'h12',
    digit: '2-digit'
  },
  t: {
    type: 'hour',
    hour12: true,
    hourCycle: 'h12',
    digit: 'numeric'
  },
  mm: {
    type: 'minute',
    digit: '2-digit'
  },
  m: {
    type: 'minute',
    digit: 'numeric'
  },
  ss: {
    type: 'second',
    digit: '2-digit'
  },
  s: {
    type: 'second',
    digit: 'numeric'
  },
  a: {
    type: 'dayPeriod',
    hour12: true,
    case: 'lower'
  },
  A: {
    type: 'dayPeriod',
    hour12: true,
    case: 'upper'
  }
} as const;
