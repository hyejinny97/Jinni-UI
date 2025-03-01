import './Slider.scss';
import cn from 'classnames';
import React, { useRef, useMemo } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';
import {
  useSliderValue,
  useMouseAndTouchEvent,
  useKeyEvent
} from './Slider.hooks';
import {
  getTrackStyle,
  getPositionStyle,
  generateStepValueArray,
  generateMarksValueArray,
  generateMarksLabelArray,
  isMarkOnTrack
} from './Slider.utils';
import { Tooltip, TooltipProps } from '@/components/data-display/Tooltip';

export type SliderValueType = number | Array<number>;
export type MarksType =
  | Array<{ value: number; label?: React.ReactNode }>
  | boolean;

export type SliderProps<T extends AsType = 'input'> = Omit<
  DefaultComponentProps<T>,
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
  getAriaValueText?: (scaledValue: number, index: number) => string;
  tooltipLabelFormat?: (scaledValue: number, index: number) => React.ReactNode;
};

const Slider = <T extends AsType = 'input'>(props: SliderProps<T>) => {
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
    as: Component = 'input',
    ...rest
  } = props;
  const sliderElRef = useRef<HTMLDivElement>(null);
  const thumbsElRef = useRef<Array<HTMLSpanElement>>([]);
  const stepValueArray = useMemo(
    () => generateStepValueArray({ min, max, step, marks }),
    [min, max, step, marks]
  );
  const marksValueArray = generateMarksValueArray({ marks, stepValueArray });
  const marksLabelArray = generateMarksLabelArray({ marks });
  const { sliderValue, handleChange, handleChangeEnd } = useSliderValue({
    defaultValue,
    value,
    onChange,
    onChangeEnd,
    min,
    stepValueArray,
    disableSwap,
    disabled
  });
  const { handleMouseDown, handleTouchStart } = useMouseAndTouchEvent({
    sliderElRef,
    sliderValue,
    stepValueArray,
    min,
    max,
    disabled,
    orientation,
    handleChange,
    handleChangeEnd
  });
  const { handleKeyDown, handleKeyUp, handleFocus, handleBlur } = useKeyEvent({
    thumbsElRef,
    sliderValue,
    stepValueArray,
    handleChange,
    handleChangeEnd
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
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={newStyle}
    >
      <div className={cn('JinniSliderRail', orientation)} />
      <div
        className={cn(
          'JinniSliderTrack',
          { noTrack: track === false },
          orientation
        )}
        style={getTrackStyle({ sliderValue, min, max, orientation })}
      />
      {marksValueArray.map((value) => (
        <span
          key={value}
          className={cn(
            'JinniSliderMark',
            {
              onTrack: isMarkOnTrack({
                sliderValue,
                value,
                min,
                max,
                orientation
              })
            },
            orientation,
            size
          )}
          style={getPositionStyle({ value, min, max, orientation })}
        />
      ))}
      {marksLabelArray.map(({ value, label }) => (
        <span
          key={value}
          className={cn('JinniSliderMarkLabel', orientation, size)}
          style={getPositionStyle({ value, min, max, orientation })}
        >
          {label}
        </span>
      ))}
      {sliderValue.map((value, idx) => (
        <Tooltip
          key={`${value}/${idx}`}
          content={tooltipLabelFormat(scale(value), idx)}
          placement={orientation === 'horizontal' ? 'top' : 'left'}
          arrow
          {...TooltipProps}
        >
          <span
            ref={(element) => {
              if (!element) return;
              thumbsElRef.current[idx] = element;
            }}
            className={cn('JinniSliderThumb', { disabled }, orientation, size)}
            tabIndex={0}
            onKeyDown={handleKeyDown(idx)}
            onKeyUp={handleKeyUp}
            onFocus={() => handleFocus(idx)}
            onBlur={() => handleBlur(idx)}
            style={getPositionStyle({ value, min, max, orientation })}
          >
            <Component
              className="JinniSliderInput"
              tabIndex={-1}
              type="range"
              value={value}
              onChange={() => {}}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              aria-valuenow={scale(value)}
              aria-valuemin={scale(min)}
              aria-valuemax={scale(max)}
              aria-valuetext={getAriaValueText(scale(value), idx)}
              {...rest}
            />
          </span>
        </Tooltip>
      ))}
    </div>
  );
};

export default Slider;
