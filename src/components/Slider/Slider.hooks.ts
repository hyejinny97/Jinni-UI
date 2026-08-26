import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { SliderProps } from './Slider';
import {
  findClosestValueIdx,
  preprocessValue,
  isSwapped,
  getDecimalLength
} from './Slider.utils';
import { isNumber } from '@/utils/isNumber';
import { getTrackStyle, getPositionStyle, isMarkOnTrack } from './Slider.utils';
import { useIsControlled } from '@/hooks/useIsControlled';

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
  disabled,
  toRealValue
}: Pick<SliderProps, 'onChange' | 'onChangeEnd' | 'defaultValue' | 'value'> & {
  min: number;
  stepValueArray: Array<number>;
  disableSwap: boolean;
  disabled: boolean;
  toRealValue: (value: number) => number;
}) => {
  const preprocessedValue = useMemo(
    () => preprocessValue(value, stepValueArray),
    [value, stepValueArray]
  );
  const preprocessedDefaultValue = useMemo(
    () => preprocessValue(defaultValue, stepValueArray),
    [defaultValue, stepValueArray]
  );
  const isControlled = useIsControlled(preprocessedValue);
  const [uncontrolledValue, setUncontrolledValue] = useState<Array<number>>(
    preprocessedDefaultValue || [min]
  );

  const handleChange: ChangeHandlerType = useCallback(
    ({ event, activeThumbIdx, newThumbValue }) => {
      if (disabled) return;
      const prevSliderValue = isControlled
        ? preprocessedValue
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
      if (!isControlled) setUncontrolledValue(newSliderValue);
      if (onChange) {
        const outputValue = newSliderValue.map(toRealValue);
        onChange(
          event,
          outputValue.length === 1 ? outputValue[0] : outputValue,
          activeThumbIdx
        );
      }
    },
    [
      onChange,
      uncontrolledValue,
      preprocessedValue,
      disableSwap,
      disabled,
      isControlled,
      toRealValue
    ]
  );

  const handleChangeEnd: ChangeEndHandlerType = useCallback(
    (event) => {
      if (disabled) return;
      const newSliderValue = isControlled
        ? preprocessedValue
        : uncontrolledValue;
      if (onChangeEnd) {
        const outputValue = newSliderValue.map(toRealValue);
        onChangeEnd(
          event,
          outputValue.length === 1 ? outputValue[0] : outputValue
        );
      }
    },
    [
      onChangeEnd,
      preprocessedValue,
      uncontrolledValue,
      disabled,
      isControlled,
      toRealValue
    ]
  );

  return {
    sliderValue: isControlled ? preprocessedValue : uncontrolledValue,
    handleChange,
    handleChangeEnd
  };
};

export const usePointerEvent = ({
  sliderElRef,
  thumbsElRef,
  sliderValue,
  stepValueArray,
  min,
  max,
  disabled,
  orientation,
  handleChange,
  handleChangeEnd
}: {
  sliderElRef: React.RefObject<HTMLDivElement | null>;
  thumbsElRef: React.RefObject<HTMLInputElement[]>;
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
  const pressedXRef = useRef<number | undefined>(undefined);
  const pressedYRef = useRef<number | undefined>(undefined);
  const activeThumbIdx = useRef<number | undefined>(undefined);

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
      if (thumbsElRef.current && activeThumbIdx.current !== undefined) {
        thumbsElRef.current[activeThumbIdx.current].focus();
      }
    },
    [calculateCurrentValue, handleChange, thumbsElRef, stepValueArray]
  );

  useEffect(() => {
    const sliderEl = sliderElRef.current;
    if (!sliderEl) return;

    const handleStart = (event: PointerEvent) => {
      if (disabled) return;
      isPressedRef.current = true;
      switch (orientation) {
        case 'horizontal': {
          pressedXRef.current = event.clientX;
          break;
        }
        case 'vertical': {
          pressedYRef.current = event.clientY;
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
    const handleMove = (event: PointerEvent) => {
      if (!isPressedRef.current) return;
      switch (orientation) {
        case 'horizontal': {
          if (!isNumber(pressedXRef.current)) return;
          pressedXRef.current = event.clientX;
          break;
        }
        case 'vertical':
          if (!isNumber(pressedYRef.current)) return;
          pressedYRef.current = event.clientY;
      }
      document.documentElement.style.cursor = 'pointer';
      moveThumb(event);
    };
    const handleEnd = (event: PointerEvent) => {
      if (isPressedRef.current) handleChangeEnd(event);
      isPressedRef.current = false;
      activeThumbIdx.current = undefined;
      document.documentElement.style.cursor = 'default';
    };

    sliderEl.addEventListener('pointerdown', handleStart);
    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleEnd);
    return () => {
      sliderEl.removeEventListener('pointerdown', handleStart);
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleEnd);
    };
  }, [
    moveThumb,
    handleChangeEnd,
    calculateCurrentValue,
    sliderElRef,
    disabled,
    sliderValue,
    orientation
  ]);
};

export const useKeyEvent = ({
  thumbsElRef,
  sliderValue,
  stepValueArray,
  handleChange,
  handleChangeEnd
}: {
  thumbsElRef: React.RefObject<HTMLInputElement[]>;
  sliderValue: Array<number>;
  stepValueArray: Array<number>;
  handleChange: ChangeHandlerType;
  handleChangeEnd: ChangeEndHandlerType;
}) => {
  const isArrowKeyPressedRef = useRef<boolean>(false);
  const focusedThumbIdxRef = useRef<number | null>(null);

  useEffect(() => {
    const thumbsEl = thumbsElRef.current;
    if (!thumbsEl) return;

    const handleKeyDown = (thumbIdx: number) => (event: KeyboardEvent) => {
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
      focusedThumbIdxRef.current = thumbIdx;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!isArrowKeyPressedRef.current) return;
      isArrowKeyPressedRef.current = false;
      handleChangeEnd(event);
    };

    thumbsEl.forEach((thumbEl, idx) => {
      thumbEl.addEventListener('keydown', handleKeyDown(idx));
      thumbEl.addEventListener('keyup', handleKeyUp);
    });
    return () => {
      thumbsEl.forEach((thumbEl, idx) => {
        thumbEl.removeEventListener('keydown', handleKeyDown(idx));
        thumbEl.removeEventListener('keyup', handleKeyUp);
      });
    };
  }, [handleChange, handleChangeEnd, sliderValue, thumbsElRef, stepValueArray]);

  useEffect(() => {
    if (focusedThumbIdxRef.current === null) return;

    const el = thumbsElRef.current[focusedThumbIdxRef.current];
    if (el) el.focus();

    focusedThumbIdxRef.current = null;
  });
};

export const useUtils = ({
  sliderValue,
  min,
  max,
  orientation,
  track
}: {
  sliderValue: Array<number>;
  min: number;
  max: number;
  orientation: 'horizontal' | 'vertical';
  track: 'normal' | false;
}) => {
  return {
    trackStyle: getTrackStyle({ sliderValue, min, max, orientation, track }),
    isMarkOnTrack: (value: number) =>
      isMarkOnTrack({
        sliderValue,
        value,
        min,
        max,
        orientation,
        track
      }),
    getPositionStyle: (value: number) =>
      getPositionStyle({ value, min, max, orientation })
  };
};

export const usePrecision = ({
  defaultValue,
  value,
  step,
  min,
  max,
  marks
}: Pick<SliderProps, 'defaultValue' | 'value'> &
  Required<Pick<SliderProps, 'step' | 'min' | 'max' | 'marks'>>): {
  normalizedDefaultValue: SliderProps['defaultValue'];
  normalizedValue: SliderProps['value'];
  normalizedStep: Exclude<SliderProps['step'], undefined>;
  normalizedMin: Exclude<SliderProps['min'], undefined>;
  normalizedMax: Exclude<SliderProps['max'], undefined>;
  normalizedMarks: Exclude<SliderProps['marks'], undefined>;
  toRealValue: (value: number) => number;
} => {
  const isFloatStep = !(step === null || Number.isInteger(step));
  const stepFactor = isFloatStep ? Math.pow(10, getDecimalLength(step)) : 1;

  const toInteger = (num: number) => num * stepFactor;

  const toRealValue = useCallback(
    (value: number) => value / stepFactor,
    [stepFactor]
  );

  let normalizedDefaultValue: SliderProps['defaultValue'] = defaultValue;
  if (Array.isArray(defaultValue)) {
    normalizedDefaultValue = defaultValue.map(toInteger);
  } else if (isNumber(defaultValue)) {
    normalizedDefaultValue = toInteger(defaultValue);
  }

  let normalizedValue: SliderProps['value'] = value;
  if (Array.isArray(value)) {
    normalizedValue = value.map(toInteger);
  } else if (isNumber(value)) {
    normalizedValue = toInteger(value);
  }

  return {
    normalizedDefaultValue,
    normalizedValue,
    normalizedStep: step === null ? step : toInteger(step),
    normalizedMin: toInteger(min),
    normalizedMax: toInteger(max),
    normalizedMarks: Array.isArray(marks)
      ? marks.map((el) => ({ ...el, value: toInteger(el.value) }))
      : marks,
    toRealValue
  };
};
