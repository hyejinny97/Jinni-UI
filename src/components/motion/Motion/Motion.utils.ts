export const camelToKebabCase = (key: string): string => {
  return `${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
};
