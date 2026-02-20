export const isSameArr = (arrA: unknown[], arrB: unknown[]): boolean => {
  return (
    arrA.length === arrB.length &&
    arrA.every((element, idx) => element === arrB[idx])
  );
};

export const padEndArray = (
  array: unknown[],
  length: number,
  fillValue: unknown
) => {
  if (length < array.length)
    throw new Error('length가 array.length 보다 커야 합니다.');
  return array.concat(Array(length - array.length).fill(fillValue));
};
