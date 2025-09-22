import './Rating.scss';
import cn from 'classnames';
import { useState } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { StarIcon } from '@/components/icons/StarIcon';
import { StarBorderIcon } from '@/components/icons/StarBorderIcon';
import { lighten } from '@/utils/colorLuminance';
import { ColorType } from '@/types/color';
import { useRatingValue, useHoverValue } from './Rating.hooks';
import { getContainerWidthStyle, getIconsSizeStyle } from './Rating.utils';
import Icons from './Icons';
import useColor from '@/hooks/useColor';

export type SizeType = 'sm' | 'md' | 'lg';

export type RatingProps<T extends AsType = 'input'> = Omit<
  DefaultComponentProps<T>,
  'onChange' | 'size'
> & {
  defaultValue?: number;
  value?: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => void;
  onHoverChange?: (event: React.MouseEvent, value: number) => void;
  max?: number;
  step?: number;
  filledIcon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  color?: ColorType;
  size?: SizeType;
  readOnly?: boolean;
  disabled?: boolean;
  getLabelText?: (value: number) => string;
};

const Rating = <T extends AsType = 'input'>(props: RatingProps<T>) => {
  const {
    defaultValue,
    value,
    onChange,
    onHoverChange,
    max = 5,
    step = 1,
    filledIcon = <StarIcon />,
    emptyIcon = <StarBorderIcon />,
    color = 'yellow-500',
    size = 'md',
    readOnly,
    disabled,
    getLabelText = (value: number) => `${value} Star${value > 1 ? 's' : ''}`,
    className,
    style,
    as: Component = 'input',
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const { ratingValue, handleChange } = useRatingValue({
    defaultValue,
    value,
    readOnly,
    onChange
  });
  const {
    hoverValue,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleMouseOut
  } = useHoverValue({
    max,
    step,
    readOnly,
    disabled,
    onHoverChange
  });
  const iconsSize = getIconsSizeStyle({ size, max });
  const normalizedColor = useColor(color);
  const newStyle = useStyle(style);

  if (Array.isArray(filledIcon) || Array.isArray(emptyIcon)) return null;

  return (
    <span
      className={cn('JinniRating', { isFocused, disabled })}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      style={newStyle}
    >
      <Icons
        className="emptyIcons"
        icon={emptyIcon}
        count={max}
        style={iconsSize}
      />
      <span
        className="JinniRatingIconContainer"
        style={getContainerWidthStyle({ value: hoverValue, max })}
      >
        <Icons
          className="hoveredIcons"
          icon={filledIcon}
          count={max}
          style={{ color: lighten(normalizedColor, 0.6), ...iconsSize }}
        />
      </span>
      <span
        className="JinniRatingIconContainer"
        style={getContainerWidthStyle({ value: ratingValue, max })}
      >
        <Icons
          className="filledIcons"
          icon={filledIcon}
          count={max}
          style={{ color, ...iconsSize }}
        />
      </span>
      <Component
        className={cn('JinniRatingInput', { readOnly, disabled }, className)}
        type="range"
        value={ratingValue}
        onChange={handleChange}
        step={step}
        min={0}
        max={max}
        disabled={disabled}
        onFocus={(event: React.FocusEvent) =>
          event.currentTarget.matches(':focus-visible') && setIsFocused(true)
        }
        onBlur={() => setIsFocused(false)}
        aria-label={getLabelText(ratingValue)}
        {...rest}
      />
    </span>
  );
};

export default Rating;
