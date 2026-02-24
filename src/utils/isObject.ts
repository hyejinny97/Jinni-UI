export const isObject = (
  value: unknown
): value is object & Record<string, unknown> => {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
};
