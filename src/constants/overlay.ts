export const DEFAULT_OVERLAY_ALPHA = {
  '0': 0,
  '1': 0.051,
  '2': 0.069,
  '3': 0.082,
  '4': 0.092,
  '5': 0.101,
  '6': 0.108,
  '7': 0.114,
  '8': 0.119,
  '9': 0.124,
  '10': 0.128,
  '11': 0.132,
  '12': 0.135,
  '13': 0.139,
  '14': 0.142,
  '15': 0.145,
  '16': 0.147,
  '17': 0.15,
  '18': 0.152,
  '19': 0.155,
  '20': 0.157,
  '21': 0.159,
  '22': 0.161,
  '23': 0.163,
  '24': 0.165
} as const;

export const OVERLAY_ALPHA = Object.keys(
  DEFAULT_OVERLAY_ALPHA
) as (keyof typeof DEFAULT_OVERLAY_ALPHA)[];
