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
import { useLabelContext } from '@/components/Label';
import { useCheckboxGroupContext } from '@/components/CheckboxGroup';
import useJinni from '@/hooks/useJinni';
import useOverlay from '@/hooks/useOverlay';

export type CheckboxProps<T extends AsType = 'input'> = Omit<
  DefaultComponentProps<T>,
  'onChange' | 'size'
> &
  UseRippleProps & {
    name?: string;
    value?: string;
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
  const { theme } = useJinni();
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
    rippleColor = checkboxGroupContext?.rippleColor ||
      (theme === 'light' ? 'black' : 'white'),
    rippleStartLocation = checkboxGroupContext?.rippleStartLocation || 'center',
    disableRipple = checkboxGroupContext?.disableRipple,
    className,
    style,
    as,
    ...rest
  } = props;
  const Component = (as ?? 'input') as React.ElementType;
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
  const [hoverOverlay, focusOverlay] = useOverlay([
    { color, alpha: 1 },
    { color, alpha: 17 }
  ]);
  const newStyle = useStyle({
    '--checked-color': color,
    '--hover-overlay': hoverOverlay,
    '--focus-overlay': focusOverlay,
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
