import { ThicknessType, ThicknessKeyword } from './LinearProgress';

const isThicknessKeyword = (
  thickness: ThicknessType
): thickness is ThicknessKeyword =>
  ['sm', 'md', 'lg'].some((keyword) => keyword === thickness);

export const getComputedThickness = (thickness: ThicknessType) => {
  if (isThicknessKeyword(thickness)) {
    const thicknessMap = { sm: 4, md: 8, lg: 12 };
    return thicknessMap[thickness];
  }
  return thickness;
};
