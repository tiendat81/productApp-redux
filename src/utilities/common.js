export const currencyFormat = (currency) =>
  currency ? currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : currency;

export const randomImage = (imageList) => imageList[Math.floor(Math.random() * imageList.length)];
