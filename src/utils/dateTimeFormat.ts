export const isAvailableLocale = (locale: string | undefined): boolean => {
  if (locale === undefined) return true;
  const supportedLocales = Intl.DateTimeFormat.supportedLocalesOf([locale]);
  return supportedLocales.length > 0;
};

export const is2Digit = (values: Array<string>) =>
  values.length > 0 && values.every((v) => v.length === 2);
