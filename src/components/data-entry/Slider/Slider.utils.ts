import { SliderValueType, MarksType } from './Slider';
import { transformToArray } from '@/utils/transformToArray';

type TrackStyle<T extends 'horizontal' | 'vertical'> = T extends 'horizontal'
  ? { left: string; width: string }
  : { bottom: string; height: string };

type PositionStyle<T extends 'horizontal' | 'vertical'> = T extends 'horizontal'
  ? { left: string }
  : { bottom: string };

export const getTrackStyle = <T extends 'horizontal' | 'vertical'>({
  sliderValue,
  min,
  max,
  orientation,
  track
}: {
  sliderValue: Array<number>;
  min: number;
  max: number;
  orientation: T;
  track: 'normal' | false;
}): TrackStyle<T> => {
  if (track === false) {
    return (
      orientation === 'horizontal'
        ? { width: '0px', left: '0px' }
        : { height: '0px', bottom: '0px' }
    ) as TrackStyle<T>;
  }

  const maxSliderValue = Math.max(...sliderValue);
  const minSliderValue =
    sliderValue.length === 1 ? min : Math.min(...sliderValue);
  const valueDistance = maxSliderValue - minSliderValue;
  const totalDistance = max - min;

  return (
    orientation === 'horizontal'
      ? {
          width: `${(valueDistance / totalDistance) * 100}%`,
          left: `${((minSliderValue - min) / totalDistance) * 100}%`
        }
      : {
          height: `${(valueDistance / totalDistance) * 100}%`,
          bottom: `${((minSliderValue - min) / totalDistance) * 100}%`
        }
  ) as TrackStyle<T>;
};

export const getPositionStyle = <T extends 'horizontal' | 'vertical'>({
  value,
  min,
  max,
  orientation
}: {
  value: number;
  min: number;
  max: number;
  orientation: T;
}): PositionStyle<T> => {
  const totalDistance = max - min;
  const positionValue = `${((value - min) / totalDistance) * 100}%`;

  return (
    orientation === 'horizontal'
      ? { left: positionValue }
      : { bottom: positionValue }
  ) as PositionStyle<T>;
};

export const generateStepValueArray = ({
  min,
  max,
  step,
  marks
}: {
  min: number;
  max: number;
  step: number | null;
  marks: MarksType;
}): Array<number> => {
  if (step === null) {
    if (!Array.isArray(marks)) return [];

    const marksValueArray = marks.map(({ value }) => value);
    if (marksValueArray[0] !== min) marksValueArray.unshift(min);
    if (marksValueArray.at(-1) !== max) marksValueArray.push(max);
    return marksValueArray;
  }

  const stepValue: number[] = [];
  for (let i = min; i < max; i += step) {
    stepValue.push(i);
  }
  return [...stepValue, max];
};

export const generateMarksValueArray = ({
  marks,
  stepValueArray
}: {
  marks: MarksType;
  stepValueArray: Array<number>;
}): Array<number> => {
  if (!marks) return [];
  return Array.isArray(marks)
    ? marks.map(({ value }) => value)
    : stepValueArray;
};

export const generateMarksLabelArray = ({
  marks
}: {
  marks: MarksType;
}): Array<{
  value: number;
  label: React.ReactNode;
}> => {
  return (
    Array.isArray(marks) ? marks.filter((mark) => mark.label !== undefined) : []
  ) as Array<{
    value: number;
    label: React.ReactNode;
  }>;
};

export const findClosestValueIdx = ({
  values,
  target
}: {
  values: Array<number>;
  target: number;
}) => {
  const distancesFromTarget = values.map((value) => Math.abs(value - target));
  const minDistance = Math.min(...distancesFromTarget);

  const closerValuesIdx: Array<number> = [];
  distancesFromTarget.forEach((distance, idx) => {
    if (distance === minDistance) {
      closerValuesIdx.push(idx);
    }
  });

  return closerValuesIdx.length > 1
    ? closerValuesIdx[closerValuesIdx.length - 1]
    : closerValuesIdx[0];
};

export const preprocessValue = (
  value: SliderValueType | undefined,
  stepValueArray: Array<number>
): Array<number> | undefined => {
  if (value === undefined) return;
  return transformToArray(value).map((value) => {
    const closestStepValueIdx = findClosestValueIdx({
      values: stepValueArray,
      target: value
    });
    return stepValueArray[closestStepValueIdx];
  });
};

export const isSwapped = ({
  prevSliderValue,
  activeThumbIdx,
  newThumbValue
}: {
  prevSliderValue: Array<number>;
  activeThumbIdx: number;
  newThumbValue: number;
}): boolean => {
  const hasBelowThumb = activeThumbIdx - 1 >= 0;
  const hasAboveThumb = activeThumbIdx + 1 < prevSliderValue.length;
  const passAboveThumb =
    hasBelowThumb && prevSliderValue[activeThumbIdx - 1] > newThumbValue;
  const passBelowThumb =
    hasAboveThumb && prevSliderValue[activeThumbIdx + 1] < newThumbValue;
  return passAboveThumb || passBelowThumb;
};

export const isMarkOnTrack = ({
  sliderValue,
  value,
  min,
  max,
  orientation,
  track
}: {
  sliderValue: Array<number>;
  value: number;
  min: number;
  max: number;
  orientation: 'horizontal' | 'vertical';
  track: 'normal' | false;
}): boolean => {
  const markPosition = getPositionStyle({ value, min, max, orientation });
  const trackStyle = getTrackStyle({
    sliderValue,
    min,
    max,
    orientation,
    track
  });

  if (track === false) {
    return sliderValue.includes(value);
  }

  if (orientation === 'horizontal') {
    const { left: markLeft } = markPosition as PositionStyle<'horizontal'>;
    const { left: trackLeft, width: trackWidth } =
      trackStyle as TrackStyle<'horizontal'>;
    const markLeftNum = parseInt(markLeft);
    const trackLeftNum = parseInt(trackLeft);
    const trackRightNum = trackLeftNum + parseInt(trackWidth);
    return trackLeftNum <= markLeftNum && markLeftNum <= trackRightNum;
  } else {
    const { bottom: markBottom } = markPosition as PositionStyle<'vertical'>;
    const { bottom: trackBottom, height: trackHeight } =
      trackStyle as TrackStyle<'vertical'>;
    const markBottomNum = parseInt(markBottom);
    const trackBottomNum = parseInt(trackBottom);
    const trackTopNum = trackBottomNum + parseInt(trackHeight);
    return trackBottomNum <= markBottomNum && markBottomNum <= trackTopNum;
  }
};
