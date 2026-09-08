export const isNumeric = (str: string) => {
  return !isNaN(Number(str)) && str.trim() !== '';
};
