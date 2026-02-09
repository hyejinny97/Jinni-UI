import './Select.scss';
import React, { useRef, useState, useCallback } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { Menu, MenuProps, CloseReason } from '@/components/navigation/Menu';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { transformToArray } from '@/utils/transformToArray';
import { useSelectedValue, useSelectedOption } from './Select.hooks';
import SelectContext from './Select.contexts';
import { ANCHOR_ORIGIN, MENU_ORIGIN } from './Select.constants';
import { OptionValueType } from './Option';
import { useLabelContext } from '@/components/data-entry/Label';

export type SelectedOptionType = Array<{
  value: OptionValueType;
  label: React.ReactNode;
}>;

export type SelectProps<
  Multiple extends boolean = false,
  T extends AsType = 'div'
> = Omit<InputBaseProps<T>, 'defaultValue' | 'value' | 'onChange'> & {
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
  MenuProps?: Partial<MenuProps>;
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
      <ArrowDownIcon className="arrow-down" color="gray-600" size={16} />
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
    selectedValue
  });
  const notSelected = selectedValue.length === 0;
  const {
    className: menuClassName,
    onClose: menuOnClose,
    MenuListProps: menuListProps,
    ...restMenuProps
  } = (MenuProps || {}) as Partial<MenuProps>;

  const openMenu = () => {
    if (disabled) return;
    setOpen(true);
  };
  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);
  const handleMenuClose = useCallback(
    (event: MouseEvent | KeyboardEvent, reason: CloseReason) => {
      closeMenu();
      menuOnClose?.(event, reason);
    },
    [closeMenu, menuOnClose]
  );

  return (
    <SelectContext.Provider
      value={{ multiple, selectedValue, handleChange, closeMenu }}
    >
      <InputBase
        role="combobox"
        ref={inputBaseElRef}
        className={cn(
          'JinniSelect',
          { open, placeholder: notSelected },
          className
        )}
        onClick={openMenu}
        onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && openMenu()}
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
        {...rest}
      >
        {notSelected ? placeholder : renderValue(selectedOption)}
        {
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
        }
      </InputBase>
      <Menu
        className={cn('JinniSelectMenu', menuClassName)}
        anchorElRef={inputBaseElRef}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={ANCHOR_ORIGIN}
        menuOrigin={MENU_ORIGIN}
        MenuListProps={{ role: 'listbox', ...menuListProps }}
        {...restMenuProps}
      >
        {children}
      </Menu>
    </SelectContext.Provider>
  );
};

export default Select;
