'use client';

import './Slider.scss';
import cn from 'classnames';
import React, { useRef, useMemo } from 'react';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';
import {
  useSliderValue,
  usePointerEvent,
  useKeyEvent,
  useUtils,
  usePrecision
} from './Slider.hooks';
import {
  generateStepValueArray,
  generateMarksValueArray,
  generateMarksLabelArray
} from './Slider.utils';
import Tooltip, { TooltipProps } from '@/components/Tooltip';

export type SliderValueType = number | Array<number>;
export type MarksType =
  | Array<{ value: number; label?: React.ReactNode }>
  | boolean;

export type SliderProps = Omit<
  DefaultComponentProps<'input'>,
  'defaultValue' | 'value' | 'onChange' | 'size' | 'step'
> & {
  defaultValue?: SliderValueType;
  value?: SliderValueType;
  onChange?: (
    event: React.SyntheticEvent | Event,
    value: SliderValueType,
    activeThumbIdx: number
  ) => void;
  onChangeEnd?: (
    event: React.SyntheticEvent | Event,
    value: SliderValueType
  ) => void;
  min?: number;
  max?: number;
  step?: number | null;
  marks?: MarksType;
  disableSwap?: boolean;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  color?: ColorType;
  size?: 'sm' | 'md' | 'lg';
  track?: 'normal' | false;
  scale?: (value: number) => number;
  TooltipProps?: Partial<TooltipProps>;
  getAriaValueText?: (scaledValue: number, thumbIdx: number) => string;
  tooltipLabelFormat?: (
    scaledValue: number,
    thumbIdx: number
  ) => React.ReactNode;
};

const Slider = (props: SliderProps) => {
  const {
    defaultValue,
    value,
    onChange,
    onChangeEnd,
    min = 0,
    max = 100,
    step = 1,
    marks = false,
    disableSwap = false,
    orientation = 'horizontal',
    disabled = false,
    color = 'primary',
    size = 'md',
    track = 'normal',
    scale = (value: number) => value,
    TooltipProps,
    getAriaValueText = (scaledValue: number) => String(scaledValue),
    tooltipLabelFormat = (scaledValue: number) => scaledValue,
    className,
    style,
    ...rest
  } = props;
  const sliderElRef = useRef<HTMLDivElement>(null);
  const thumbsElRef = useRef<Array<HTMLInputElement>>([]);
  const {
    normalizedDefaultValue,
    normalizedValue,
    normalizedStep,
    normalizedMin,
    normalizedMax,
    normalizedMarks,
    toRealValue
  } = usePrecision({ defaultValue, value, step, min, max, marks });
  const stepValueArray = useMemo(
    () =>
      generateStepValueArray({
        min: normalizedMin,
        max: normalizedMax,
        step: normalizedStep,
        marks: normalizedMarks
      }),
    [normalizedMin, normalizedMax, normalizedStep, normalizedMarks]
  );
  const marksValueArray = generateMarksValueArray({
    marks: normalizedMarks,
    stepValueArray
  });
  const marksLabelArray = generateMarksLabelArray({ marks: normalizedMarks });
  const { sliderValue, handleChange, handleChangeEnd } = useSliderValue({
    defaultValue: normalizedDefaultValue,
    value: normalizedValue,
    onChange,
    onChangeEnd,
    min: normalizedMin,
    stepValueArray,
    disableSwap,
    disabled,
    toRealValue
  });
  usePointerEvent({
    sliderElRef,
    thumbsElRef,
    sliderValue,
    stepValueArray,
    min: normalizedMin,
    max: normalizedMax,
    disabled,
    orientation,
    handleChange,
    handleChangeEnd
  });
  useKeyEvent({
    thumbsElRef,
    sliderValue,
    stepValueArray,
    handleChange,
    handleChangeEnd
  });
  const { trackStyle, isMarkOnTrack, getPositionStyle } = useUtils({
    sliderValue,
    min: normalizedMin,
    max: normalizedMax,
    orientation,
    track
  });
  const newStyle = useStyle({
    '--color': disabled ? 'gray-400' : color,
    ...style
  });

  return (
    <div
      ref={sliderElRef}
      className={cn(
        'JinniSlider',
        { hasMarksLabel: marksLabelArray.length > 0, disabled },
        orientation,
        size,
        className
      )}
      style={newStyle}
    >
      <div className={cn('JinniSliderRail', orientation)} />
      <div className={cn('JinniSliderTrack', orientation)} style={trackStyle} />
      {marksValueArray.map((value) => (
        <span
          key={value}
          className={cn(
            'JinniSliderMark',
            { onTrack: isMarkOnTrack(value) },
            orientation,
            size
          )}
          style={getPositionStyle(value)}
        />
      ))}
      {marksLabelArray.map(({ value, label }) => (
        <span
          key={value}
          className={cn(
            'JinniSliderMarkLabel',
            { onTrack: isMarkOnTrack(value) },
            orientation,
            size
          )}
          style={getPositionStyle(value)}
        >
          {label}
        </span>
      ))}
      {sliderValue.map((value, idx) => (
        <Tooltip
          key={`${value}/${idx}`}
          content={tooltipLabelFormat(scale(toRealValue(value)), idx)}
          placement={orientation === 'horizontal' ? 'top' : 'left'}
          arrow
          {...TooltipProps}
        >
          <span
            className={cn('JinniSliderThumb', { disabled }, orientation, size)}
            style={getPositionStyle(value)}
          >
            <input
              ref={(element) => {
                if (!element) return;
                thumbsElRef.current[idx] = element;
              }}
              className="JinniSliderInput"
              type="range"
              value={toRealValue(value)}
              onChange={() => {}}
              min={min}
              max={max}
              step={step === null ? undefined : step}
              disabled={disabled}
              aria-valuenow={scale(toRealValue(value))}
              aria-valuemin={scale(min)}
              aria-valuemax={scale(max)}
              aria-valuetext={getAriaValueText(scale(toRealValue(value)), idx)}
              {...rest}
            />
          </span>
        </Tooltip>
      ))}
    </div>
  );
};

export default Slider;
