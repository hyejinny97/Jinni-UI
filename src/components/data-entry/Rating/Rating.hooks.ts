import { useState, useRef, useEffect, useCallback } from 'react';
import { RatingProps } from './Rating';
import { isNumber } from '@/utils/isNumber';
import { ceilByStep } from './Rating.utils';

type UseRatingValueProps = Pick<
  RatingProps,
  'value' | 'onChange' | 'readOnly'
> &
  Required<Pick<RatingProps, 'defaultValue' | 'step'>>;

export const useRatingValue = ({
  defaultValue,
  value,
  step,
  readOnly,
  onChange
}: UseRatingValueProps) => {
  const isControlled = value !== undefined && isNumber(value);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const value = Number(event.target.value);
    const newRatingValue = ceilByStep({ value, step });
    if (!isControlled) setUncontrolledValue(newRatingValue);
    if (onChange) onChange(event, newRatingValue);
  };

  return {
    ratingValue: isControlled ? value : uncontrolledValue,
    handleChange
  };
};

export const useHoverValue = ({
  max,
  step,
  readOnly,
  disabled,
  onHoverChange
}: Pick<RatingProps, 'onHoverChange' | 'readOnly' | 'disabled'> & {
  max: number;
  step: number;
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const ratingElRef = useRef<HTMLElement>(null);

  const handleHoverChange = useCallback(
    (event: MouseEvent, newValue: number) => {
      if (readOnly || disabled) return;
      if (newValue === hoverValue) return;
      if (onHoverChange) onHoverChange(event, newValue);
      setHoverValue(newValue);
    },
    [disabled, readOnly, hoverValue, onHoverChange]
  );

  useEffect(() => {
    const ratingEl = ratingElRef.current;
    if (!ratingEl) return;

    const handleMouseMove = (event: MouseEvent) => {
      const { left: ratingElLeft, width: ratingElWidth } =
        ratingEl.getBoundingClientRect();
      const mouseX = event.clientX;
      const offsetLeft = mouseX - ratingElLeft;
      const value = (offsetLeft * max) / ratingElWidth;
      const newHoverValue = ceilByStep({ value, step });
      handleHoverChange(event, newHoverValue);
    };
    const handleMouseOut = (event: MouseEvent) => {
      handleHoverChange(event, 0);
    };

    ratingEl.addEventListener('mousemove', handleMouseMove);
    ratingEl.addEventListener('mouseout', handleMouseOut);
    return () => {
      ratingEl.removeEventListener('mousemove', handleMouseMove);
      ratingEl.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleHoverChange, max, step]);

  return { ratingElRef, hoverValue };
};
