import './ColorPicker.scss';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  ColorField,
  ColorFieldProps
} from '@/components/data-entry/ColorField';
import { ColorBox, ColorBoxProps } from '@/components/data-entry/ColorBox';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import { ColorType } from '@/types/color';
import { RgbaObject } from '@/utils/colorFormat';
import { useColor } from './ColorPicker.hooks';

export type ColorPickerProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> & {
  name?: string;
  defaultValue?: ColorType;
  value?: ColorType;
  onChange?: (event: Event | React.SyntheticEvent, value: RgbaObject) => void;
  disabled?: boolean;
  renderColorField?: (colorFieldProps: ColorFieldProps) => React.ReactNode;
  renderColorBox?: (colorBoxProps: ColorBoxProps) => React.ReactNode;
  PopoverProps?: Partial<PopoverProps>;
};

const ColorPicker = <T extends AsType = 'div'>(props: ColorPickerProps<T>) => {
  const {
    name,
    defaultValue = 'primary',
    value,
    onChange,
    disabled = false,
    renderColorField = (colorFieldProps: ColorFieldProps) => (
      <ColorField {...colorFieldProps} />
    ),
    renderColorBox = (colorBoxProps: ColorBoxProps) => (
      <ColorBox {...colorBoxProps} />
    ),
    PopoverProps,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const anchorElRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { colorValue, handleChange } = useColor({
    defaultValue,
    value,
    onChange
  });
  const newStyle = useStyle(style);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Component
      className={cn('JinniColorPicker', className)}
      style={newStyle}
      {...rest}
    >
      <input
        name={name}
        value={colorValue}
        disabled={disabled}
        hidden
        readOnly
      />
      {renderColorField({
        ref: anchorElRef,
        onClick: handleOpen,
        value: colorValue,
        disabled
      })}
      {!disabled && (
        <Popover
          anchorElRef={anchorElRef}
          open={open}
          onClose={handleClose}
          {...PopoverProps}
          style={{ marginTop: '3px', ...PopoverProps?.style }}
          PopoverContentProps={{
            style: { padding: 0 },
            ...PopoverProps?.PopoverContentProps
          }}
        >
          {renderColorBox({
            value: colorValue,
            onChange: handleChange
          })}
        </Popover>
      )}
    </Component>
  );
};

export default ColorPicker;
