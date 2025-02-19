import './Switch.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import useCheck from '@/hooks/useCheck';
import { ColorType } from '@/types/color';
import { lighten } from '@/utils/colorLuminance';

export type SwitchProps<T extends AsType = 'input'> = Omit<
  DefaultComponentProps<T>,
  'onChange' | 'size'
> & {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  color?: ColorType;
  size?: 'sm' | 'md' | 'lg';
};

const Switch = <T extends AsType = 'input'>(props: SwitchProps<T>) => {
  const {
    defaultChecked,
    checked,
    onChange,
    disabled,
    color = 'primary',
    size = 'md',
    className,
    style,
    as: Component = 'input',
    ...rest
  } = props;
  const { isChecked, handleChange } = useCheck({
    defaultChecked,
    checked,
    onChange
  });
  const switchStyle = useStyle(style);
  const colorStyle = useStyle({
    '--checked-color': color,
    '--checked-disabled-color': lighten(color, 0.5)
  });

  return (
    <span
      className={cn('JinniSwitch', { disabled }, size, className)}
      style={switchStyle}
    >
      <span
        className={cn('JinniSwitchTrack', { isChecked, disabled })}
        style={colorStyle}
      />
      <span
        className={cn('JinniSwitchThumbWrapper', { isChecked }, size)}
        style={colorStyle}
      >
        <span
          className={cn('JinniSwitchThumb', { isChecked, disabled })}
          style={colorStyle}
        />
      </span>
      <Component
        className="JinniSwitchInput"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
    </span>
  );
};

export default Switch;
