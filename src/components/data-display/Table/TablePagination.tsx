import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import { Select, Option } from '@/components/data-entry/Select';
import { ButtonBase } from '@/components/general/ButtonBase';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { isObject } from '@/utils/isObject';

type TablePaginationProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    count: number;
    page: number;
    rowsPerPage: number;
    rowsPerPageOptions?: Array<
      number | { label: string; value: number }
    > | null;
    onPageChange: (event: React.MouseEvent, page: number) => void;
    onRowsPerPageChange?: (
      event: Event | React.SyntheticEvent,
      rowsPerPage: number
    ) => void;
  };

const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

const TablePagination = <T extends AsType = 'div'>(
  props: TablePaginationProps<T>
) => {
  const {
    count,
    page,
    rowsPerPage,
    rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
    onPageChange,
    onRowsPerPageChange,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const lastPage = Math.ceil(count / rowsPerPage) - 1;
  const newStyle = useStyle(style);

  const goPrevPage = (event: React.MouseEvent) => {
    onPageChange(event, page - 1);
  };
  const goNextPage = (event: React.MouseEvent) => {
    onPageChange(event, page + 1);
  };
  const handleRowsPerPageChange = (
    event: Event | React.SyntheticEvent,
    value: string
  ) => {
    if (onRowsPerPageChange) onRowsPerPageChange(event, parseInt(value));
  };

  return (
    <Component
      className={cn('JinniTablePagination', className)}
      style={newStyle}
      {...rest}
    >
      {rowsPerPageOptions && (
        <Stack className="rows-per-page-options" direction="row" spacing={10}>
          <Text>Rows per page:</Text>
          <Select
            value={String(rowsPerPage)}
            onChange={handleRowsPerPageChange}
            InputBaseProps={{ style: { minWidth: '70px' } }}
            MenuProps={{ style: { minWidth: '70px' } }}
          >
            {rowsPerPageOptions.map((option) => {
              const label = isObject(option) ? option.label : option;
              const value = isObject(option) ? option.value : option;
              return (
                <Option key={value} value={String(value)}>
                  {label}
                </Option>
              );
            })}
          </Select>
        </Stack>
      )}
      <Text>
        {rowsPerPage * page + 1}-
        {Math.min(rowsPerPage * page + rowsPerPage, count)} of {count}
      </Text>
      <Stack className="page-controls" direction="row" spacing={5}>
        <ButtonBase disabled={page === 0} onClick={goPrevPage}>
          <ArrowLeftIcon />
        </ButtonBase>
        <ButtonBase disabled={page === lastPage} onClick={goNextPage}>
          <ArrowRightIcon />
        </ButtonBase>
      </Stack>
    </Component>
  );
};

export default TablePagination;
