export const kebabToCamelCase = (kebabText: string) => {
  return String(kebabText).replace(/-([a-z])/g, (_, char) =>
    char.toUpperCase()
  );
};
