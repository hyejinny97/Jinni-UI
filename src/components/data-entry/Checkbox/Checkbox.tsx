import './Checkbox.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { CheckboxIcon } from '@/components/icons/CheckboxIcon';
import { CheckboxOutlineBlankIcon } from '@/components/icons/CheckboxOutlineBlankIcon';
import { IndeterminateCheckIcon } from '@/components/icons/IndeterminateCheckIcon';
import useCheck from '@/hooks/useCheck';
import { ColorType } from '@/types/color';
import { useRipple } from '@/hooks/useRipple';

export type CheckboxProps<T extends AsType = 'input'> = Omit<
  DefaultComponentProps<T>,
  'onChange' | 'size'
> & {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  indeterminate?: boolean;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
  disabled?: boolean;
  color?: ColorType;
  size?: 'sm' | 'md' | 'lg' | string | number;
  disableRipple?: boolean;
};

const Checkbox = <T extends AsType = 'input'>(props: CheckboxProps<T>) => {
  const {
    defaultChecked,
    checked,
    onChange,
    indeterminate,
    icon = <CheckboxOutlineBlankIcon />,
    checkedIcon = <CheckboxIcon />,
    indeterminateIcon = <IndeterminateCheckIcon />,
    disabled,
    color = 'primary',
    size = 'md',
    disableRipple,
    className,
    style,
    as: Component = 'input',
    ...rest
  } = props;
  const isKeywordSize = ['sm', 'md', 'lg'].some((val) => val === size);
  const { rippleTargetRef, RippleContainer } = useRipple({
    rippleColor: 'black',
    rippleStartLocation: 'center',
    disableRipple
  });
  const { isChecked, handleChange } = useCheck({
    defaultChecked,
    checked,
    onChange
  });
  const newStyle = useStyle({
    '--checked-color': color,
    ...(!isKeywordSize && { '--icon-size': size }),
    ...style
  });

  let displayedIcon;
  if (indeterminate) {
    displayedIcon = indeterminateIcon;
  } else {
    displayedIcon = isChecked ? checkedIcon : icon;
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
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
      {displayedIcon}
    </span>
  );
};

export default Checkbox;
