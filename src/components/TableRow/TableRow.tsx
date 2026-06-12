import './TableRow.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import useJinni from '@/hooks/useJinni';

type TableRowProps<T extends AsType = 'tr'> = DefaultComponentProps<T> & {
  hover?: boolean;
  selected?: boolean;
};

const TableRow = <T extends AsType = 'tr'>(props: TableRowProps<T>) => {
  const {
    children,
    hover,
    selected,
    className,
    style,
    as: Component = 'tr',
    ...rest
  } = props;
  const { theme } = useJinni();
  const newStyle = useStyle({
    '--overlay-color':
      theme === 'light'
        ? 'var(--jinni-black-overlay-2)'
        : 'var(--jinni-white-overlay-7)',
    ...style
  });

  return (
    <Component
      className={cn('JinniTableRow', { hover, selected }, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TableRow;
