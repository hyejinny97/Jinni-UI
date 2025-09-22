import './InputBase.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';
import { getColorStyle } from './InputBase.utils';
import useColor from '@/hooks/useColor';

export type RootInputBaseProps = {
  children?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: 'outlined' | 'filled' | 'underlined' | 'borderless';
  size?: 'sm' | 'md' | 'lg';
  color?: ColorType;
  focusedColor?: ColorType;
  disabled?: boolean;
  disableHoverEffect?: boolean;
  disableFocusEffect?: boolean;
  fullWidth?: boolean;
  focused?: boolean;
};

export type InputBaseProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & RootInputBaseProps;

const InputBase = forwardRef(
  <T extends AsType = 'div'>(
    props: InputBaseProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      startAdornment,
      endAdornment,
      variant = 'outlined',
      size = 'md',
      color = 'gray-400',
      focusedColor = 'primary',
      disabled = false,
      disableHoverEffect = disabled,
      disableFocusEffect = disabled,
      fullWidth = false,
      focused = false,
      className,
      style,
      as: Component = 'div',
      ...rest
    } = props;
    const [normalizedColor, normalizedFocusedColor] = useColor([
      color,
      focusedColor
    ]);
    const colorStyle = getColorStyle({
      variant,
      color: normalizedColor,
      focusedColor: normalizedFocusedColor
    });
    const newStyle = useStyle({
      ...colorStyle,
      ...style
    });

    return (
      <Component
        ref={ref}
        className={cn(
          'JinniInputBase',
          {
            disabled,
            disableHoverEffect,
            disableFocusEffect,
            fullWidth,
            focused
          },
          variant,
          size,
          className
        )}
        style={newStyle}
        tabIndex={0}
        {...rest}
      >
        {startAdornment && (
          <span className="JinniInputBaseAdornment start">
            {startAdornment}
          </span>
        )}
        <div className="JinniInputBaseContent">{children}</div>
        {endAdornment && (
          <span className="JinniInputBaseAdornment end">{endAdornment}</span>
        )}
      </Component>
    );
  }
);

export default InputBase;
