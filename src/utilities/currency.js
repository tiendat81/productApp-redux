export const currencyFormat = (cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
