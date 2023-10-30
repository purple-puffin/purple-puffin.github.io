export const currencies = [
  { code: 'UAH', name: 'Гривня', locale: 'uk-UA' },
  { code: 'USD', name: 'Долар', locale: 'en-US' },
] as const;

type Currency = typeof currencies[number]['code'];
export default Currency;

export const currencyFormatters = currencies.reduce((acc, cur) => {
  acc[cur.code] = new Intl.NumberFormat(cur.locale, { style: 'currency', currency: cur.code });
  return acc;
}, {} as Record<Currency, Intl.NumberFormat>);
