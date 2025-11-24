import './Radio.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { RadioUncheckedIcon } from '@/components/icons/RadioUncheckedIcon';
import { RadioCheckedIcon } from '@/components/icons/RadioCheckedIcon';
import { ColorType } from '@/types/color';
import { useRipple, UseRippleProps } from '@/hooks/useRipple';
import { useLabelContext } from '@/components/data-entry/Label';
import useColor from '@/hooks/useColor';
import { toRgbaObject } from '@/utils/colorFormat';
import { useRadioGroupContext } from '@/components/data-entry/RadioGroup';
import { useCheck } from './Radio.hooks';

export type RadioProps<T extends AsType = 'input'> = Omit<
  DefaultComponentProps<T>,
  'onChange' | 'size'
> &
  UseRippleProps & {
    name?: string;
    value?: string;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    checkedIcon?: React.ReactNode;
    disabled?: boolean;
    required?: boolean;
    color?: ColorType;
    size?: 'sm' | 'md' | 'lg' | string;
  };

const Radio = <T extends AsType = 'input'>(props: RadioProps<T>) => {
  const labelContext = useLabelContext();
  const radioGroupContext = useRadioGroupContext();
  const {
    name = radioGroupContext?.name,
    value,
    checked,
    onChange,
    icon = radioGroupContext?.icon || <RadioUncheckedIcon />,
    checkedIcon = radioGroupContext?.checkedIcon || <RadioCheckedIcon />,
    disabled = labelContext?.disabled,
    required = labelContext?.required,
    color = radioGroupContext?.color || 'primary',
    size = labelContext?.size || 'md',
    rippleColor = radioGroupContext?.rippleColor || 'black',
    rippleStartLocation = radioGroupContext?.rippleStartLocation || 'center',
    disableRipple = radioGroupContext?.disableRipple,
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
  const { isChecked, handleChange } = useCheck({ checked, onChange, value });
  const computedColor = useColor(color);
  const { r, g, b } = toRgbaObject(computedColor);
  const newStyle = useStyle({
    '--checked-color': color,
    '--overlay-color': `rgba(${r}, ${g}, ${b}, 0.05)`,
    ...(!isKeywordSize && { '--icon-size': size }),
    ...style
  });

  return (
    <span
      ref={rippleTargetRef}
      className={cn(
        'JinniRadio',
        { isChecked, disabled, [size]: isKeywordSize },
        className
      )}
      style={newStyle}
    >
      <RippleContainer />
      <Component
        className="JinniRadioInput"
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        {...rest}
      />
      {isChecked ? checkedIcon : icon}
    </span>
  );
};

export default Radio;
