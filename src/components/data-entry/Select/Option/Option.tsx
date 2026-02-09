import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { MenuItem, MenuItemProps } from '@/components/navigation/MenuItem';
import { useSelectContext } from '../Select.hooks';

export type OptionValueType = string | number;

export type OptionProps<T extends AsType = 'li'> = MenuItemProps<T> & {
  children: React.ReactNode;
  value: OptionValueType;
};

const Option = <T extends AsType = 'li'>(props: OptionProps<T>) => {
  const { children, value, className, ...rest } = props;
  const { multiple, selectedValue, handleChange, closeMenu } =
    useSelectContext();
  const isSelected = selectedValue.includes(value);

  const handleClick = (e: MouseEvent) => {
    handleChange(e, value);
    if (!multiple) closeMenu();
  };

  return (
    <MenuItem
      role="option"
      className={cn('JinniOption', className)}
      selected={isSelected}
      onClick={handleClick}
      aria-selected={isSelected}
      {...rest}
    >
      {children}
    </MenuItem>
  );
};

export default Option;
