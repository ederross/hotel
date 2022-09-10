export const pluralProfix = (num: number, locale: string) =>
  new Intl.PluralRules(locale).select(num);
