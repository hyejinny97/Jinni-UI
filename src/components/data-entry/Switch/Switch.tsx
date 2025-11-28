import './Switch.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useCheck } from './Switch.hooks';
import { ColorType } from '@/types/color';
import { lighten } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';
import { toRgbaObject } from '@/utils/colorFormat';
import { useRipple, UseRippleProps } from '@/hooks/useRipple';
import { useLabelContext } from '@/components/data-entry/Label';

export type SwitchProps<T extends AsType = 'input'> = Omit<
  DefaultComponentProps<T>,
  'onChange' | 'size'
> &
  UseRippleProps & {
    name?: string;
    value?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    required?: boolean;
    color?: ColorType;
    size?: 'sm' | 'md' | 'lg' | string;
  };

const Switch = <T extends AsType = 'input'>(props: SwitchProps<T>) => {
  const labelContext = useLabelContext();
  const {
    name,
    value,
    defaultChecked = false,
    checked,
    onChange,
    disabled = labelContext?.disabled,
    required = labelContext?.required,
    color = 'primary',
    size = labelContext?.size || 'md',
    rippleColor = 'black',
    rippleStartLocation = 'center',
    disableRipple,
    className,
    style,
    as: Component = 'input',
    ...rest
  } = props;
  const isKeywordSize = ['sm', 'md', 'lg'].some((val) => val === size);
  const { rippleTargetRef, rippleTriggerRef, RippleContainer } = useRipple({
    rippleColor,
    rippleStartLocation,
    disableRipple
  });
  const { isChecked, handleChange } = useCheck({
    defaultChecked,
    checked,
    onChange
  });
  const computedColor = useColor(color);
  const { r, g, b } = toRgbaObject(computedColor);
  const newStyle = useStyle({
    '--checked-color': color,
    '--checked-disabled-color': lighten(computedColor, 0.5),
    '--overlay-color': `rgba(${r}, ${g}, ${b}, 0.05)`,
    ...(!isKeywordSize && { '--switch-size': size }),
    ...style
  });

  return (
    <span
      className={cn(
        'JinniSwitch',
        { disabled, [size]: isKeywordSize },
        className
      )}
      style={newStyle}
    >
      <span className={cn('JinniSwitchTrack', { isChecked, disabled })} />
      <span
        ref={rippleTargetRef}
        className={cn('JinniSwitchThumbWrapper', {
          isChecked,
          [size]: isKeywordSize
        })}
      >
        <RippleContainer />
        <span className={cn('JinniSwitchThumb', { isChecked, disabled })} />
      </span>
      <Component
        ref={rippleTriggerRef}
        className="JinniSwitchInput"
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        {...rest}
      />
    </span>
  );
};

export default Switch;
