export const dateToMonth = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return year * 12 + month;
};
