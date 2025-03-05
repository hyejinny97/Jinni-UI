import { useState, useRef } from 'react';
import { RatingProps } from './Rating';
import { isNumber } from '@/utils/isNumber';
import { ceilByStep } from './Rating.utils';

export const useRatingValue = ({
  defaultValue,
  value,
  readOnly,
  onChange
}: Pick<RatingProps, 'defaultValue' | 'value' | 'onChange' | 'readOnly'>) => {
  const isControlledRating = value !== undefined && isNumber(value);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || 0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const newValue = Number(event.target.value);
    if (!isControlledRating) setUncontrolledValue(newValue);
    if (onChange) onChange(event, newValue);
  };

  return {
    ratingValue: isControlledRating ? value : uncontrolledValue,
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
  const isPressedRef = useRef<boolean>(false);

  const handleHoverChange = (event: React.MouseEvent, newValue: number) => {
    if (readOnly || disabled) return;
    if (newValue === hoverValue) return;
    if (onHoverChange) onHoverChange(event, newValue);
    setHoverValue(newValue);
  };

  return {
    hoverValue,
    handleMouseDown: (event: React.MouseEvent) => {
      isPressedRef.current = true;
      handleHoverChange(event, 0);
    },
    handleMouseUp: () => {
      isPressedRef.current = false;
    },
    handleMouseMove: (event: React.MouseEvent) => {
      const ratingEl = event.currentTarget;
      const isPressed = isPressedRef.current;
      if (!ratingEl || isPressed) return;

      const { left: ratingElLeft, width: ratingElWidth } =
        ratingEl.getBoundingClientRect();
      const mouseX = event.clientX;
      const offsetLeft = mouseX - ratingElLeft;
      const newHoverValue = ceilByStep({
        value: (offsetLeft * max) / ratingElWidth,
        step
      });
      handleHoverChange(event, newHoverValue);
    },
    handleMouseOut: (event: React.MouseEvent) => {
      isPressedRef.current = false;
      handleHoverChange(event, 0);
    }
  };
};
