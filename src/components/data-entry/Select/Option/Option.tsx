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

  const handleClick = (e: MouseEvent) => {
    handleChange(e, value);
    if (!multiple) closeMenu();
  };

  return (
    <MenuItem
      className={cn('JinniOption', className)}
      selected={selectedValue.includes(value)}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </MenuItem>
  );
};

export default Option;
