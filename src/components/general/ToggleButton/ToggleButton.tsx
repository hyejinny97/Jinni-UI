import './ToggleButton.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Button, ButtonProps } from '@/components/general/Button';
import { useSelected } from './ToggleButton.hooks';
import { lighten } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';

export type ValueType = number | string | boolean;

export type ToggleButtonProps<T extends AsType = 'button'> = Omit<
  ButtonProps<T>,
  'variant' | 'fullWidth' | 'onChange'
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
    defaultSelected = false,
    selected,
    onChange,
    color = 'gray-500',
    size = 'md',
    className,
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
      className={cn('JinniToggleButton', size, className)}
      onClick={handleChange}
      variant="outlined"
      color="gray-500"
      size={size}
      style={{
        ...(isSelected && {
          '--text-color': color,
          '--background-color': lighten(normalizedColor, 0.8)
        }),
        ...style
      }}
      aria-pressed={isSelected}
      {...rest}
    />
  );
};

export default ToggleButton;
