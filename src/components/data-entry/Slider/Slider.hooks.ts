import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { SliderProps } from './Slider';
import { findClosestValueIdx, computeValue, isSwapped } from './Slider.utils';
import { isNumber } from '@/utils/isNumber';

type ChangeHandlerType = ({
  event,
  activeThumbIdx,
  newThumbValue
}: {
  event: React.SyntheticEvent | Event;
  activeThumbIdx: number;
  newThumbValue: number;
}) => void;

type ChangeEndHandlerType = (event: React.SyntheticEvent | Event) => void;

export const useSliderValue = ({
  defaultValue,
  value,
  onChange,
  onChangeEnd,
  min,
  stepValueArray,
  disableSwap,
  disabled
}: Pick<SliderProps, 'onChange' | 'onChangeEnd' | 'defaultValue' | 'value'> & {
  min: number;
  stepValueArray: Array<number>;
  disableSwap: boolean;
  disabled: boolean;
}) => {
  const computedValue = useMemo(
    () => computeValue(value, stepValueArray),
    [value, stepValueArray]
  );
  const computedDefaultValue = useMemo(
    () => computeValue(defaultValue, stepValueArray),
    [defaultValue, stepValueArray]
  );
  const isControlledSlider = computedValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<Array<number>>(
    computedDefaultValue || [min]
  );

  const handleChange: ChangeHandlerType = useCallback(
    ({ event, activeThumbIdx, newThumbValue }) => {
      if (disabled) return;
      const isControlledSlider = computedValue !== undefined;
      const prevSliderValue = isControlledSlider
        ? computedValue
        : uncontrolledValue;
      const prevThumbValue = prevSliderValue[activeThumbIdx];
      if (prevThumbValue === newThumbValue) return;
      if (
        disableSwap &&
        isSwapped({ prevSliderValue, activeThumbIdx, newThumbValue })
      )
        return;

      const newSliderValue = [...prevSliderValue];
      newSliderValue[activeThumbIdx] = newThumbValue;
      if (!isControlledSlider) setUncontrolledValue(newSliderValue);
      if (onChange) {
        onChange(
          event,
          newSliderValue.length === 1 ? newSliderValue[0] : newSliderValue,
          activeThumbIdx
        );
      }
    },
    [onChange, uncontrolledValue, computedValue, disableSwap, disabled]
  );

  const handleChangeEnd: ChangeEndHandlerType = useCallback(
    (event) => {
      if (disabled) return;
      const isControlledSlider = computedValue !== undefined;
      const newSliderValue = isControlledSlider
        ? computedValue
        : uncontrolledValue;
      if (onChangeEnd) {
        onChangeEnd(
          event,
          newSliderValue.length === 1 ? newSliderValue[0] : newSliderValue
        );
      }
    },
    [onChangeEnd, computedValue, uncontrolledValue, disabled]
  );

  return {
    sliderValue: isControlledSlider ? computedValue : uncontrolledValue,
    handleChange,
    handleChangeEnd
  };
};

export const useMouseAndTouchEvent = ({
  sliderElRef,
  sliderValue,
  stepValueArray,
  min,
  max,
  disabled,
  orientation,
  handleChange,
  handleChangeEnd
}: {
  sliderElRef: React.RefObject<HTMLDivElement>;
  sliderValue: Array<number>;
  stepValueArray: Array<number>;
  min: number;
  max: number;
  disabled: boolean;
  orientation: 'horizontal' | 'vertical';
  handleChange: ChangeHandlerType;
  handleChangeEnd: ChangeEndHandlerType;
}) => {
  const isPressedRef = useRef<boolean>(false);
  const pressedXRef = useRef<number | undefined>();
  const pressedYRef = useRef<number | undefined>();
  const activeThumbIdx = useRef<number | undefined>();

  const calculateCurrentValue = useCallback(() => {
    const sliderEl = sliderElRef.current;
    if (!sliderEl) return;

    switch (orientation) {
      case 'horizontal': {
        const pressedX = pressedXRef.current;
        if (!isNumber(pressedX)) return;
        const { width: sliderWidth, left: sliderLeft } =
          sliderEl.getBoundingClientRect();
        const offsetLeft = pressedX - sliderLeft;
        return offsetLeft > 0
          ? (offsetLeft * (max - min)) / sliderWidth + min
          : 0;
      }
      case 'vertical': {
        const pressedY = pressedYRef.current;
        if (!isNumber(pressedY)) return;
        const { height: sliderHeight, bottom: sliderBottom } =
          sliderEl.getBoundingClientRect();
        const offsetBottom = sliderBottom - pressedY;
        return offsetBottom > 0
          ? (offsetBottom * (max - min)) / sliderHeight + min
          : 0;
      }
    }
  }, [max, min, sliderElRef, orientation]);

  const moveThumb = useCallback(
    (
      event:
        | React.MouseEvent<HTMLDivElement>
        | MouseEvent
        | React.TouchEvent<HTMLDivElement>
        | TouchEvent
    ) => {
      const currentValue = calculateCurrentValue();
      if (!currentValue || !isNumber(activeThumbIdx.current)) return;

      const closestStepValueIdx = findClosestValueIdx({
        values: stepValueArray,
        target: currentValue
      });
      handleChange({
        event,
        activeThumbIdx: activeThumbIdx.current,
        newThumbValue: stepValueArray[closestStepValueIdx]
      });
    },
    [calculateCurrentValue, handleChange, stepValueArray]
  );

  const handleStart = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (disabled) return;
    isPressedRef.current = true;
    switch (orientation) {
      case 'horizontal': {
        pressedXRef.current =
          'touches' in event ? event.touches[0].clientX : event.clientX;
        break;
      }
      case 'vertical': {
        pressedYRef.current =
          'touches' in event ? event.touches[0].clientY : event.clientY;
      }
    }

    const currentValue = calculateCurrentValue();
    if (currentValue) {
      activeThumbIdx.current = findClosestValueIdx({
        values: sliderValue,
        target: currentValue
      });
    }
    moveThumb(event);
  };

  useEffect(() => {
    const handleEnd = (event: MouseEvent | TouchEvent) => {
      if (isPressedRef.current) handleChangeEnd(event);
      isPressedRef.current = false;
      activeThumbIdx.current = undefined;
      document.documentElement.style.cursor = 'default';
    };
    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!isPressedRef.current) return;
      switch (orientation) {
        case 'horizontal': {
          if (!isNumber(pressedXRef.current)) return;
          pressedXRef.current =
            event instanceof MouseEvent
              ? event.clientX
              : event.touches[0].clientX;
          break;
        }
        case 'vertical':
          if (!isNumber(pressedYRef.current)) return;
          pressedYRef.current =
            event instanceof MouseEvent
              ? event.clientY
              : event.touches[0].clientY;
      }
      document.documentElement.style.cursor = 'pointer';
      moveThumb(event);
    };

    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('touchmove', handleMove);
    return () => {
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('touchmove', handleMove);
    };
  }, [moveThumb, handleChangeEnd, sliderValue, orientation]);

  return {
    handleMouseDown: handleStart,
    handleTouchStart: handleStart
  };
};

export const useKeyEvent = ({
  thumbsElRef,
  sliderValue,
  stepValueArray,
  handleChange,
  handleChangeEnd
}: {
  thumbsElRef: React.MutableRefObject<HTMLSpanElement[]>;
  sliderValue: Array<number>;
  stepValueArray: Array<number>;
  handleChange: ChangeHandlerType;
  handleChangeEnd: ChangeEndHandlerType;
}) => {
  const thumbFocusStateRef = useRef<Array<boolean>>(
    new Array(sliderValue.length)
  );
  const isArrowKeyPressedRef = useRef<boolean>(false);

  const handleKeyDown =
    (thumbIdx: number) => (event: React.KeyboardEvent<HTMLSpanElement>) => {
      const isArrowUpKey = event.key === 'ArrowUp';
      const isArrowDownKey = event.key === 'ArrowDown';
      const isArrowRightKey = event.key === 'ArrowRight';
      const isArrowLeftKey = event.key === 'ArrowLeft';
      if (
        !(isArrowUpKey || isArrowDownKey || isArrowRightKey || isArrowLeftKey)
      )
        return;

      event.preventDefault();
      isArrowKeyPressedRef.current = true;

      const currentStepValueIdx = stepValueArray.findIndex(
        (value) => value === sliderValue[thumbIdx]
      );
      if (currentStepValueIdx === -1)
        throw new Error('thumb value가 step value에 포함되지 않습니다.');
      const nextStepValueIdx =
        isArrowUpKey || isArrowRightKey
          ? Math.min(currentStepValueIdx + 1, stepValueArray.length - 1)
          : Math.max(currentStepValueIdx - 1, 0);
      handleChange({
        event,
        activeThumbIdx: thumbIdx,
        newThumbValue: stepValueArray[nextStepValueIdx]
      });
    };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (!isArrowKeyPressedRef.current) return;
    isArrowKeyPressedRef.current = false;
    handleChangeEnd(event);
  };

  const handleFocus = (thumbIdx: number) => {
    thumbFocusStateRef.current[thumbIdx] = true;
  };

  const handleBlur = (thumbIdx: number) => {
    thumbFocusStateRef.current[thumbIdx] = false;
  };

  useEffect(() => {
    const thumbsEl = thumbsElRef.current;
    if (!thumbsEl) return;
    thumbsEl.forEach((thumbEl, idx) => {
      const isFocused = thumbFocusStateRef.current[idx];
      if (isFocused) thumbEl.focus();
    });
  }, [sliderValue, thumbsElRef]);

  return {
    handleKeyDown,
    handleKeyUp,
    handleFocus,
    handleBlur
  };
};
