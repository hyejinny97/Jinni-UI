const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
];

export const findFocusableSelectors = (targetEl: HTMLElement) => {
  const focusableEls = Array.from(
    targetEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS.join(','))
  );
  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];
  return { focusableEls, firstEl, lastEl };
};
