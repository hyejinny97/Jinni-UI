import { TypographyType, TypographySpec } from '@/types/typography';

export const getJinniTypographyValue = (
  typography: TypographyType
): TypographySpec => {
  const rootEl = document.querySelector(':root');
  if (!rootEl) throw Error('root element를 가져오지 못함');

  const rootStyles = window.getComputedStyle(rootEl);
  const fontSize = rootStyles.getPropertyValue(
    `--jinni-typo-font-size-${typography}`
  );
  const lineHeight = rootStyles.getPropertyValue(
    `--jinni-typo-line-height-${typography}`
  );
  const letterSpacing = rootStyles.getPropertyValue(
    `--jinni-typo-letter-spacing-${typography}`
  );
  const fontWeight = rootStyles.getPropertyValue(
    `--jinni-typo-font-weight-${typography}`
  );

  if (!fontSize) throw Error(`'${typography}'의 font-size는 존재하지 않습니다`);
  if (!lineHeight)
    throw Error(`'${typography}'의 line-height는 존재하지 않습니다`);
  if (!letterSpacing)
    throw Error(`'${typography}'의 letter-spacing는 존재하지 않습니다`);
  if (!fontWeight)
    throw Error(`'${typography}'의 font-weight는 존재하지 않습니다`);

  return {
    fontSize,
    lineHeight,
    letterSpacing,
    fontWeight
  };
};
