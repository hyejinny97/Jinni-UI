import './ListItemButton.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import { useList } from '../List.hooks';

type ListItemButtonProps<T extends AsType = 'button'> = ButtonBaseProps<T> & {
  selected?: boolean;
};

const ListItemButton = <T extends AsType = 'button'>(
  props: ListItemButtonProps<T>
) => {
  const { children, selected, className, ...rest } = props;
  const listContext = useList();

  return (
    <ButtonBase
      className={cn(
        'JinniListItemButton',
        { dense: listContext?.dense, selected },
        className
      )}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

export default ListItemButton;
