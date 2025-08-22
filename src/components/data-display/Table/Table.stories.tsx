import '@/components/data-display/Table/TableCustomization.scss';
import cn from 'classnames';
import { useState, Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableProps
} from '.';
import { Text } from '@/components/general/Text';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Stack } from '@/components/layout/Stack';
import { StyleType } from '@/types/style';
import { Box } from '@/components/layout/Box';
import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { Checkbox } from '@/components/data-entry/Checkbox';
import { isNumber } from '@/utils/isNumber';

const meta: Meta<typeof Table> = {
  component: Table,
  argTypes: {
    size: {
      description: 'table의 크기',
      table: {
        type: { summary: `'medium' | 'small'` },
        defaultValue: { summary: `'medium'` }
      }
    },
    stickyHeader: {
      description: 'true이면, header가 sticky 처리 됨',
      table: {
        type: { summary: `boolean` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Table>;

const getDessertData = (dataSize: 'medium' | 'large' = 'medium') => {
  const createData = (
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) => {
    return { name, calories, fat, carbs, protein };
  };

  const MEDIUM_SIZE_ROWS = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
  ] as const;

  const LARGE_SIZE_ROWS = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0)
  ] as const;

  const COLUMNS = [
    {
      headerName: 'Dessert (100g serving)',
      field: 'name',
      dataType: 'string',
      sortable: true
    },
    {
      headerName: 'Calories',
      field: 'calories',
      dataType: 'number',
      sortable: true
    },
    { headerName: 'Fat (g)', field: 'fat', dataType: 'number', sortable: true },
    {
      headerName: 'Carbs (g)',
      field: 'carbs',
      dataType: 'number',
      sortable: true
    },
    {
      headerName: 'Protein (g)',
      field: 'protein',
      dataType: 'number',
      sortable: true
    }
  ] as const;

  return {
    columns: COLUMNS,
    rows: dataSize === 'medium' ? MEDIUM_SIZE_ROWS : LARGE_SIZE_ROWS
  };
};

const getDessertHistoryData = () => {
  const createData = (
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    price: number,
    history: {
      date: string;
      customerId: string;
      amount: number;
    }[]
  ) => {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: history.map((purchase) => ({
        ...purchase,
        total: purchase.amount * price
      }))
    };
  };

  const HISTORY = [
    {
      date: '2020-01-05',
      customerId: '11091700',
      amount: 3
    },
    {
      date: '2020-01-02',
      customerId: 'Anonymous',
      amount: 1
    }
  ];

  const ROWS = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99, HISTORY),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99, HISTORY),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79, HISTORY),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5, HISTORY),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5, HISTORY)
  ];

  const INFO_COLUMNS = [
    {
      headerName: 'Dessert (100g serving)',
      field: 'name',
      dataType: 'string'
    },
    {
      headerName: 'Calories',
      field: 'calories',
      dataType: 'number'
    },
    { headerName: 'Fat (g)', field: 'fat', dataType: 'number' },
    {
      headerName: 'Carbs (g)',
      field: 'carbs',
      dataType: 'number'
    },
    {
      headerName: 'Protein (g)',
      field: 'protein',
      dataType: 'number'
    }
  ] as const;

  const HISTORY_COLUMNS = [
    { headerName: 'Date', field: 'date', dataType: 'string' },
    { headerName: 'Customer', field: 'customerId', dataType: 'string' },
    { headerName: 'Amount', field: 'amount', dataType: 'number' },
    { headerName: 'Total', field: 'total', dataType: 'number' }
  ] as const;

  return {
    infoColumns: INFO_COLUMNS,
    historyColumns: HISTORY_COLUMNS,
    rows: ROWS
  };
};

const getCountryData = () => {
  type Data = {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
  };
  type Column = {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'left' | 'right' | 'center';
    format?: (value: number) => string;
  };

  const createData = (
    name: string,
    code: string,
    population: number,
    size: number
  ): Data => {
    const density = population / size;
    return { name, code, population, size, density };
  };

  const ROWS: Data[] = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767)
  ] as const;

  const FIRST_COLUMNS = [
    { id: 'country', label: 'Country', colSpan: 2, align: 'center' },
    { id: 'details', label: 'Details', colSpan: 3, align: 'center' }
  ] as const;

  const SECOND_COLUMNS: Column[] = [
    { id: 'name', label: 'Name', minWidth: 170, align: 'left' },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100, align: 'left' },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US')
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US')
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2)
    }
  ] as const;

  return {
    rows: ROWS,
    firstColumns: FIRST_COLUMNS,
    secondColumns: SECOND_COLUMNS
  };
};

const getItemData = () => {
  type Data = {
    desc: string;
    qty: number;
    unit: number;
    price: number;
  };

  type Column = {
    label: string;
    align: 'left' | 'center' | 'right';
    colSpan?: number;
  };

  const createData = (desc: string, qty: number, unit: number): Data => {
    const price = Number((qty * unit).toFixed(2));
    return { desc, qty, unit, price };
  };

  const ROWS = [
    createData('Paperclips (Box)', 100, 1.15),
    createData('Paper (Case)', 10, 45.99),
    createData('Waste Basket', 2, 17.99)
  ] as const;

  const FIRST_COLUMNS: Column[] = [
    { label: 'Details', align: 'center', colSpan: 3 },
    { label: 'Price', align: 'right' }
  ] as const;

  const SECOND_COLUMNS = [
    { label: 'Desc', field: 'desc', align: 'left' },
    { label: 'Qty.', field: 'qty', align: 'right' },
    { label: 'Unit', field: 'unit', align: 'right' },
    { label: 'Sum', field: 'price', align: 'right' }
  ] as const;

  return {
    rows: ROWS,
    firstColumns: FIRST_COLUMNS,
    secondColumns: SECOND_COLUMNS
  };
};

const DessertTable = ({
  tableProps,
  style
}: {
  tableProps?: TableProps;
  style?: StyleType;
}) => {
  const { columns, rows } = getDessertData();
  const getAlign = (dataType: string): 'left' | 'right' => {
    switch (dataType) {
      case 'number':
        return 'right';
      case 'string':
        return 'left';
      default:
        return 'left';
    }
  };

  return (
    <TableContainer as={Box} elevation={2} round="sm" style={style}>
      <Table {...tableProps}>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableCell key={column.field} align={getAlign(column.dataType)}>
                  {column.headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.name}>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.field}
                      as={column.field === 'name' ? 'th' : 'td'}
                      align={getAlign(column.dataType)}
                      scope={column.field === 'name' ? 'row' : undefined}
                      style={{ minWidth: '100px' }}
                    >
                      {row[column.field]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const TablePaginationTemplate = () => {
  const { columns, rows } = getDessertData('large');
  const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    ROWS_PER_PAGE_OPTIONS[0]
  );

  const getAlign = (dataType: string): 'left' | 'right' => {
    switch (dataType) {
      case 'number':
        return 'right';
      case 'string':
        return 'left';
      default:
        return 'left';
    }
  };

  const handlePageChange = (_: React.MouseEvent, selectedPage: number) => {
    setPage(selectedPage);
  };
  const handleRowsPerPageChange = (
    _: Event | React.SyntheticEvent,
    selectedRowPerPage: number
  ) => {
    setRowsPerPage(selectedRowPerPage);
  };

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const emptyRows = Math.max((page + 1) * rowsPerPage - rows.length, 0);

  return (
    <Box elevation={2} round="sm">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.field}
                    align={getAlign(column.dataType)}
                  >
                    {column.headerName}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => {
              return (
                <TableRow key={row.name}>
                  {columns.map((column) => {
                    return (
                      <TableCell
                        key={column.field}
                        align={getAlign(column.dataType)}
                        scope={column.field === 'name' ? 'row' : undefined}
                        style={{ minWidth: '100px' }}
                      >
                        {row[column.field]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {!!emptyRows && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  style={{ height: `${57 * emptyRows}px` }}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

const SortableTableTemplate = () => {
  const ORDER = ['asc', 'desc'] as const;
  const DEFAULT_ORDER = 'asc';
  const { columns, rows } = getDessertData();
  const [order, setOrder] = useState<(typeof ORDER)[number]>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState<string | null>(null);

  const getAlign = (dataType: string): 'left' | 'right' => {
    switch (dataType) {
      case 'number':
        return 'right';
      case 'string':
        return 'left';
      default:
        return 'left';
    }
  };

  const descendingComparator = <T extends object>(
    a: T,
    b: T,
    orderBy: keyof T
  ) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = <Key extends string>(
    order: (typeof ORDER)[number],
    orderBy: Key
  ): ((
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const handleOrderChange = (
    newOrderBy: string,
    newOrder: (typeof ORDER)[number]
  ) => {
    setOrderBy(newOrderBy);
    setOrder(newOrder);
  };

  const sortedRows = orderBy
    ? [...rows].sort(getComparator(order, orderBy))
    : rows;

  return (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table className="sortable-table">
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              const activeSort = orderBy === column.field;
              const orderDirection = activeSort ? order : DEFAULT_ORDER;
              const orderToChange = activeSort
                ? ORDER[(ORDER.indexOf(order) + 1) % 2]
                : DEFAULT_ORDER;
              return (
                <TableCell
                  key={column.field}
                  className={cn({ activeSort }, orderDirection)}
                  align={getAlign(column.dataType)}
                >
                  <Stack
                    direction="row"
                    spacing={3}
                    style={{ alignItems: 'center' }}
                  >
                    {column.sortable && (
                      <ButtonBase
                        onClick={() =>
                          handleOrderChange(column.field, orderToChange)
                        }
                      >
                        <ArrowDownIcon color="gray-500" />
                      </ButtonBase>
                    )}
                    {column.headerName}
                  </Stack>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => {
            return (
              <TableRow key={row.name}>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.field}
                      align={getAlign(column.dataType)}
                      scope={column.field === 'name' ? 'row' : undefined}
                    >
                      {row[column.field]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SelectableTableTemplate = () => {
  const { columns, rows } = getDessertData();
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const numSelected = selectedRows.size;
  console.log(selectedRows);

  const getAlign = (dataType: string): 'left' | 'right' => {
    switch (dataType) {
      case 'number':
        return 'right';
      case 'string':
        return 'left';
      default:
        return 'left';
    }
  };

  const handleAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows(new Set(rows.map((row) => row.name)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleCheck = (rowName: string) => {
    if (selectedRows.has(rowName)) {
      setSelectedRows(
        (prev) => new Set([...prev].filter((name) => name !== rowName))
      );
    } else {
      setSelectedRows((prev) => new Set([...prev, rowName]));
    }
  };

  return (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rows.length}
                checked={numSelected > 0 && numSelected === rows.length}
                onChange={handleAllChecked}
              />
            </TableCell>
            {columns.map((column) => {
              return (
                <TableCell key={column.field} align={getAlign(column.dataType)}>
                  {column.headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const isRowSelected = selectedRows.has(row.name);
            return (
              <TableRow
                key={row.name}
                hover
                selected={isRowSelected}
                onClick={() => handleCheck(row.name)}
              >
                <TableCell>
                  <Checkbox
                    checked={isRowSelected}
                    onChange={() => handleCheck(row.name)}
                  />
                </TableCell>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.field}
                      align={getAlign(column.dataType)}
                      scope={column.field === 'name' ? 'row' : undefined}
                    >
                      {row[column.field]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ColumnGroupingTemplate = () => {
  const { rows, firstColumns, secondColumns } = getCountryData();

  return (
    <TableContainer
      as={Box}
      elevation={2}
      round="sm"
      style={{ maxHeight: '500px' }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {firstColumns.map(({ id, label, align, colSpan }) => {
              return (
                <TableCell key={id} align={align} colSpan={colSpan}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            {secondColumns.map(({ id, label, align, minWidth }) => {
              return (
                <TableCell key={id} align={align} style={{ minWidth }}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.name}>
                {secondColumns.map(({ id, align, format }) => {
                  return (
                    <TableCell key={id} align={align}>
                      {format && isNumber(row[id]) ? format(row[id]) : row[id]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CollapsibleTableTemplate = () => {
  const { rows, infoColumns, historyColumns } = getDessertHistoryData();
  const [openedRows, setOpenedRows] = useState<string[]>([]);

  const getAlign = (dataType: string): 'left' | 'right' => {
    switch (dataType) {
      case 'number':
        return 'right';
      case 'string':
        return 'left';
      default:
        return 'left';
    }
  };
  const handleToggle = (rowName: string) => {
    if (openedRows.includes(rowName)) {
      setOpenedRows((prev) => prev.filter((name) => name !== rowName));
    } else {
      setOpenedRows((prev) => [...prev, rowName]);
    }
  };

  return (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {infoColumns.map(({ headerName, field, dataType }) => {
              return (
                <TableCell
                  key={field}
                  align={getAlign(dataType)}
                  style={{ minWidth: '100px' }}
                >
                  {headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const isOpened = openedRows.includes(row.name);
            return (
              <Fragment key={row.name}>
                <TableRow>
                  <TableCell style={{ border: 'none' }}>
                    <ButtonBase
                      onClick={() => handleToggle(row.name)}
                      style={{
                        display: 'inline-flex',
                        padding: '3px',
                        borderRadius: '50%'
                      }}
                    >
                      {isOpened ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </ButtonBase>
                  </TableCell>
                  {infoColumns.map(({ field, dataType }) => {
                    return (
                      <TableCell
                        key={field}
                        align={getAlign(dataType)}
                        style={{ border: 'none' }}
                      >
                        {row[field]}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} style={{ padding: 0 }}>
                    {isOpened && (
                      <Box style={{ padding: '16px' }}>
                        <Text
                          as="h6"
                          className="typo-title-large"
                          style={{ margin: '10px 0' }}
                        >
                          History
                        </Text>
                        <Table size="small" style={{ width: '100%' }}>
                          <TableHead>
                            <TableRow>
                              {historyColumns.map(
                                ({ headerName, field, dataType }) => {
                                  return (
                                    <TableCell
                                      key={field}
                                      align={getAlign(dataType)}
                                      style={{ width: '25%' }}
                                    >
                                      {headerName}
                                    </TableCell>
                                  );
                                }
                              )}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.history.map((purchase) => {
                              return (
                                <TableRow key={purchase.customerId}>
                                  {historyColumns.map(({ field, dataType }) => {
                                    return (
                                      <TableCell
                                        key={field}
                                        align={getAlign(dataType)}
                                      >
                                        {purchase[field]}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SpanningTableTemplate = () => {
  const { rows, firstColumns, secondColumns } = getItemData();
  const TAX_RATE = 0.07;

  type Data = {
    desc: string;
    qty: number;
    unit: number;
    price: number;
  };

  const ccyFormat = (num: number) => {
    return `${num.toFixed(2)}`;
  };
  const subtotal = (items: readonly Data[]) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  };

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table>
        <TableHead>
          <TableRow>
            {firstColumns.map(({ label, align, colSpan }) => {
              return (
                <TableCell key={label} align={align} colSpan={colSpan}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            {secondColumns.map(({ label, align, field }) => {
              return (
                <TableCell
                  key={field}
                  align={align}
                  style={{ minWidth: '100px' }}
                >
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.desc}>
                {secondColumns.map(({ align, field }) => {
                  return (
                    <TableCell key={field} align={align}>
                      {row[field]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const BasicTable: Story = {
  render: () => <DessertTable />
};

export const DenseTable: Story = {
  render: () => <DessertTable tableProps={{ size: 'small' }} />
};

export const StickyHeader: Story = {
  render: () => (
    <DessertTable
      tableProps={{ stickyHeader: true }}
      style={{ maxHeight: '250px' }}
    />
  )
};

export const PaginatedTable: Story = {
  render: () => <TablePaginationTemplate />
};

export const SortingTable: Story = {
  render: () => <SortableTableTemplate />
};

export const SelectingTable: Story = {
  render: () => <SelectableTableTemplate />
};

export const ColumnGrouping: Story = {
  render: () => <ColumnGroupingTemplate />
};

export const CollapsibleTable: Story = {
  render: () => <CollapsibleTableTemplate />
};

export const SpanningTable: Story = {
  render: () => <SpanningTableTemplate />
};

export const Customization: Story = {
  render: () => <DessertTable tableProps={{ className: 'custom-table' }} />
};
