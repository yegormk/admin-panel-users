export function modifyStringToBold(string = ''): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  let result = '';

  for (const char of string) {
    let index: number;
    if ((index = letters.indexOf(char)) > -1) {
      result = `${result}${String.fromCodePoint(index + 0x1d400)}`;
    } else if ((index = numbers.indexOf(char)) > -1) {
      result = `${result}${String.fromCodePoint(index + 0x1d7ce)}`;
    } else {
      result = `${result}${char}`;
    }
  }
  return result;
}
