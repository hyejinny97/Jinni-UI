import { useState, useRef, useLayoutEffect, useMemo, useCallback } from 'react';
import { ColorBoxProps } from './ColorBox';
import { HEX } from '@/types/color';
import {
  toRgbaObject,
  rgbaObjectToHslaObject,
  rgbaObjectToHex,
  hslToRgbaObject,
  hexToRgbaObject,
  RgbaObject,
  HslaObject
} from '@/utils/colorFormat';
import useColor from '@/hooks/useColor';

type UseColorValueProps = Required<Pick<ColorBoxProps, 'defaultValue'>> &
  Pick<ColorBoxProps, 'value' | 'onChange'>;

type PositionType = {
  left: number;
  top: number;
};

export const useColorValue = ({
  defaultValue,
  value,
  onChange
}: UseColorValueProps) => {
  const isControlled = value !== undefined;
  const [normalizedDefaultValue, normalizedValue] = useColor(
    value ? [defaultValue, value] : [defaultValue]
  );
  const [uncontrolledRgbaValue, setUncontrolledRgbaValue] =
    useState<RgbaObject>(toRgbaObject(normalizedDefaultValue));
  const rgbaValue = useMemo(
    () =>
      isControlled ? toRgbaObject(normalizedValue) : uncontrolledRgbaValue,
    [isControlled, uncontrolledRgbaValue, normalizedValue]
  );
  const [hslaValue, setHslaValue] = useState<HslaObject>(
    rgbaObjectToHslaObject(rgbaValue)
  );
  const hexValue = rgbaObjectToHex(rgbaValue);

  const handleRgbaChange = (
    event: Event | React.SyntheticEvent,
    newRgbaObject: Partial<RgbaObject>
  ) => {
    const newRgbaValue = { ...rgbaValue, ...newRgbaObject };
    if (!isControlled) {
      setHslaValue(rgbaObjectToHslaObject(newRgbaValue));
      setUncontrolledRgbaValue(newRgbaValue);
    }
    if (onChange) onChange(event, newRgbaValue);
  };

  const handleHslaChange = (
    event: Event | React.SyntheticEvent,
    newHslaObject: Partial<HslaObject>
  ) => {
    const { h, s, l, a } = { ...hslaValue, ...newHslaObject };
    const newRgbaValue = hslToRgbaObject(`hsla(${h},${s}%,${l}%,${a})`);
    if (!isControlled) {
      setHslaValue({ h, s, l, a });
      setUncontrolledRgbaValue(newRgbaValue);
    }
    if (onChange) onChange(event, newRgbaValue);
  };

  const handleHexChange = (
    event: Event | React.SyntheticEvent,
    newHex: HEX
  ) => {
    const newRgbaValue = hexToRgbaObject(newHex);
    if (!isControlled) {
      setHslaValue(rgbaObjectToHslaObject(newRgbaValue));
      setUncontrolledRgbaValue(newRgbaValue);
    }
    if (onChange) onChange(event, newRgbaValue);
  };

  useLayoutEffect(() => {
    if (isControlled) setHslaValue(rgbaObjectToHslaObject(rgbaValue));
  }, [isControlled, rgbaValue]);

  return {
    rgbaValue,
    hslaValue,
    hexValue,
    handleRgbaChange,
    handleHslaChange,
    handleHexChange
  };
};

export const usePalette = ({
  hslaValue,
  handleHslaChange
}: {
  hslaValue: HslaObject;
  handleHslaChange: (
    event: Event | React.SyntheticEvent,
    newHslaObject: Partial<HslaObject>
  ) => void;
}) => {
  const svCanvasElRef = useRef<HTMLCanvasElement>(null);
  const paletteThumbElRef = useRef<HTMLElement>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const paletteThumbPositionRef = useRef<{ top: number; left: number }>({
    top: 0,
    left: 0
  });

  const hslToHsv = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const v = l + s * Math.min(l, 1 - l);
    const newS = v === 0 ? 0 : 2 * (1 - l / v);

    return {
      h,
      s: newS * 100,
      v: v * 100
    };
  };

  const drawSVPalette = (hue: number) => {
    const canvasEl = svCanvasElRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const width = canvasEl.width;
    const height = canvasEl.height;

    // 기준 색상
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(0, 0, width, height);

    // 왼쪽 → 오른쪽: 흰색 → 투명
    const whiteGradient = ctx.createLinearGradient(0, 0, width, 0);
    whiteGradient.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = whiteGradient;
    ctx.fillRect(0, 0, width, height);

    // 위 → 아래: 투명 → 검정
    const blackGradient = ctx.createLinearGradient(0, 0, 0, height);
    blackGradient.addColorStop(0, 'rgba(0,0,0,0)');
    blackGradient.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = blackGradient;
    ctx.fillRect(0, 0, width, height);
  };

  const getMousePosition = (
    e: React.MouseEvent<HTMLElement>
  ): { x: number; y: number } => {
    const canvasEl = svCanvasElRef.current;
    if (!canvasEl) return { x: 0, y: 0 };
    const rect = canvasEl.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const setPaletteThumbPosition = ({ left, top }: PositionType) => {
    const paletteThumbEl = paletteThumbElRef.current;
    if (!paletteThumbEl) return;
    paletteThumbEl.style.left = `${left}px`;
    paletteThumbEl.style.top = `${top}px`;
    paletteThumbPositionRef.current = { left, top };
  };

  const setInitPaletteThumbPosition = useCallback(() => {
    const canvasEl = svCanvasElRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const { h, s: hslS, l } = hslaValue;
    const { s: hsvS, v: hsvV } = hslToHsv(h, hslS, l);
    setPaletteThumbPosition({
      top: ((100 - hsvV) / 100) * canvasEl.height,
      left: (hsvS / 100) * canvasEl.width
    });
  }, [hslaValue]);

  const movePaletteThumb = ({
    e,
    top,
    left
  }: { e: Event | React.SyntheticEvent } & PositionType) => {
    const canvasEl = svCanvasElRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const newTop = Math.max(canvasEl.clientTop, Math.min(top, canvasEl.height));
    const newLeft = Math.max(
      canvasEl.clientLeft,
      Math.min(left, canvasEl.width)
    );
    const pixel = ctx.getImageData(newLeft, newTop, 1, 1).data;
    const hslaObject = rgbaObjectToHslaObject({
      r: pixel[0],
      g: pixel[1],
      b: pixel[2],
      a: hslaValue.a
    });
    handleHslaChange(e, { s: hslaObject.s, l: hslaObject.l });
    setPaletteThumbPosition({ left: newLeft, top: newTop });
  };

  const handlePaletteMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    isMouseDownRef.current = true;
    const { x, y } = getMousePosition(e);
    movePaletteThumb({ e, top: y, left: x });
  };

  const handlePaletteMouseUp = () => {
    isMouseDownRef.current = false;
  };

  const handlePaletteMouseLeave = () => {
    isMouseDownRef.current = false;
  };

  const handlePaletteMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const isMouseDown = isMouseDownRef.current;
    if (!isMouseDown) return;

    const { x, y } = getMousePosition(e);
    movePaletteThumb({ e, top: y, left: x });
  };

  const handlePaletteThumbKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const { left, top } = paletteThumbPositionRef.current;
    switch (e.code) {
      case 'ArrowRight':
        movePaletteThumb({ e, top, left: left + 1 });
        break;
      case 'ArrowLeft':
        movePaletteThumb({ e, top, left: left - 1 });
        break;
      case 'ArrowUp':
        movePaletteThumb({ e, top: top - 1, left });
        break;
      case 'ArrowDown':
        movePaletteThumb({ e, top: top + 1, left });
        break;
    }
  };

  useLayoutEffect(() => {
    drawSVPalette(hslaValue.h);
    setInitPaletteThumbPosition();
  }, [hslaValue, setInitPaletteThumbPosition]);

  return {
    svCanvasElRef,
    paletteThumbElRef,
    handlePaletteMouseDown,
    handlePaletteMouseUp,
    handlePaletteMouseLeave,
    handlePaletteMouseMove,
    handlePaletteThumbKeyDown
  };
};
