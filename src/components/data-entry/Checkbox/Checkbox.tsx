import './Checkbox.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { CheckboxIcon } from '@/components/icons/CheckboxIcon';
import { CheckboxOutlineBlankIcon } from '@/components/icons/CheckboxOutlineBlankIcon';
import { IndeterminateCheckIcon } from '@/components/icons/IndeterminateCheckIcon';
import useCheck from './Checkbox.hooks';
import { ColorType } from '@/types/color';
import { useRipple, UseRippleProps } from '@/hooks/useRipple';
import { useLabelContext } from '@/components/data-entry/Label';
import useColor from '@/hooks/useColor';
import { toRgbaObject } from '@/utils/colorFormat';
import { useCheckboxGroupContext } from '@/components/data-entry/CheckboxGroup';

export type CheckboxProps<T extends AsType = 'input'> = Omit<
  DefaultComponentProps<T>,
  'onChange' | 'size'
> &
  UseRippleProps & {
    name?: string;
    value?: string | number;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    indeterminate?: boolean;
    icon?: React.ReactNode;
    checkedIcon?: React.ReactNode;
    indeterminateIcon?: React.ReactNode;
    disabled?: boolean;
    required?: boolean;
    color?: ColorType;
    size?: 'sm' | 'md' | 'lg' | string;
  };

const Checkbox = <T extends AsType = 'input'>(props: CheckboxProps<T>) => {
  const labelContext = useLabelContext();
  const checkboxGroupContext = useCheckboxGroupContext();
  const {
    name = checkboxGroupContext?.name,
    value,
    defaultChecked = false,
    checked,
    onChange,
    indeterminate,
    icon = checkboxGroupContext?.icon || <CheckboxOutlineBlankIcon />,
    checkedIcon = checkboxGroupContext?.checkedIcon || <CheckboxIcon />,
    indeterminateIcon = <IndeterminateCheckIcon />,
    disabled = labelContext?.disabled,
    required = labelContext?.required,
    color = checkboxGroupContext?.color || 'primary',
    size = labelContext?.size || 'md',
    rippleColor = checkboxGroupContext?.rippleColor || 'black',
    rippleStartLocation = checkboxGroupContext?.rippleStartLocation || 'center',
    disableRipple = checkboxGroupContext?.disableRipple,
    className,
    style,
    as: Component = 'input',
    ...rest
  } = props;
  const isKeywordSize = ['sm', 'md', 'lg'].some((val) => val === size);
  const { rippleTargetRef, RippleContainer } = useRipple({
    rippleColor,
    rippleStartLocation,
    disableRipple
  });
  const { isChecked, handleChange } = useCheck({
    defaultChecked,
    checked,
    onChange,
    value
  });
  const computedColor = useColor(color);
  const { r, g, b } = toRgbaObject(computedColor);
  const newStyle = useStyle({
    '--checked-color': color,
    '--overlay-color': `rgba(${r}, ${g}, ${b}, 0.05)`,
    ...(!isKeywordSize && { '--icon-size': size }),
    ...style
  });

  let displayedIcon = isChecked ? checkedIcon : icon;
  if (indeterminate) {
    displayedIcon = indeterminateIcon;
  }

  return (
    <span
      ref={rippleTargetRef}
      className={cn(
        'JinniCheckbox',
        { isChecked, indeterminate, disabled, [size]: isKeywordSize },
        className
      )}
      style={newStyle}
    >
      <RippleContainer />
      <Component
        className="JinniCheckboxInput"
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        {...rest}
      />
      {displayedIcon}
    </span>
  );
};

export default Checkbox;
