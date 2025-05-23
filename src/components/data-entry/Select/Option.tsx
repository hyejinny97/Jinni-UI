import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { MenuItem, MenuItemProps } from '@/components/navigation/MenuItem';
import { useSelectContext } from './Select.hooks';

type OptionProps<T extends AsType = 'li'> = MenuItemProps<T> & {
  children: React.ReactNode;
  value: string;
};

const Option = <T extends AsType = 'li'>(props: OptionProps<T>) => {
  const { children, value, className, ...rest } = props;
  const { selectValue, handleChange, multiple } = useSelectContext();

  const handleClick = (e: MouseEvent) => {
    handleChange(e, value);
  };

  return (
    <MenuItem
      className={cn('JinniOption', className)}
      selected={multiple ? selectValue?.includes(value) : selectValue === value}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </MenuItem>
  );
};

export default Option;
