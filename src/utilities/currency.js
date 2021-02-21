export const currencyFormat = (currency) =>
  currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
