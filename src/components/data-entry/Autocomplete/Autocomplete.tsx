import './Autocomplete.scss';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { Menu, MenuProps } from '@/components/navigation/Menu';
import { Chip } from '@/components/data-display/Chip';
import {
  useValue,
  useInputValue,
  useBackgroundClick
} from './Autocomplete.hooks';
import AutocompleteContext from './Autocomplete.contexts';
import AutocompleteOption from './AutocompleteOption';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { ButtonBase } from '@/components/general/ButtonBase';
import { CancelIcon } from '@/components/icons/CancelIcon';

export type AutocompleteProps<
  Multiple extends boolean = false,
  T extends AsType = 'div'
> = Omit<DefaultComponentProps<T>, 'children' | 'defaultValue' | 'onChange'> & {
  name?: string;
  children: Array<JSX.Element>;
  mode?: 'strict' | 'free';
  placeholder?: string;
  InputBaseProps?: InputBaseProps;
  MenuProps?: MenuProps;
  multiple?: Multiple;
  defaultValue?: Multiple extends true ? string[] : string;
  value?: Multiple extends true ? string[] : string;
  onChange?: (
    event: Event | React.SyntheticEvent,
    value: Multiple extends true ? string[] : string
  ) => void;
  inputValue?: string;
  onInputChange?: (
    event: Event | React.SyntheticEvent,
    inputValue: string
  ) => void;
  renderValue?: (
    value: Multiple extends true ? string[] : string
  ) => React.ReactNode;
  disabled?: boolean;
};

const Autocomplete = <
  Multiple extends boolean = false,
  T extends AsType = 'div'
>(
  props: AutocompleteProps<Multiple, T>
) => {
  const {
    name,
    children,
    mode = 'strict',
    placeholder = '',
    InputBaseProps,
    MenuProps,
    multiple = false as Multiple,
    defaultValue,
    value,
    onChange,
    inputValue,
    onInputChange,
    renderValue,
    disabled = false,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const inputBaseElRef = useRef<HTMLElement>(null);
  const inputElRef = useRef<HTMLInputElement>(null);
  const menuListElRef = useRef<HTMLUListElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [filterMenuOption, setFilterMenuOption] = useState(false);
  const { autocompleteValue, handleValueChange, initValue } = useValue({
    defaultValue,
    value,
    onChange,
    setOpenMenu,
    multiple
  });
  const { autocompleteInputValue, handleInputValueChange, initInputValue } =
    useInputValue({
      inputValue,
      defaultInputValue:
        !multiple && !Array.isArray(autocompleteValue)
          ? autocompleteValue
          : undefined,
      onInputChange
    });
  useBackgroundClick({
    inputBaseElRef,
    menuListElRef,
    mode,
    multiple,
    autocompleteValue,
    handleInputValueChange,
    initInputValue
  });
  const newStyle = useStyle(style);
  const showDeleteButton =
    autocompleteInputValue || (multiple && autocompleteValue.length !== 0);

  const handleInputClick = () => {
    if (disabled) return;
    setOpenMenu(true);
    setFilterMenuOption(false);
    if (inputElRef.current) inputElRef.current.focus();
  };
  const handleMenuClose = () => {
    setOpenMenu(false);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && mode === 'free') {
      event.preventDefault();
      handleValueChange(event, autocompleteInputValue);
      if (multiple) initInputValue(event);
    }
  };
  const handleClickDeleteButton = (event: MouseEvent) => {
    initInputValue(event);
    initValue(event);
  };

  let renderAutocompleteValue = renderValue;
  if (!renderValue && multiple) {
    renderAutocompleteValue = ((values: Array<string>) => (
      <>
        {values.map((value) => (
          <Chip
            key={value}
            variant="subtle-filled"
            color="gray-800"
            endAdornment={
              <ButtonBase
                aria-label="delete chip"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
                  handleValueChange(e, value)
                }
                disableOverlay
                disableRipple
                style={{ width: '100%', height: '100%' }}
              >
                <CancelIcon
                  color="gray-700"
                  style={{ width: '100%', height: '100%' }}
                />
              </ButtonBase>
            }
          >
            {value}
          </Chip>
        ))}
      </>
    )) as (value: Multiple extends true ? string[] : string) => React.ReactNode;
  }

  return (
    <AutocompleteContext.Provider
      value={{
        autocompleteInputValue,
        handleInputValueChange,
        initInputValue,
        autocompleteValue,
        handleValueChange,
        multiple,
        filterMenuOption
      }}
    >
      <Component
        className={cn('JinniAutocomplete', className)}
        style={newStyle}
        {...rest}
      >
        <InputBase
          ref={inputBaseElRef}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          endAdornment={
            showDeleteButton && (
              <ButtonBase
                className="delete-button"
                onClick={handleClickDeleteButton}
              >
                <CloseIcon size={20} color="gray-500" />
              </ButtonBase>
            )
          }
          disabled={disabled}
          {...InputBaseProps}
        >
          {renderAutocompleteValue &&
            renderAutocompleteValue(autocompleteValue)}
          {multiple ? (
            [...autocompleteValue].map((value) => (
              <input
                key={value}
                name={name}
                value={value}
                readOnly
                hidden
                style={{ display: 'none' }}
              />
            ))
          ) : (
            <input
              name={name}
              value={autocompleteValue}
              readOnly
              hidden
              style={{ display: 'none' }}
            />
          )}
          <input
            className="JinniAutocompleteInput"
            ref={inputElRef}
            type="text"
            value={autocompleteInputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputValueChange(event, event.target.value);
              setFilterMenuOption(true);
            }}
            placeholder={placeholder}
            disabled={disabled}
          />
        </InputBase>
        <Menu
          className={cn('JinniAutocompleteMenu', MenuProps?.className)}
          anchorElRef={inputBaseElRef}
          open={openMenu}
          onClose={handleMenuClose}
          {...MenuProps}
          MenuListProps={{
            ref: menuListElRef,
            disableAlphabetKeyFocus: true,
            ...MenuProps?.MenuListProps
          }}
        >
          {[
            ...children,
            <AutocompleteOption
              key="no-options"
              className="no-options"
              value={autocompleteInputValue}
              disabled
              selected={false}
            >
              No Options
            </AutocompleteOption>
          ]}
        </Menu>
      </Component>
    </AutocompleteContext.Provider>
  );
};

export default Autocomplete;
