import './Switch.scss';
import { useMemo } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useCheck } from './Switch.hooks';
import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';
import { toRgbaObject } from '@/utils/colorFormat';
import { useRipple, UseRippleProps } from '@/hooks/useRipple';
import { useLabelContext } from '@/components/data-entry/Label';
import useJinni from '@/hooks/useJinni';

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
  const { theme } = useJinni();
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
    rippleColor = theme === 'light' ? 'black' : 'white',
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

  const normalizedCheckedColor = useColor(color);
  const { checkedHoverColor, checkedFocusedColor } = useMemo(() => {
    const { r, g, b } = toRgbaObject(normalizedCheckedColor);
    return {
      checkedHoverColor: `rgba(${r}, ${g}, ${b}, var(--jinni-overlay-alpha-1))`,
      checkedFocusedColor: `rgba(${r}, ${g}, ${b}, var(--jinni-overlay-alpha-17))`
    };
  }, [normalizedCheckedColor]);
  const newStyle = useStyle({
    '--checked-color': color,
    '--checked-hover-color': checkedHoverColor,
    '--checked-focused-color': checkedFocusedColor,
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
        className={cn(
          'JinniSwitchThumbWrapper',
          {
            isChecked,
            [size]: isKeywordSize
          },
          theme
        )}
      >
        <RippleContainer />
        <span
          className={cn('JinniSwitchThumb', { isChecked, disabled }, theme)}
        />
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
