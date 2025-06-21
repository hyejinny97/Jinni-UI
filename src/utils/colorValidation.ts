const HEX_REG_EX = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
export const RGB_REG_EX =
  /^rgb\(\s*(\d{1,3})(?:\s*,\s*|\s+)?(\d{1,3})(?:\s*,\s*|\s+)?(\d{1,3})\s*\)$/;
export const RGBA_REG_EX =
  /^rgba\(\s*(\d{1,3})(?:\s*,\s*|\s+)?(\d{1,3})(?:\s*,\s*|\s+)?(\d{1,3})(?:\s*,\s*|\s+)?((?:0(?:\.\d+)?|1(?:\.0+)?))\s*\)$/;
export const HSL_REG_EX =
  /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
export const HSLA_REG_EX =
  /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*((?:0(?:\.\d+)?|1(?:\.0+)?))\s*\)$/;

export const isValidHexColor = (value: string): boolean => {
  return HEX_REG_EX.test(value);
};

export const isValidRgbColor = (value: string): boolean => {
  const match = value.match(RGB_REG_EX);
  if (!match) return false;

  const [r, g, b] = match.slice(1).map(Number);
  return [r, g, b].every((value) => value >= 0 && value <= 255);
};

export const isValidRgbaColor = (value: string): boolean => {
  const match = value.match(RGBA_REG_EX);
  if (!match) return false;

  const [r, g, b, a] = [...match.slice(1, 4).map(Number), parseFloat(match[4])];
  return [r, g, b].every((v) => v >= 0 && v <= 255) && a >= 0 && a <= 1;
};

export const isValidHslColor = (value: string): boolean => {
  const match = value.match(HSL_REG_EX);
  if (!match) return false;

  const [h, s, l] = match.slice(1).map(Number);
  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
};

export const isValidHslaColor = (value: string): boolean => {
  const match = value.match(HSLA_REG_EX);
  if (!match) return false;

  const [h, s, l, a] = [...match.slice(1, 4).map(Number), parseFloat(match[4])];
  return (
    h >= 0 &&
    h <= 360 &&
    s >= 0 &&
    s <= 100 &&
    l >= 0 &&
    l <= 100 &&
    a >= 0 &&
    a <= 1
  );
};
