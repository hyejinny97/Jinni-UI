import './Radio.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { RadioUncheckedIcon } from '@/components/icons/RadioUncheckedIcon';
import { RadioCheckedIcon } from '@/components/icons/RadioCheckedIcon';
import useCheck from '@/hooks/useCheck';
import { ColorType } from '@/types/color';
import { useRipple } from '@/hooks/useRipple';

export type RadioProps<T extends AsType = 'input'> = Omit<
  DefaultComponentProps<T>,
  'onChange' | 'size'
> & {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  disabled?: boolean;
  color?: ColorType;
  size?: 'sm' | 'md' | 'lg' | string | number;
  disableRipple?: boolean;
};

const Radio = <T extends AsType = 'input'>(props: RadioProps<T>) => {
  const {
    defaultChecked,
    checked,
    onChange,
    icon = <RadioUncheckedIcon />,
    checkedIcon = <RadioCheckedIcon />,
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
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
      {isChecked ? checkedIcon : icon}
    </span>
  );
};

export default Radio;
