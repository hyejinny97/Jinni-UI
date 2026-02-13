import './Autocomplete.scss';
import { useRef, useState, useId } from 'react';
import cn from 'classnames';
import { DefaultComponentProps } from '@/types/default-component-props';
import {
  InputBase,
  InputBaseProps,
  RootInputBaseProps
} from '@/components/data-entry/InputBase';
import { Menu, MenuProps } from '@/components/navigation/Menu';
import { Chip } from '@/components/data-display/Chip';
import {
  useAutocompleteValue,
  useInputValue,
  useMenuOpen,
  useBlur,
  useKeyboardAccessibility,
  useAutocompleteValueLabel
} from './Autocomplete.hooks';
import AutocompleteContext from './Autocomplete.contexts';
import { OptionValueType, OptionLabelType } from './AutocompleteOption';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Box } from '@/components/layout/Box';
import { CancelIcon } from '@/components/icons/CancelIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { useLabelContext } from '@/components/data-entry/Label';
import { ListItem } from '@/components/data-display/List';

export type AutocompleteProps<Multiple extends boolean = false> = Omit<
  DefaultComponentProps<'input'>,
  'defaultValue' | 'value' | 'onChange' | 'size'
> &
  RootInputBaseProps & {
    name?: string;
    children: React.ReactNode;
    placeholder?: string;
    mode?: 'strict' | 'free';
    multiple?: Multiple;
    defaultValue?: Multiple extends true ? OptionValueType[] : OptionValueType;
    value?: Multiple extends true ? OptionValueType[] : OptionValueType | null;
    inputValue?: string;
    onChange?: (
      event: Event | React.SyntheticEvent,
      value: Multiple extends true ? OptionValueType[] : OptionValueType | null
    ) => void;
    onInputChange?: (
      event: Event | React.SyntheticEvent,
      inputValue: string
    ) => void;
    renderValue?: (
      autocompleteValueLabel: Array<{
        value: OptionValueType;
        label: OptionLabelType;
      }>,
      onDelete: (
        e: Event | React.SyntheticEvent,
        valueToDelete: OptionValueType
      ) => void
    ) => React.ReactNode;
    MenuProps?: Omit<Partial<MenuProps>, 'open' | 'onClose'>;
    open?: boolean;
    onOpen?: (event: Event | React.SyntheticEvent) => void;
    onClose?: (event: Event | React.SyntheticEvent) => void;
  };

const defaultRenderValue = (
  autocompleteValueLabel: Array<{
    value: OptionValueType;
    label: OptionLabelType;
  }>,
  onDelete: (
    e: Event | React.SyntheticEvent,
    valueToDelete: OptionValueType
  ) => void
) => (
  <>
    {autocompleteValueLabel.map(({ value, label }) => (
      <Chip
        key={value}
        variant="subtle-filled"
        color="gray-800"
        endAdornment={
          <ButtonBase
            type="button"
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(e, value);
            }}
            disableOverlay
            disableRipple
            style={{ width: '100%', height: '100%' }}
            aria-label="delete chip"
          >
            <CancelIcon
              color="gray-700"
              style={{ width: '100%', height: '100%' }}
            />
          </ButtonBase>
        }
      >
        {label}
      </Chip>
    ))}
  </>
);

const Autocomplete = <Multiple extends boolean = false>(
  props: AutocompleteProps<Multiple>
) => {
  const labelContext = useLabelContext();
  const {
    name,
    children,
    placeholder,
    mode = 'strict',
    multiple = false as Multiple,
    defaultValue,
    value,
    inputValue,
    onChange,
    onInputChange,
    renderValue = multiple ? defaultRenderValue : undefined,
    MenuProps,
    startAdornment,
    endAdornment,
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
    open,
    onOpen,
    onClose,
    className,
    style,
    ...rest
  } = props;
  const menuListId = useId();
  const inputBaseElRef = useRef<HTMLElement>(null);
  const inputElRef = useRef<HTMLInputElement>(null);
  const menuListElRef = useRef<HTMLUListElement>(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const { valueToLabel } = useAutocompleteValueLabel({ children });
  const {
    autocompleteValue,
    changeAutocompleteValue,
    initAutocompleteValue,
    deleteAutocompleteValue
  } = useAutocompleteValue({
    defaultValue,
    value,
    onChange,
    multiple
  });
  const { autocompleteInputValue, changeInputValue, initInputValue } =
    useInputValue({
      multiple,
      autocompleteValue,
      inputValue,
      onInputChange,
      valueToLabel
    });
  const { isOpen, openMenu, closeMenu, toggleMenu } = useMenuOpen({
    open,
    disabled,
    onOpen,
    onClose
  });
  useBlur({
    inputElRef,
    menuListElRef,
    mode,
    multiple,
    autocompleteValue,
    valueToLabel,
    changeInputValue,
    initInputValue,
    closeMenu
  });
  useKeyboardAccessibility({
    inputElRef,
    menuListElRef
  });
  const {
    className: menuClassName,
    MenuListProps: menuListProps,
    ...restMenuProps
  } = (MenuProps || {}) as Partial<MenuProps>;

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (mode === 'free' && autocompleteInputValue) {
        changeAutocompleteValue(event, autocompleteInputValue);
        if (multiple) initInputValue(event);
      }
    }
  };

  return (
    <AutocompleteContext.Provider
      value={{
        multiple,
        isFiltered,
        autocompleteValue,
        autocompleteInputValue,
        changeAutocompleteValue,
        changeInputValue,
        initInputValue,
        closeMenu
      }}
    >
      <InputBase
        ref={inputBaseElRef}
        className={cn(
          'JinniAutocomplete',
          {
            open,
            clearable: autocompleteValue.length > 0 || autocompleteInputValue
          },
          className
        )}
        startAdornment={startAdornment}
        endAdornment={
          endAdornment || (
            <ButtonBase
              type="button"
              className="show-menu"
              disabled={disabled}
              tabIndex={-1}
              onClick={(event: MouseEvent) => {
                toggleMenu(event);
                setIsFiltered(false);
                inputElRef.current?.focus();
              }}
            >
              <ArrowDownIcon color="gray-600" size={16} />
            </ButtonBase>
          )
        }
        variant={variant}
        size={size}
        color={color}
        focusedColor={focusedColor}
        disabled={disabled}
        disableHoverEffect={disableHoverEffect}
        disableFocusEffect={disableFocusEffect}
        fullWidth={fullWidth}
        focused={focused || isOpen}
        style={style}
      >
        <Box className="JinniAutocompleteContent">
          {renderValue?.(
            autocompleteValue.map((value) => ({
              value,
              label: valueToLabel(value)
            })),
            (e: Event | React.SyntheticEvent, valueToDelete: OptionValueType) =>
              deleteAutocompleteValue(e, valueToDelete)
          )}
          <input
            role="combobox"
            ref={inputElRef}
            className="JinniAutocompleteInput"
            type="text"
            value={autocompleteInputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              changeInputValue(event, event.target.value);
              setIsFiltered(true);
            }}
            onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
              openMenu(event);
              setIsFiltered(false);
              event.currentTarget.select();
            }}
            onKeyDown={handleEnterKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls={menuListId}
            {...rest}
          />
        </Box>
        <ButtonBase
          type="button"
          className="clear"
          onClick={(event: MouseEvent) => {
            initInputValue(event);
            initAutocompleteValue(event);
          }}
          tabIndex={-1}
        >
          <CloseIcon size={16} color="gray-500" />
        </ButtonBase>
        <input
          name={name}
          value={autocompleteValue.map(String).join(', ')}
          onChange={() => {}}
          required={required}
          aria-hidden="true"
          tabIndex={-1}
        />
      </InputBase>
      <Menu
        className={cn('JinniAutocompleteMenu', menuClassName)}
        anchorElRef={inputBaseElRef}
        open={isOpen}
        onClose={(event: MouseEvent | KeyboardEvent) => closeMenu(event)}
        disableMenuListFocused
        MenuListProps={{
          id: menuListId,
          ref: menuListElRef,
          disableAlphabetKeyFocus: true,
          ...menuListProps
        }}
        {...restMenuProps}
      >
        {children}
        <ListItem className="no-options">No Options</ListItem>
      </Menu>
    </AutocompleteContext.Provider>
  );
};

export default Autocomplete;
