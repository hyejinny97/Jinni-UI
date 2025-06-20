import './Select.scss';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { Menu, MenuProps } from '@/components/navigation/Menu';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { transformToArray } from '@/utils/transformToArray';
import { useSelectValue } from './Select.hooks';
import SelectContext from './Select.contexts';
import { ANCHOR_ORIGIN, MENU_ORIGIN } from './Select.constants';

export type SelectProps<
  Multiple extends boolean = false,
  T extends AsType = 'div'
> = Omit<DefaultComponentProps<T>, 'children' | 'defaultValue' | 'onChange'> & {
  name?: string;
  children: Array<JSX.Element>;
  placeholder?: string;
  InputBaseProps?: InputBaseProps;
  MenuProps?: Partial<MenuProps>;
  multiple?: Multiple;
  defaultValue?: Multiple extends true ? string[] : string;
  value?: Multiple extends true ? string[] : string;
  onChange?: (
    event: Event | React.SyntheticEvent,
    value: Multiple extends true ? string[] : string
  ) => void;
  renderValue?: (
    value: Multiple extends true ? string[] : string
  ) => React.ReactNode;
  disabled?: boolean;
};

const DefaultEndAdornment = () => <ArrowDownIcon color="gray-600" size={16} />;

const Select = <Multiple extends boolean = false, T extends AsType = 'div'>(
  props: SelectProps<Multiple, T>
) => {
  const {
    name,
    children,
    placeholder = '',
    InputBaseProps,
    MenuProps,
    multiple = false as Multiple,
    defaultValue,
    value,
    onChange,
    renderValue = (value) => (Array.isArray(value) ? value.join(', ') : value),
    disabled = false,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const inputBaseElRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { selectValue, handleChange } = useSelectValue<Multiple>({
    defaultValue,
    value,
    onChange,
    setOpenMenu,
    multiple
  });
  const notSelected =
    selectValue === undefined || (multiple && selectValue.length === 0);
  const newStyle = useStyle(style);

  const handleInputClick = () => {
    if (disabled) return;
    setOpenMenu((prev) => !prev);
  };
  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <SelectContext.Provider value={{ selectValue, handleChange, multiple }}>
      <Component
        className={cn('JinniSelect', { openMenu }, className)}
        style={newStyle}
        {...rest}
      >
        <InputBase
          ref={inputBaseElRef}
          onClick={handleInputClick}
          focused={openMenu}
          endAdornment={InputBaseProps?.endAdornment || <DefaultEndAdornment />}
          disabled={disabled}
          {...InputBaseProps}
        >
          {notSelected ? (
            <div className="JinniPlaceholder">{placeholder}</div>
          ) : (
            <div className="JinniInputValue">{renderValue(selectValue)}</div>
          )}
          {transformToArray(selectValue).map((value) => (
            <input
              key={value}
              type="text"
              name={name}
              value={value}
              readOnly
              hidden
            />
          ))}
        </InputBase>
        <Menu
          className={cn('JinniSelectMenu', MenuProps?.className)}
          anchorElRef={inputBaseElRef}
          open={openMenu}
          onClose={handleMenuClose}
          anchorOrigin={ANCHOR_ORIGIN}
          menuOrigin={MENU_ORIGIN}
          {...MenuProps}
        >
          {children}
        </Menu>
      </Component>
    </SelectContext.Provider>
  );
};

export default Select;
