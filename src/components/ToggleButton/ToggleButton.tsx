'use client';

import './ToggleButton.scss';
import { useMemo } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import Button, { ButtonProps } from '@/components/Button';
import { useSelected } from './ToggleButton.hooks';
import useColor from '@/hooks/useColor';
import { useToggleButtonGroup } from '@/components/ToggleButtonGroup';
import { getColorWithAlpha } from '@/utils/colorAlpha';

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
  const toggleButtonGroupValue = useToggleButtonGroup();
  let newProps = props;
  if (toggleButtonGroupValue) {
    const { selectedValue, handleChange, ...rest } = toggleButtonGroupValue;
    const { value } = props;
    newProps = {
      selected: Array.isArray(selectedValue)
        ? selectedValue.includes(value)
        : value === selectedValue,
      onChange: handleChange(value),
      ...rest,
      ...newProps
    };
  }
  const {
    defaultSelected = false,
    selected,
    onChange,
    color = 'on-surface',
    size = 'md',
    className,
    style,
    ...rest
  } = newProps;
  const { isSelected, handleChange } = useSelected({
    defaultSelected,
    selected,
    onChange
  });

  const normalizedColor = useColor(color);
  const selectedBgColor = useMemo(
    () => getColorWithAlpha(normalizedColor, 0.3),
    [normalizedColor]
  );

  return (
    <Button
      className={cn('JinniToggleButton', size, { isSelected }, className)}
      onClick={handleChange}
      variant="outlined"
      color="on-surface-variant"
      size={size}
      style={{
        '--selected-text-color': color,
        '--selected-background-color': selectedBgColor,
        ...style
      }}
      aria-pressed={isSelected}
      {...(rest as ButtonProps<T>)}
    />
  );
};

export default ToggleButton;
