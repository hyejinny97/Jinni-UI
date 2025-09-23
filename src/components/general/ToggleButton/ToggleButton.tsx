import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Button, ButtonProps } from '@/components/general/Button';
import { useSelected } from './ToggleButton.hooks';
import { lighten } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';

export type ValueType = number | string | boolean;

export type ToggleButtonProps<T extends AsType = 'button'> = Omit<
  ButtonProps<T>,
  | 'variant'
  | 'shape'
  | 'loading'
  | 'loadingState'
  | 'loadingStatePosition'
  | 'fullWidth'
  | 'href'
  | 'onChange'
> & {
  value: ValueType;
  defaultSelected?: boolean;
  selected?: boolean;
  onChange?: (event: React.MouseEvent, selected: boolean) => void;
};

const ToggleButton = <T extends AsType = 'button'>(
  props: ToggleButtonProps<T>
) => {
  const {
    className,
    color = 'gray-500',
    isSquareSize = props.centerIcon && !props.children ? true : false,
    value,
    defaultSelected = false,
    selected,
    onChange,
    style,
    ...rest
  } = props;
  const normalizedColor = useColor(color);
  const { isSelected, handleChange } = useSelected({
    defaultSelected,
    selected,
    onChange
  });

  return (
    <Button
      className={cn('JinniToggleButton', className)}
      variant="outlined"
      color="gray-500"
      size="md"
      isSquareSize={isSquareSize}
      style={
        isSelected
          ? {
              '--text-color': color,
              backgroundColor: lighten(normalizedColor, 0.8),
              ...style
            }
          : style
      }
      value={value}
      onClick={handleChange}
      {...rest}
    />
  );
};

export default ToggleButton;
