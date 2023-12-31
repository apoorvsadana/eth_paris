export function truncate(str, n) {
  return str.length > n
    ? str.slice(0, (n - 1) / 2) +
        '....' +
        str.slice(str.length - n / 2, str.length - 1)
    : str;
}
