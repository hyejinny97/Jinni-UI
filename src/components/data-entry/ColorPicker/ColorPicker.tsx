import './ColorPicker.scss';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorField, ColorFieldProps } from './ColorField';
import { ColorBox, ColorBoxProps } from './ColorBox';
import {
  Popover,
  PopoverProps,
  CloseReason
} from '@/components/data-display/Popover';
import { useColorValue } from './ColorPicker.hooks';
import { ColorValueType, HSBObject } from './ColorPicker.types';
import { useLabelContext } from '@/components/data-entry/Label';
import { isRgbObject, isHsbObject } from './ColorPicker.utils';

export type ColorPickerProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> & {
  name?: string;
  defaultValue?: ColorValueType;
  value?: ColorValueType;
  onChange?: (event: Event | React.SyntheticEvent, value: HSBObject) => void;
  renderColorField?: (colorFieldProps: ColorFieldProps) => React.ReactNode;
  renderColorBox?: (colorBoxProps: ColorBoxProps) => React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  PopoverProps?: Partial<PopoverProps>;
};

const ColorPicker = <T extends AsType = 'div'>(props: ColorPickerProps<T>) => {
  const labelContext = useLabelContext();
  const {
    name,
    defaultValue = 'primary',
    value,
    onChange,
    disabled = labelContext?.disabled,
    renderColorField = (colorFieldProps: ColorFieldProps) => (
      <ColorField {...colorFieldProps} />
    ),
    renderColorBox = (colorBoxProps: ColorBoxProps) => (
      <ColorBox {...colorBoxProps} />
    ),
    PopoverProps,
    required = labelContext?.required,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const anchorElRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { colorValue, handleChange } = useColorValue({
    defaultValue,
    value,
    onChange
  });
  const newStyle = useStyle(style);
  const {
    onClose: popoverOnClose,
    BoxProps: popoverBoxProps,
    style: popoverStyle,
    ...restPopoverProps
  } = (PopoverProps || {}) as Partial<PopoverProps>;

  const openPopover = () => {
    if (disabled) return;
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };
  const handlePopoverClose = (
    event: MouseEvent | KeyboardEvent,
    reason: CloseReason
  ) => {
    closePopover();
    popoverOnClose?.(event, reason);
  };

  return (
    <Component
      className={cn('JinniColorPicker', { disabled }, className)}
      style={newStyle}
      {...rest}
    >
      <input
        name={name}
        value={
          isRgbObject(colorValue) || isHsbObject(colorValue)
            ? JSON.stringify(colorValue)
            : colorValue
        }
        required={required}
        disabled={disabled}
        hidden
        readOnly
      />
      {renderColorField({
        ref: anchorElRef,
        onClick: openPopover,
        value: colorValue,
        disabled
      })}
      <Popover
        anchorElRef={anchorElRef}
        open={open}
        onClose={handlePopoverClose}
        style={{ marginTop: '3px', ...popoverStyle }}
        BoxProps={{
          style: { padding: 0 },
          ...popoverBoxProps
        }}
        {...restPopoverProps}
      >
        {renderColorBox({
          value: colorValue,
          onChange: handleChange
        })}
      </Popover>
    </Component>
  );
};

export default ColorPicker;
