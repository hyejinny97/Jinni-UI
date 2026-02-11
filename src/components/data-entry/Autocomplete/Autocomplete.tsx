import './Autocomplete.scss';
import { useRef, useState, useCallback } from 'react';
import cn from 'classnames';
import { DefaultComponentProps } from '@/types/default-component-props';
import {
  InputBase,
  InputBaseProps,
  RootInputBaseProps
} from '@/components/data-entry/InputBase';
import { Menu, MenuProps, CloseReason } from '@/components/navigation/Menu';
import { Chip } from '@/components/data-display/Chip';
import {
  useAutocompleteValue,
  useInputValue,
  useBackgroundClick,
  useAutocompleteValueLabel
} from './Autocomplete.hooks';
import AutocompleteContext from './Autocomplete.contexts';
import { OptionValueType, OptionLabelType } from './AutocompleteOption';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Stack } from '@/components/layout/Stack';
import { CancelIcon } from '@/components/icons/CancelIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { useLabelContext } from '@/components/data-entry/Label';
import { ListItem } from '@/components/data-display/List';

export type AutocompleteProps<Multiple extends boolean = false> =
  DefaultComponentProps<'input'> &
    RootInputBaseProps & {
      name?: string;
      children: React.ReactNode;
      placeholder?: string;
      mode?: 'strict' | 'free';
      multiple?: Multiple;
      defaultValue?: Multiple extends true
        ? OptionValueType[]
        : OptionValueType;
      value?: Multiple extends true ? OptionValueType[] : OptionValueType;
      inputValue?: string;
      onChange?: (
        event: Event | React.SyntheticEvent,
        value: Multiple extends true ? OptionValueType[] : OptionValueType
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
        onDelete?: (
          e: Event | React.SyntheticEvent,
          valueToDelete: OptionValueType
        ) => void
      ) => React.ReactNode;
      MenuProps?: Partial<MenuProps>;
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
            onClick={(e: MouseEvent) => onDelete?.(e, value)}
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
    renderValue = defaultRenderValue,
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
    className,
    style,
    ...rest
  } = props;
  const inputBaseElRef = useRef<HTMLElement>(null);
  const inputElRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const { autocompleteValue, changeAutocompleteValue, initAutocompleteValue } =
    useAutocompleteValue({
      defaultValue,
      value,
      onChange,
      multiple
    });
  const { autocompleteInputValue, changeInputValue, initInputValue } =
    useInputValue({
      inputValue,
      onInputChange
    });
  const {
    className: menuClassName,
    onClose: menuOnClose,
    MenuListProps: menuListProps,
    ...restMenuProps
  } = (MenuProps || {}) as Partial<MenuProps>;

  const openMenu = () => {
    if (disabled) return;
    setOpen(true);
    setIsFiltered(false);
    inputElRef.current?.focus();
  };
  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && mode === 'free' && inputValue) {
      event.preventDefault();
      changeAutocompleteValue(event, inputValue);
      if (multiple) initInputValue(event);
    }
  };
  const handleMenuClose = useCallback(
    (event: MouseEvent | KeyboardEvent, reason: CloseReason) => {
      closeMenu();
      menuOnClose?.(event, reason);
    },
    [closeMenu, menuOnClose]
  );

  const { valueToLabel } = useAutocompleteValueLabel({ children });
  const { menuListElRef } = useBackgroundClick({
    inputBaseElRef,
    mode,
    multiple,
    autocompleteValue,
    valueToLabel,
    changeInputValue,
    initInputValue,
    closeMenu
  });

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
        onClick={openMenu}
        onKeyDown={handleKeyDown}
        startAdornment={startAdornment}
        endAdornment={
          endAdornment || (
            <Stack direction="row" spacing={5} style={{ alignItems: 'center' }}>
              <ButtonBase
                className="clear"
                onClick={(event: MouseEvent) => {
                  initInputValue(event);
                  initAutocompleteValue(event);
                }}
              >
                <CloseIcon size={16} color="gray-500" />
              </ButtonBase>
              <ButtonBase className={cn('show-menu', { open })}>
                <ArrowDownIcon color="gray-600" size={16} />
              </ButtonBase>
            </Stack>
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
        focused={focused || open}
        style={style}
      >
        {multiple &&
          renderValue(
            autocompleteValue.map((value) => ({
              value,
              label: valueToLabel(value)
            })),
            (e: Event | React.SyntheticEvent, valueToDelete: OptionValueType) =>
              changeAutocompleteValue(e, valueToDelete)
          )}
        <input
          ref={inputElRef}
          className="JinniAutocompleteInput"
          type="text"
          value={autocompleteInputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            changeInputValue(event, event.target.value);
            setIsFiltered(true);
          }}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
        {
          <input
            name={name}
            value={autocompleteValue.map(String).join(', ')}
            required={required}
            readOnly
            aria-hidden="true"
            style={{ display: 'none' }}
          />
        }
      </InputBase>
      <Menu
        className={cn('JinniAutocompleteMenu', menuClassName)}
        anchorElRef={inputBaseElRef}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
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
