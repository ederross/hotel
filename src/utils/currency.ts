export const currency = (num: number, prefix = 'R$', decimals = 2) => {
  return num
    ? `${(num < 0 ? '- ' : '') + prefix} ${parseFloat(
        String(num).replace(',', '.').replace('-', '')
      )
        .toFixed(decimals)
        .replace('.', ',')
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    : `${prefix} 0,00`;
};
