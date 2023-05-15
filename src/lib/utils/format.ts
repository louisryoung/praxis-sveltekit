export const formatNumber = (
  n: number,
  options: Intl.NumberFormatOptions,
  locale: string | string[] = 'en-US'
) => new Intl.NumberFormat(locale, options).format(n);

export const formatCurrency = (
  n: number,
  currency: string,
  locale: string | string[] = 'en-US'
) => formatNumber(n, { style: 'currency', currency }, locale);

export const formatDateTime = (
  dt: Date,
  options: Intl.DateTimeFormatOptions,
  locale: string | string[] = 'en-US'
) => new Intl.DateTimeFormat(locale, options).format(dt);
