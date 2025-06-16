const isValidHexColor = (value: string): boolean => {
  return /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value);
};

const isValidRgbColor = (value: string): boolean => {
  const regex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const match = value.match(regex);
  if (!match) return false;

  const [r, g, b] = match.slice(1).map(Number);
  return [r, g, b].every((value) => value >= 0 && value <= 255);
};

const isValidRgbaColor = (value: string): boolean => {
  const regex =
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*((?:0(?:\.\d+)?|1(?:\.0+)?))\s*\)$/;
  const match = value.match(regex);
  if (!match) return false;

  const [r, g, b, a] = [...match.slice(1, 4).map(Number), parseFloat(match[4])];
  console.log([r, g, b, a]);
  return [r, g, b].every((v) => v >= 0 && v <= 255) && a >= 0 && a <= 1;
};

const isValidHslColor = (value: string): boolean => {
  const regex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
  const match = value.match(regex);
  if (!match) return false;

  const [h, s, l] = match.slice(1).map(Number);
  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
};

const isValidHslaColor = (value: string): boolean => {
  const regex =
    /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*((?:0(?:\.\d+)?|1(?:\.0+)?))\s*\)$/;
  const match = value.match(regex);
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

export const isValidColor = (value: string) => {
  if (value.startsWith('#')) return isValidHexColor(value);
  else if (value.startsWith('rgba')) return isValidRgbaColor(value);
  else if (value.startsWith('rgb')) return isValidRgbColor(value);
  else if (value.startsWith('hsla')) return isValidHslaColor(value);
  else if (value.startsWith('hsl')) return isValidHslColor(value);
};
