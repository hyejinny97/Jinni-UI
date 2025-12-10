export const getTranslate = (
  element: HTMLElement
): { x: number; y: number } => {
  const style = getComputedStyle(element);
  const matrix = style.transform;
  if (matrix === 'none') return { x: 0, y: 0 };

  const values = matrix.match(/matrix.*\((.+)\)/);
  if (!values) return { x: 0, y: 0 };

  const parts = values[1].split(',').map((v) => parseFloat(v.trim()));
  return {
    x: parts[4],
    y: parts[5]
  };
};
