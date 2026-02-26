import { useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { useColorBoxContext } from '../ColorBox.hooks';

export const usePalette = () => {
  const { colorValue, changeColorValue } = useColorBoxContext();
  const { h, a } = colorValue;
  const paletteElRef = useRef<HTMLDivElement>(null);
  const sbCanvasElRef = useRef<HTMLCanvasElement>(null);
  const paletteThumbElRef = useRef<HTMLButtonElement>(null);
  const isPressedRef = useRef<boolean>(false);
  const paletteThumbPositionRef = useRef<{ top: number; left: number }>({
    top: 0,
    left: 0
  });

  const drawSbCanvas = (hue: number) => {
    const canvasEl = sbCanvasElRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const width = canvasEl.width;
    const height = canvasEl.height;

    // (Hue) 기준 색상
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(0, 0, width, height);

    // (Saturation) 왼쪽 → 오른쪽: 흰색 → 투명
    const whiteGradient = ctx.createLinearGradient(0, 0, width, 0);
    whiteGradient.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = whiteGradient;
    ctx.fillRect(0, 0, width, height);

    // (Brightness) 위 → 아래: 투명 → 검정
    const blackGradient = ctx.createLinearGradient(0, 0, 0, height);
    blackGradient.addColorStop(0, 'rgba(0,0,0,0)');
    blackGradient.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = blackGradient;
    ctx.fillRect(0, 0, width, height);
  };

  const movePaletteThumb = ({ top, left }: { top: number; left: number }) => {
    const paletteThumbEl = paletteThumbElRef.current;
    if (!paletteThumbEl) return;
    paletteThumbEl.style.left = `${left}px`;
    paletteThumbEl.style.top = `${top}px`;
    paletteThumbPositionRef.current = { top, left };
  };

  const changeSB = useCallback(
    ({
      event,
      top,
      left
    }: {
      event: Event | React.SyntheticEvent;
      top: number;
      left: number;
    }) => {
      const canvasEl = sbCanvasElRef.current;
      if (!canvasEl) return;

      const newSaturation = (left / canvasEl.width) * 100;
      const newBrightness = (1 - top / canvasEl.height) * 100;
      changeColorValue(event, {
        h,
        s: newSaturation,
        b: newBrightness,
        a
      });
    },
    [h, a, changeColorValue]
  );

  const constrainThumbPosition = ({
    top,
    left
  }: {
    top: number;
    left: number;
  }) => {
    const canvasEl = sbCanvasElRef.current;
    if (!canvasEl) return { top: 0, left: 0 };
    return {
      top: Math.min(canvasEl.height, Math.max(0, top)),
      left: Math.min(canvasEl.width, Math.max(0, left))
    };
  };

  useLayoutEffect(() => {
    const canvasEl = sbCanvasElRef.current;
    if (!canvasEl) return;

    const { s, b } = colorValue;
    movePaletteThumb({
      top: ((100 - b) / 100) * canvasEl.height,
      left: (s / 100) * canvasEl.width
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    drawSbCanvas(h);
  }, [h]);

  useEffect(() => {
    const paletteEl = paletteElRef.current;
    const canvasEl = sbCanvasElRef.current;
    if (!paletteEl || !canvasEl) return;

    const move = (event: PointerEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      const { top, left } = constrainThumbPosition({
        top: event.clientY - rect.top,
        left: event.clientX - rect.left
      });
      movePaletteThumb({ top, left });
      changeSB({ event, top, left });
    };
    const handlePointerDown = (event: PointerEvent) => {
      isPressedRef.current = true;
      move(event);
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (!isPressedRef.current) return;
      move(event);
    };
    const handlePointerOut = () => {
      isPressedRef.current = false;
    };

    paletteEl.addEventListener('pointerdown', handlePointerDown);
    paletteEl.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerOut);
    return () => {
      paletteEl.removeEventListener('pointerdown', handlePointerDown);
      paletteEl.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerOut);
    };
  }, [changeSB]);

  useEffect(() => {
    const paletteThumbEl = paletteThumbElRef.current;
    if (!paletteThumbEl) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        !['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(
          event.code
        )
      )
        return;

      event.preventDefault();
      const { left, top } = paletteThumbPositionRef.current;
      let newTop: number = top;
      let newLeft: number = left;
      switch (event.code) {
        case 'ArrowRight':
          newLeft = left + 1;
          break;
        case 'ArrowLeft':
          newLeft = left - 1;
          break;
        case 'ArrowUp':
          newTop = top - 1;
          break;
        case 'ArrowDown':
          newTop = top + 1;
          break;
      }
      const { top: constrainedTop, left: constrainedLeft } =
        constrainThumbPosition({
          top: newTop,
          left: newLeft
        });
      movePaletteThumb({ top: constrainedTop, left: constrainedLeft });
      changeSB({ event, top: constrainedTop, left: constrainedLeft });
    };

    paletteThumbEl.addEventListener('keydown', handleKeyDown);
    return () => {
      paletteThumbEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [changeSB]);

  return {
    paletteElRef,
    sbCanvasElRef,
    paletteThumbElRef
  };
};
