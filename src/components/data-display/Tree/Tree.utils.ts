export const getDifference = (setA: Set<any>, setB: Set<any>) => {
  const difference = new Set([...setA].filter((x) => !setB.has(x)));
  return difference;
};
