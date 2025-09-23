export const TYPOGRAPHY = [
  'display-large',
  'display-medium',
  'display-small',
  'headline-large',
  'headline-medium',
  'headline-small',
  'title-large',
  'title-medium',
  'title-small',
  'label-large',
  'label-medium',
  'label-small',
  'body-large',
  'body-medium',
  'body-small'
] as const;

export const DEFAULT_TYPOGRAPHY = {
  'display-large': {
    'font-size': '57px',
    'line-height': '64px',
    'letter-spacing': '-0.25px',
    'font-weight': '400'
  },
  'display-medium': {
    'font-size': '45px',
    'line-height': '52px',
    'letter-spacing': '0px',
    'font-weight': '400'
  },
  'display-small': {
    'font-size': '36px',
    'line-height': '44px',
    'letter-spacing': '0px',
    'font-weight': '400'
  },
  'headline-large': {
    'font-size': '32px',
    'line-height': '40px',
    'letter-spacing': '0px',
    'font-weight': '400'
  },
  'headline-medium': {
    'font-size': '28px',
    'line-height': '36px',
    'letter-spacing': '0px',
    'font-weight': '400'
  },
  'headline-small': {
    'font-size': '24px',
    'line-height': '32px',
    'letter-spacing': '0px',
    'font-weight': '400'
  },
  'title-large': {
    'font-size': '22px',
    'line-height': '28px',
    'letter-spacing': '0px',
    'font-weight': '400'
  },
  'title-medium': {
    'font-size': '16px',
    'line-height': '24px',
    'letter-spacing': '0.15px',
    'font-weight': '500'
  },
  'title-small': {
    'font-size': '14px',
    'line-height': '20px',
    'letter-spacing': '0.1px',
    'font-weight': '500'
  },
  'label-large': {
    'font-size': '14px',
    'line-height': '20px',
    'letter-spacing': '0.1px',
    'font-weight': '500'
  },
  'label-medium': {
    'font-size': '12px',
    'line-height': '16px',
    'letter-spacing': '0.5px',
    'font-weight': '500'
  },
  'label-small': {
    'font-size': '11px',
    'line-height': '16px',
    'letter-spacing': '0.5px',
    'font-weight': '500'
  },
  'body-large': {
    'font-size': '16px',
    'line-height': '24px',
    'letter-spacing': '0.5px',
    'font-weight': '400'
  },
  'body-medium': {
    'font-size': '14px',
    'line-height': '20px',
    'letter-spacing': '0.25px',
    'font-weight': '400'
  },
  'body-small': {
    'font-size': '12px',
    'line-height': '16px',
    'letter-spacing': '0.4px',
    'font-weight': '400'
  }
} as const;
