export const validate = (num: number) => {
  if (!(Number.isInteger(num) && num >= 0))
    throw new Error(`${num} 값은 0 또는 양의 정수가 아닙니다.`);
  return true;
};
