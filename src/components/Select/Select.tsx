'use client';

import './Select.scss';
import React, { useRef, useState, useCallback } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import InputBase, { InputBaseProps } from '@/components/InputBase';
import Menu, { MenuProps } from '@/components/Menu';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { transformToArray } from '@/utils/transformToArray';
import { useSelectedValue, useSelectedOption } from './Select.hooks';
import SelectContext from './Select.contexts';
import { ANCHOR_ORIGIN, MENU_ORIGIN } from './Select.constants';
import { OptionValueType } from '../Option';
import { useLabelContext } from '@/components/Label';

export type SelectedOptionType = Array<{
  value: OptionValueType;
  label: React.ReactNode;
}>;

export type SelectProps<
  Multiple extends boolean = false,
  T extends AsType = 'div'
> = Omit<
  InputBaseProps<T>,
  'defaultValue' | 'value' | 'onChange' | 'children'
> & {
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
  renderValue?: (selectedOption: SelectedOptionType) => React.ReactNode;
  MenuProps?: Omit<
    MenuProps,
    'open' | 'onClose' | 'anchorReference' | 'anchorElRef' | 'anchorPosition'
  >;
  required?: boolean;
};

const Select = <Multiple extends boolean = false, T extends AsType = 'div'>(
  props: SelectProps<Multiple, T>
) => {
  const labelContext = useLabelContext();
  const {
    name,
    children,
    placeholder,
    multiple,
    defaultValue,
    value,
    onChange,
    renderValue = (selectedOption) =>
      selectedOption.map((option) => option.label).join(', '),
    MenuProps,
    startAdornment,
    endAdornment = (
      <ArrowDownIcon
        className="arrow-down"
        color="on-surface-variant"
        size={16}
      />
    ),
    variant,
    size = (labelContext?.size || 'md') as InputBaseProps['size'],
    color,
    focusedColor,
    disabled = labelContext?.disabled,
    disableHoverEffect,
    disableFocusEffect,
    fullWidth,
    focused,
    required = labelContext?.required,
    className,
    ...rest
  } = props;
  const inputBaseElRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { selectedValue, handleChange } = useSelectedValue<Multiple>({
    defaultValue,
    value,
    onChange,
    multiple
  });
  const selectedOption = useSelectedOption({
    children,
    selectedValue
  });
  const notSelected = selectedValue.length === 0;
  const {
    className: menuClassName,
    MenuListProps: menuListProps,
    ...restMenuProps
  } = MenuProps || {};

  const openMenu = () => {
    if (disabled) return;
    setOpen(true);
  };
  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <SelectContext value={{ multiple, selectedValue, handleChange, closeMenu }}>
      <InputBase
        role="combobox"
        ref={inputBaseElRef}
        className={cn(
          'JinniSelect',
          { open, placeholder: notSelected },
          className
        )}
        onClick={openMenu}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            openMenu();
          }
        }}
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
        tabIndex={0}
        aria-expanded={open}
        aria-haspopup="listbox"
        {...(rest as InputBaseProps<T>)}
      >
        {notSelected ? placeholder : renderValue(selectedOption)}
        <select
          name={name}
          value={
            multiple ? selectedValue.map(String) : String(selectedValue[0])
          }
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
      </InputBase>
      <Menu
        className={cn('JinniSelectMenu', menuClassName)}
        anchorReference="anchorEl"
        anchorElRef={inputBaseElRef}
        anchorOrigin={ANCHOR_ORIGIN}
        menuOrigin={MENU_ORIGIN}
        open={open}
        onClose={closeMenu}
        MenuListProps={{ role: 'listbox', ...menuListProps }}
        {...restMenuProps}
      >
        {children}
      </Menu>
    </SelectContext>
  );
};

export default Select;
