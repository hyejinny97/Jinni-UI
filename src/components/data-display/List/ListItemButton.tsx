import './ListItemButton.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';

type ListItemButtonProps<T extends AsType = 'button'> = ButtonBaseProps<T> & {
  selected?: boolean;
};

const ListItemButton = <T extends AsType = 'button'>(
  props: ListItemButtonProps<T>
) => {
  const { children, selected = false, className, ...rest } = props;

  return (
    <ButtonBase
      className={cn('JinniListItemButton', { selected }, className)}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

export default ListItemButton;
