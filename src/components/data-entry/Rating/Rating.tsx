import './Rating.scss';
import cn from 'classnames';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { StarIcon } from '@/components/icons/StarIcon';
import { StarBorderIcon } from '@/components/icons/StarBorderIcon';
import { lighten } from '@/utils/colorLuminance';
import { ColorType } from '@/types/color';
import { useRatingValue, useHoverValue } from './Rating.hooks';
import { getContainerWidthStyle } from './Rating.utils';
import RatingIcons from './RatingIcons';
import useColor from '@/hooks/useColor';

export type SizeType = 'sm' | 'md' | 'lg' | string;

export type RatingProps = Omit<
  DefaultComponentProps<'input'>,
  'onChange' | 'size'
> & {
  defaultValue?: number;
  value?: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => void;
  onHoverChange?: (event: MouseEvent, value: number) => void;
  max?: number;
  step?: number;
  filledIcon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  color?: ColorType;
  size?: SizeType;
  readOnly?: boolean;
  disabled?: boolean;
  getLabelText?: (value: number) => string;
  disableHoverColored?: boolean;
  disableHoverScaled?: boolean;
};

const Rating = (props: RatingProps) => {
  const {
    defaultValue = 0,
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
    disableHoverColored,
    disableHoverScaled,
    className,
    style,
    ...rest
  } = props;
  const { ratingValue, handleChange } = useRatingValue({
    defaultValue,
    value,
    step,
    readOnly,
    onChange
  });
  const { ratingElRef, hoverValue } = useHoverValue({
    max,
    step,
    readOnly,
    disabled,
    onHoverChange
  });
  const scaledIconIdx = disableHoverScaled ? -1 : Math.ceil(hoverValue) - 1;
  const normalizedColor = useColor(color);
  const newStyle = useStyle(style);

  if (Array.isArray(filledIcon) || Array.isArray(emptyIcon)) return null;

  return (
    <span
      ref={ratingElRef}
      className={cn('JinniRating', { disabled })}
      style={newStyle}
    >
      <RatingIcons
        className="emptyIcons"
        icon={emptyIcon}
        count={max}
        size={size}
        scaledIconIdx={scaledIconIdx}
        style={{ '--color': 'gray-400' }}
      />
      {!disableHoverColored && (
        <span
          className="JinniRatingIconsContainer"
          style={getContainerWidthStyle({ value: hoverValue, max })}
        >
          <RatingIcons
            className="hoveredIcons"
            icon={filledIcon}
            count={max}
            size={size}
            scaledIconIdx={scaledIconIdx}
            style={{ '--color': lighten(normalizedColor, 0.7) }}
          />
        </span>
      )}
      <span
        className="JinniRatingIconsContainer"
        style={getContainerWidthStyle({ value: ratingValue, max })}
      >
        <RatingIcons
          className="filledIcons"
          icon={filledIcon}
          count={max}
          size={size}
          scaledIconIdx={scaledIconIdx}
          style={{ '--color': color }}
        />
      </span>
      <input
        className={cn('JinniRatingInput', { readOnly, disabled }, className)}
        type="range"
        value={ratingValue}
        onChange={handleChange}
        step={0.0001}
        min={0}
        max={max}
        disabled={disabled}
        readOnly={readOnly}
        aria-label={getLabelText(ratingValue)}
        {...rest}
      />
    </span>
  );
};

export default Rating;
