import './Select.scss';
import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { Menu, MenuProps } from '@/components/navigation/Menu';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { transformToArray } from '@/utils/transformToArray';
import { useSelectedValue, useSelectedOption } from './Select.hooks';
import SelectContext from './Select.contexts';
import { ANCHOR_ORIGIN, MENU_ORIGIN } from './Select.constants';
import { OptionValueType } from './Option';

export type OptionType = { value: OptionValueType; label: React.ReactNode };
export type SelectedOptionType<Multiple extends boolean> = Multiple extends true
  ? Array<OptionType>
  : OptionType;

export type SelectProps<
  Multiple extends boolean = false,
  T extends AsType = 'div'
> = Omit<InputBaseProps<T>, 'defaultValue'> & {
  name?: string;
  children: React.ReactNode;
  placeholder?: string;
  multiple?: Multiple;
  defaultValue?: Multiple extends true ? OptionValueType[] : OptionValueType;
  value?: Multiple extends true ? OptionValueType[] : OptionValueType;
  onChange?: (
    event: Event | React.SyntheticEvent,
    value: Multiple extends true ? OptionValueType[] : OptionValueType
  ) => void;
  renderValue?: (
    selectedOption: SelectedOptionType<Multiple>
  ) => React.ReactNode;
  required?: boolean;
  MenuProps?: Partial<MenuProps>;
};

const Select = <Multiple extends boolean = false, T extends AsType = 'div'>(
  props: SelectProps<Multiple, T>
) => {
  const {
    name,
    children,
    placeholder,
    multiple,
    defaultValue,
    value,
    onChange,
    renderValue = (selectedOption) =>
      Array.isArray(selectedOption)
        ? selectedOption.map((option) => option.label).join(', ')
        : selectedOption.label,
    required,
    MenuProps,
    startAdornment,
    endAdornment = (
      <ArrowDownIcon className="arrow-down" color="gray-600" size={16} />
    ),
    variant,
    size,
    color,
    focusedColor,
    disabled,
    disableHoverEffect,
    disableFocusEffect,
    fullWidth,
    focused,
    className,
    ...rest
  } = props;
  const inputBaseElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { selectedValue, handleChange } = useSelectedValue<Multiple>({
    defaultValue,
    value,
    onChange,
    multiple
  });
  const selectedOption = useSelectedOption({
    children,
    multiple,
    selectedValue
  });
  const notSelected =
    selectedValue === undefined || (multiple && selectedValue.length === 0);

  const openMenu = () => {
    if (disabled) return;
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{ multiple, selectedValue, handleChange, closeMenu }}
    >
      <InputBase
        ref={inputBaseElRef}
        className={cn(
          'JinniSelect',
          { open, placeholder: notSelected },
          className
        )}
        onClick={openMenu}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        variant={variant}
        size={size}
        color={color}
        focusedColor={focusedColor}
        disabled={disabled}
        disableHoverEffect={disableHoverEffect}
        disableFocusEffect={disableFocusEffect}
        fullWidth={fullWidth}
        focused={focused || open}
        {...rest}
      >
        {notSelected ? placeholder : renderValue(selectedOption)}
        {
          <select
            name={name}
            value={selectedValue.map(String)}
            onChange={() => {}}
            multiple={multiple}
            required={required}
            tabIndex={-1}
          >
            <option value="" disabled hidden></option>
            {transformToArray(selectedValue).map((val) => (
              <option key={val} value={val} />
            ))}
          </select>
        }
      </InputBase>
      <Menu
        className={cn('JinniSelectMenu', MenuProps?.className)}
        anchorElRef={inputBaseElRef}
        open={open}
        onClose={closeMenu}
        anchorOrigin={ANCHOR_ORIGIN}
        menuOrigin={MENU_ORIGIN}
        {...MenuProps}
      >
        {children}
      </Menu>
    </SelectContext.Provider>
  );
};

export default Select;
