export const isSameArrayElements = (
  arrA: string[],
  arrB: string[]
): boolean => {
  return (
    arrA.length === arrB.length &&
    arrA.every((el) => arrB.includes(el)) &&
    arrB.every((el) => arrA.includes(el))
  );
};
