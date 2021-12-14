type FormatOption = Partial<{
  currency: string;
}>;

export const formatCurrency = (value: number, option?: FormatOption) => {
  const { currency = 'USD' } = option || {};

  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
