export const isAlphabet = (key: string): boolean =>
  key.length === 1 && /^[a-zA-Z]$/.test(key);
