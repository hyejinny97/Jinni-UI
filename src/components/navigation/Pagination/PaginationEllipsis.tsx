import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { SizeType } from './PaginationItem';

export type PaginationEllipsisProps<T extends AsType = 'span'> =
  DefaultComponentProps<T> & {
    type: 'ellipsis';
    page: null;
    size?: SizeType;
  };

const PaginationEllipsis = <T extends AsType = 'span'>(
  props: PaginationEllipsisProps<T>
) => {
  const { size = 'md', className, style, ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <span
      className={cn('JinniPaginationEllipsis', size, className)}
      style={newStyle}
      {...rest}
    >
      ...
    </span>
  );
};

export default PaginationEllipsis;
