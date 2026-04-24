import './TableCustomization.scss';
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
  TablePagination
} from '.';
import { Text } from '@/components/general/Text';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { Checkbox } from '@/components/data-entry/Checkbox';
import { isNumber } from '@/utils/isNumber';
import { Input } from '@/components/data-entry/Input';

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

type CountryData = {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
};

type CountryColumn = {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: number) => string;
};

type HistoryType = {
  date: string;
  customerId: string;
  amount: number;
  total: number;
};

type OfficeData = {
  desc: string;
  qty: number;
  unit: number;
  price: number;
};

type OfficeColumn = {
  label: string;
  align: 'left' | 'center' | 'right';
  colSpan?: number;
};

type EmployeeRow = {
  dataId: number;
  name: string;
  age: number;
  createdDate: string;
  lastLogin: string;
};

type EmployeeColumn = {
  headerName: string;
  field: keyof EmployeeRow;
  dataType: 'text' | 'number' | 'date' | 'datetime-local';
  width: string;
  format?: (value: string) => string;
};

const createDesertData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) => {
  return { name, calories, fat, carbs, protein };
};

const createCountryData = (
  name: string,
  code: string,
  population: number,
  size: number
): CountryData => {
  const density = population / size;
  return { name, code, population, size, density };
};

const createDesertHistoryData = (
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

const createOfficeData = (
  desc: string,
  qty: number,
  unit: number
): OfficeData => {
  const price = Number((qty * unit).toFixed(2));
  return { desc, qty, unit, price };
};

const createEmployeeData = (
  dataId: number,
  name: string,
  age: number,
  createdDate: string,
  lastLogin: string
) => {
  return { dataId, name, age, createdDate, lastLogin };
};

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

const DESERT_ROWS = [
  createDesertData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDesertData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDesertData('Eclair', 262, 16.0, 24, 6.0),
  createDesertData('Cupcake', 305, 3.7, 67, 4.3),
  createDesertData('Gingerbread', 356, 16.0, 49, 3.9)
] as const;

const MANY_DESERT_ROWS = [
  createDesertData('Cupcake', 305, 3.7, 67, 4.3),
  createDesertData('Donut', 452, 25.0, 51, 4.9),
  createDesertData('Eclair', 262, 16.0, 24, 6.0),
  createDesertData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDesertData('Gingerbread', 356, 16.0, 49, 3.9),
  createDesertData('Honeycomb', 408, 3.2, 87, 6.5),
  createDesertData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDesertData('Jelly Bean', 375, 0.0, 94, 0.0),
  createDesertData('KitKat', 518, 26.0, 65, 7.0),
  createDesertData('Lollipop', 392, 0.2, 98, 0.0),
  createDesertData('Marshmallow', 318, 0, 81, 2.0),
  createDesertData('Nougat', 360, 19.0, 9, 37.0),
  createDesertData('Oreo', 437, 18.0, 63, 4.0)
] as const;

const DESERT_COLUMNS = [
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

const COUNTRY_ROWS: CountryData[] = [
  createCountryData('India', 'IN', 1324171354, 3287263),
  createCountryData('China', 'CN', 1403500365, 9596961),
  createCountryData('Italy', 'IT', 60483973, 301340),
  createCountryData('United States', 'US', 327167434, 9833520),
  createCountryData('Canada', 'CA', 37602103, 9984670),
  createCountryData('Australia', 'AU', 25475400, 7692024),
  createCountryData('Germany', 'DE', 83019200, 357578),
  createCountryData('Ireland', 'IE', 4857000, 70273),
  createCountryData('Mexico', 'MX', 126577691, 1972550),
  createCountryData('Japan', 'JP', 126317000, 377973),
  createCountryData('France', 'FR', 67022000, 640679),
  createCountryData('United Kingdom', 'GB', 67545757, 242495),
  createCountryData('Russia', 'RU', 146793744, 17098246),
  createCountryData('Nigeria', 'NG', 200962417, 923768),
  createCountryData('Brazil', 'BR', 210147125, 8515767)
] as const;

const COUNTRY_FIRST_COLUMNS = [
  { id: 'country', label: 'Country', colSpan: 2, align: 'center' },
  { id: 'details', label: 'Details', colSpan: 3, align: 'center' }
] as const;

const COUNTRY_SECOND_COLUMNS: CountryColumn[] = [
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

const DESERT_HISTORY_ROWS = [
  createDesertHistoryData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99, HISTORY),
  createDesertHistoryData(
    'Ice cream sandwich',
    237,
    9.0,
    37,
    4.3,
    4.99,
    HISTORY
  ),
  createDesertHistoryData('Eclair', 262, 16.0, 24, 6.0, 3.79, HISTORY),
  createDesertHistoryData('Cupcake', 305, 3.7, 67, 4.3, 2.5, HISTORY),
  createDesertHistoryData('Gingerbread', 356, 16.0, 49, 3.9, 1.5, HISTORY)
];

const DESERT_HISTORY_COLUMNS = [
  { headerName: 'Date', field: 'date', dataType: 'string' },
  { headerName: 'Customer', field: 'customerId', dataType: 'string' },
  { headerName: 'Amount', field: 'amount', dataType: 'number' },
  { headerName: 'Total', field: 'total', dataType: 'number' }
] as const;

const OFFICE_ROWS = [
  createOfficeData('Paperclips (Box)', 100, 1.15),
  createOfficeData('Paper (Case)', 10, 45.99),
  createOfficeData('Waste Basket', 2, 17.99)
] as const;

const OFFICE_FIRST_COLUMNS: OfficeColumn[] = [
  { label: 'Details', align: 'center', colSpan: 3 },
  { label: 'Price', align: 'right' }
] as const;

const OFFICE_SECOND_COLUMNS = [
  { label: 'Desc', field: 'desc', align: 'left' },
  { label: 'Qty.', field: 'qty', align: 'right' },
  { label: 'Unit', field: 'unit', align: 'right' },
  { label: 'Sum', field: 'price', align: 'right' }
] as const;

const EMPLOYEE_ROWS: EmployeeRow[] = [
  createEmployeeData(1, 'Flora Anderson', 25, '2025-10-25', '2026-04-22T13:17'),
  createEmployeeData(2, 'Julian Garza', 36, '2025-05-23', '2026-04-22T16:04'),
  createEmployeeData(3, 'Jeffery Rose', 19, '2025-06-19', '2026-04-22T16:46')
] as const;

const EMPLOYEE_COLUMNS: EmployeeColumn[] = [
  { headerName: 'Name', field: 'name', dataType: 'text', width: '200px' },
  {
    headerName: 'Age',
    field: 'age',
    dataType: 'number',
    width: '80px',
    format: (age: string) => new Intl.NumberFormat().format(Number(age))
  },
  {
    headerName: 'Date Created',
    field: 'createdDate',
    dataType: 'date',
    width: '150px',
    format: (date: string) =>
      new Intl.DateTimeFormat(navigator.language, {
        dateStyle: 'medium'
      }).format(new Date(date))
  },
  {
    headerName: 'Last Login',
    field: 'lastLogin',
    dataType: 'datetime-local',
    width: '250px',
    format: (date: string) =>
      new Intl.DateTimeFormat(navigator.language, {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(date))
  }
] as const;

const TablePaginationTemplate = () => {
  const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    ROWS_PER_PAGE_OPTIONS[0]
  );

  const handlePageChange = (_: React.MouseEvent, selectedPage: number) => {
    setPage(selectedPage);
  };
  const handleRowsPerPageChange = (
    _: Event | React.SyntheticEvent,
    selectedRowPerPage: number
  ) => {
    setRowsPerPage(selectedRowPerPage);
  };

  const paginatedRows = MANY_DESERT_ROWS.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const emptyRows = Math.max(
    (page + 1) * rowsPerPage - MANY_DESERT_ROWS.length,
    0
  );

  return (
    <Box elevation={2} round="sm">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {DESERT_COLUMNS.map((column) => {
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
                  {DESERT_COLUMNS.map((column) => {
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
                  colSpan={DESERT_COLUMNS.length}
                  style={{ height: `${57 * emptyRows}px` }}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={MANY_DESERT_ROWS.length}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      />
    </Box>
  );
};

const SortableTableTemplate = () => {
  const ORDER = ['asc', 'desc'] as const;
  const DEFAULT_ORDER = 'asc';
  const DEFAULT_ORDER_BY = DESERT_COLUMNS.find(
    (column) => column.sortable
  )?.field;
  const [order, setOrder] = useState<(typeof ORDER)[number]>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState<string | undefined>(DEFAULT_ORDER_BY);

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
    ? [...DESERT_ROWS].sort(getComparator(order, orderBy))
    : DESERT_ROWS;

  return (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table className="sortable-table">
        <TableHead>
          <TableRow>
            {DESERT_COLUMNS.map((column) => {
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
                        aria-label={`order ${orderToChange === 'asc' ? 'ascending' : 'descending'}`}
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
                {DESERT_COLUMNS.map((column) => {
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
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const numSelected = selectedRows.size;

  const handleAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows(new Set(DESERT_ROWS.map((row) => row.name)));
    } else {
      setSelectedRows(new Set());
    }
  };
  const handleCheck = (rowName: string) => {
    const newSelectedRows = new Set(selectedRows);
    if (selectedRows.has(rowName)) newSelectedRows.delete(rowName);
    else newSelectedRows.add(rowName);
    setSelectedRows(newSelectedRows);
  };

  return (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                indeterminate={
                  numSelected > 0 && numSelected < DESERT_ROWS.length
                }
                checked={numSelected > 0 && numSelected === DESERT_ROWS.length}
                onChange={handleAllChecked}
              />
            </TableCell>
            {DESERT_COLUMNS.map((column) => {
              return (
                <TableCell key={column.field} align={getAlign(column.dataType)}>
                  {column.headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {DESERT_ROWS.map((row) => {
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
                {DESERT_COLUMNS.map((column) => {
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

const PurchaseHistoryTable = ({ rows }: { rows: HistoryType[] }) => {
  return (
    <Table size="small" style={{ width: '100%' }}>
      <TableHead>
        <TableRow>
          {DESERT_HISTORY_COLUMNS.map(({ headerName, field, dataType }) => {
            return (
              <TableCell
                key={field}
                align={getAlign(dataType)}
                style={{ width: '25%' }}
              >
                {headerName}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((purchaseHistory) => {
          return (
            <TableRow key={purchaseHistory.date}>
              {DESERT_HISTORY_COLUMNS.map(({ field, dataType }) => {
                return (
                  <TableCell key={field} align={getAlign(dataType)}>
                    {purchaseHistory[field]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const CollapsibleTableTemplate = () => {
  const [openedRows, setOpenedRows] = useState<string[]>([]);

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
            {DESERT_COLUMNS.map(({ headerName, field, dataType }) => {
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
          {DESERT_HISTORY_ROWS.map((row) => {
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
                      aria-label={`${isOpened ? 'hide' : 'show'} purchase history`}
                    >
                      {isOpened ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </ButtonBase>
                  </TableCell>
                  {DESERT_COLUMNS.map(({ field, dataType }) => {
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
                        <PurchaseHistoryTable rows={row.history} />
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
  const TAX_RATE = 0.07;

  const ccyFormat = (num: number) => {
    return `${num.toFixed(2)}`;
  };
  const subtotal = (items: readonly OfficeData[]) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  };

  const invoiceSubtotal = subtotal(OFFICE_ROWS);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table>
        <TableHead>
          <TableRow>
            {OFFICE_FIRST_COLUMNS.map(({ label, align, colSpan }) => {
              return (
                <TableCell key={label} align={align} colSpan={colSpan}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            {OFFICE_SECOND_COLUMNS.map(({ label, align, field }) => {
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
          {OFFICE_ROWS.map((row) => {
            return (
              <TableRow key={row.desc}>
                {OFFICE_SECOND_COLUMNS.map(({ align, field }) => {
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

const EditingTableTemplate = () => {
  type EditingCellType = {
    dataId: number;
    editingField: keyof EmployeeRow;
  };

  const [rows, setRows] = useState(EMPLOYEE_ROWS);
  const [editingCell, setEditingCell] = useState<EditingCellType | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const handleCellDoubleClick = ({
    dataId,
    editingField,
    rowIdx
  }: EditingCellType & { rowIdx: number }) => {
    setEditingCell({ dataId, editingField });
    setInputValue(String(rows[rowIdx][editingField]));
  };

  const handleBlur = (event: React.FocusEvent) => {
    const focusedEl = event.relatedTarget as Element;
    const currentTarget = event.currentTarget as Element;
    if (currentTarget.contains(focusedEl)) return;

    if (editingCell && inputValue) {
      const newRows = JSON.parse(JSON.stringify(rows));
      for (const row of newRows) {
        if (row.dataId === editingCell.dataId) {
          row[editingCell.editingField] = inputValue;
          break;
        }
      }
      setRows(newRows);
    }
    setEditingCell(null);
    setInputValue('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <TableContainer
      as={Box}
      elevation={2}
      round="sm"
      style={{ width: 'max-content' }}
    >
      <Table className="editing-table">
        <TableHead>
          <TableRow>
            {EMPLOYEE_COLUMNS.map((column) => {
              return (
                <TableCell
                  key={column.field}
                  align={column.dataType === 'text' ? 'left' : 'right'}
                >
                  {column.headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIdx) => {
            return (
              <TableRow key={row.name}>
                {EMPLOYEE_COLUMNS.map((column) => {
                  const isEditingRow = editingCell?.dataId === row.dataId;
                  const isEditingCell =
                    isEditingRow && editingCell?.editingField === column.field;
                  const cellData = column.format
                    ? column.format(String(row[column.field]))
                    : row[column.field];

                  return (
                    <TableCell
                      key={column.field}
                      tabIndex={0}
                      align={column.dataType === 'text' ? 'left' : 'right'}
                      scope={column.field === 'name' ? 'row' : undefined}
                      onDoubleClick={() =>
                        handleCellDoubleClick({
                          dataId: row.dataId,
                          editingField: column.field,
                          rowIdx
                        })
                      }
                      onBlur={handleBlur}
                      style={{
                        width: column.width,
                        minWidth: 'max-content',
                        userSelect: 'none',
                        ...(isEditingRow && {
                          paddingTop: '0px',
                          paddingBottom: '0px'
                        }),
                        ...(isEditingCell && {
                          padding: '0px',
                          outline: 'none'
                        })
                      }}
                    >
                      {isEditingCell ? (
                        <Input
                          type={column.dataType}
                          value={inputValue}
                          onChange={handleInputChange}
                          {...(column.dataType === 'number' && { min: 0 })}
                          style={{
                            width: column.width,
                            minWidth: column.width,
                            height: '57px',
                            elevation: 3
                          }}
                        />
                      ) : (
                        cellData
                      )}
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

export const BasicTable: Story = {
  render: () => (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table>
        <TableHead>
          <TableRow>
            {DESERT_COLUMNS.map((column) => {
              return (
                <TableCell key={column.field} align={getAlign(column.dataType)}>
                  {column.headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {DESERT_ROWS.map((row) => {
            return (
              <TableRow key={row.name}>
                {DESERT_COLUMNS.map((column) => {
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
  ),
  parameters: {
    docs: {
      source: {
        code: `
const createDesertData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) => {
  return { name, calories, fat, carbs, protein };
};

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

const DESERT_ROWS = [
  createDesertData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDesertData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDesertData('Eclair', 262, 16.0, 24, 6.0),
  createDesertData('Cupcake', 305, 3.7, 67, 4.3),
  createDesertData('Gingerbread', 356, 16.0, 49, 3.9)
] as const;

const DESERT_COLUMNS = [
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

<TableContainer as={Box} elevation={2} round="sm">
  <Table>
    <TableHead>
      <TableRow>
        {DESERT_COLUMNS.map((column) => {
          return (
            <TableCell key={column.field} align={getAlign(column.dataType)}>
              {column.headerName}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
    <TableBody>
      {DESERT_ROWS.map((row) => {
        return (
          <TableRow key={row.name}>
            {DESERT_COLUMNS.map((column) => {
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
`.trim()
      }
    }
  }
};

export const DenseTable: Story = {
  render: () => (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table size="small">
        <TableHead>
          <TableRow>
            {DESERT_COLUMNS.map((column) => {
              return (
                <TableCell key={column.field} align={getAlign(column.dataType)}>
                  {column.headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {DESERT_ROWS.map((row) => {
            return (
              <TableRow key={row.name}>
                {DESERT_COLUMNS.map((column) => {
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
  ),
  parameters: {
    docs: {
      source: {
        code: `
const createDesertData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) => {
  return { name, calories, fat, carbs, protein };
};

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

const DESERT_ROWS = [
  createDesertData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDesertData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDesertData('Eclair', 262, 16.0, 24, 6.0),
  createDesertData('Cupcake', 305, 3.7, 67, 4.3),
  createDesertData('Gingerbread', 356, 16.0, 49, 3.9)
] as const;

const DESERT_COLUMNS = [
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

<TableContainer as={Box} elevation={2} round="sm">
  <Table size='small'>
    <TableHead>
      <TableRow>
        {DESERT_COLUMNS.map((column) => {
          return (
            <TableCell key={column.field} align={getAlign(column.dataType)}>
              {column.headerName}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
    <TableBody>
      {DESERT_ROWS.map((row) => {
        return (
          <TableRow key={row.name}>
            {DESERT_COLUMNS.map((column) => {
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
`.trim()
      }
    }
  }
};

export const StickyHeader: Story = {
  render: () => (
    <TableContainer
      as={Box}
      elevation={2}
      round="sm"
      style={{ maxHeight: '250px', overflowY: 'auto' }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {DESERT_COLUMNS.map((column) => {
              return (
                <TableCell key={column.field} align={getAlign(column.dataType)}>
                  {column.headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {DESERT_ROWS.map((row) => {
            return (
              <TableRow key={row.name}>
                {DESERT_COLUMNS.map((column) => {
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
  ),
  parameters: {
    docs: {
      source: {
        code: `
const createDesertData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) => {
  return { name, calories, fat, carbs, protein };
};

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

const DESERT_ROWS = [
  createDesertData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDesertData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDesertData('Eclair', 262, 16.0, 24, 6.0),
  createDesertData('Cupcake', 305, 3.7, 67, 4.3),
  createDesertData('Gingerbread', 356, 16.0, 49, 3.9)
] as const;

const DESERT_COLUMNS = [
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

<TableContainer
  as={Box}
  elevation={2}
  round="sm"
  style={{ maxHeight: '250px', overflowY: 'auto' }}
>
  <Table stickyHeader>
    <TableHead>
      <TableRow>
        {DESERT_COLUMNS.map((column) => {
          return (
            <TableCell key={column.field} align={getAlign(column.dataType)}>
              {column.headerName}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
    <TableBody>
      {DESERT_ROWS.map((row) => {
        return (
          <TableRow key={row.name}>
            {DESERT_COLUMNS.map((column) => {
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
`.trim()
      }
    }
  }
};

export const TableWithPagination: Story = {
  render: () => <TablePaginationTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
const createDesertData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) => {
  return { name, calories, fat, carbs, protein };
};

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

const MANY_DESERT_ROWS = [
  createDesertData('Cupcake', 305, 3.7, 67, 4.3),
  createDesertData('Donut', 452, 25.0, 51, 4.9),
  createDesertData('Eclair', 262, 16.0, 24, 6.0),
  createDesertData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDesertData('Gingerbread', 356, 16.0, 49, 3.9),
  createDesertData('Honeycomb', 408, 3.2, 87, 6.5),
  createDesertData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDesertData('Jelly Bean', 375, 0.0, 94, 0.0),
  createDesertData('KitKat', 518, 26.0, 65, 7.0),
  createDesertData('Lollipop', 392, 0.2, 98, 0.0),
  createDesertData('Marshmallow', 318, 0, 81, 2.0),
  createDesertData('Nougat', 360, 19.0, 9, 37.0),
  createDesertData('Oreo', 437, 18.0, 63, 4.0)
] as const;

const DESERT_COLUMNS = [
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

const TablePaginationTemplate = () => {
  const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    ROWS_PER_PAGE_OPTIONS[0]
  );

  const handlePageChange = (_: React.MouseEvent, selectedPage: number) => {
    setPage(selectedPage);
  };
  const handleRowsPerPageChange = (
    _: Event | React.SyntheticEvent,
    selectedRowPerPage: number
  ) => {
    setRowsPerPage(selectedRowPerPage);
  };

  const paginatedRows = MANY_DESERT_ROWS.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const emptyRows = Math.max(
    (page + 1) * rowsPerPage - MANY_DESERT_ROWS.length,
    0
  );

  return (
    <Box elevation={2} round="sm">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {DESERT_COLUMNS.map((column) => {
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
                  {DESERT_COLUMNS.map((column) => {
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
                  colSpan={DESERT_COLUMNS.length}
                  style={{ height: \`\${57 * emptyRows}px\` }}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={MANY_DESERT_ROWS.length}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      />
    </Box>
  );
};
`.trim()
      }
    }
  }
};

export const SortingTable: Story = {
  render: () => <SortableTableTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
const createDesertData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) => {
  return { name, calories, fat, carbs, protein };
};

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

const DESERT_ROWS = [
  createDesertData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDesertData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDesertData('Eclair', 262, 16.0, 24, 6.0),
  createDesertData('Cupcake', 305, 3.7, 67, 4.3),
  createDesertData('Gingerbread', 356, 16.0, 49, 3.9)
] as const;  
 
const DESERT_COLUMNS = [
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

const SortableTableTemplate = () => {
  const ORDER = ['asc', 'desc'] as const;
  const DEFAULT_ORDER = 'asc';
  const DEFAULT_ORDER_BY = DESERT_COLUMNS.find(
    (column) => column.sortable
  )?.field;
  const [order, setOrder] = useState<(typeof ORDER)[number]>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState<string | undefined>(DEFAULT_ORDER_BY);

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
    ? [...DESERT_ROWS].sort(getComparator(order, orderBy))
    : DESERT_ROWS;

  return (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table className="sortable-table">
        <TableHead>
          <TableRow>
            {DESERT_COLUMNS.map((column) => {
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
                        aria-label={\`order \${orderToChange === 'asc' ? 'ascending' : 'descending'}\`}
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
                {DESERT_COLUMNS.map((column) => {
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
`.trim()
      }
    }
  }
};

export const SelectingTable: Story = {
  render: () => <SelectableTableTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
const createDesertData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) => {
  return { name, calories, fat, carbs, protein };
};

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

const DESERT_ROWS = [
  createDesertData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDesertData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDesertData('Eclair', 262, 16.0, 24, 6.0),
  createDesertData('Cupcake', 305, 3.7, 67, 4.3),
  createDesertData('Gingerbread', 356, 16.0, 49, 3.9)
] as const;
 
const DESERT_COLUMNS = [
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

const SelectableTableTemplate = () => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const numSelected = selectedRows.size;

  const handleAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows(new Set(DESERT_ROWS.map((row) => row.name)));
    } else {
      setSelectedRows(new Set());
    }
  };
  const handleCheck = (rowName: string) => {
    const newSelectedRows = new Set(selectedRows);
    if (selectedRows.has(rowName)) newSelectedRows.delete(rowName);
    else newSelectedRows.add(rowName);
    setSelectedRows(newSelectedRows);
  };

  return (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                indeterminate={
                  numSelected > 0 && numSelected < DESERT_ROWS.length
                }
                checked={numSelected > 0 && numSelected === DESERT_ROWS.length}
                onChange={handleAllChecked}
              />
            </TableCell>
            {DESERT_COLUMNS.map((column) => {
              return (
                <TableCell key={column.field} align={getAlign(column.dataType)}>
                  {column.headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {DESERT_ROWS.map((row) => {
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
                {DESERT_COLUMNS.map((column) => {
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
`.trim()
      }
    }
  }
};

export const ColumnGrouping: Story = {
  render: () => (
    <TableContainer
      as={Box}
      elevation={2}
      round="sm"
      style={{ maxHeight: '500px', overflowY: 'auto' }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {COUNTRY_FIRST_COLUMNS.map(({ id, label, align, colSpan }) => {
              return (
                <TableCell key={id} align={align} colSpan={colSpan}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            {COUNTRY_SECOND_COLUMNS.map(({ id, label, align, minWidth }) => {
              return (
                <TableCell key={id} align={align} style={{ minWidth }}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {COUNTRY_ROWS.map((row) => {
            return (
              <TableRow key={row.name}>
                {COUNTRY_SECOND_COLUMNS.map(({ id, align, format }) => {
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
  ),
  parameters: {
    docs: {
      source: {
        code: `
const createCountryData = (
  name: string,
  code: string,
  population: number,
  size: number
): CountryData => {
  const density = population / size;
  return { name, code, population, size, density };
};

const COUNTRY_ROWS: CountryData[] = [
  createCountryData('India', 'IN', 1324171354, 3287263),
  createCountryData('China', 'CN', 1403500365, 9596961),
  createCountryData('Italy', 'IT', 60483973, 301340),
  createCountryData('United States', 'US', 327167434, 9833520),
  createCountryData('Canada', 'CA', 37602103, 9984670),
  createCountryData('Australia', 'AU', 25475400, 7692024),
  createCountryData('Germany', 'DE', 83019200, 357578),
  createCountryData('Ireland', 'IE', 4857000, 70273),
  createCountryData('Mexico', 'MX', 126577691, 1972550),
  createCountryData('Japan', 'JP', 126317000, 377973),
  createCountryData('France', 'FR', 67022000, 640679),
  createCountryData('United Kingdom', 'GB', 67545757, 242495),
  createCountryData('Russia', 'RU', 146793744, 17098246),
  createCountryData('Nigeria', 'NG', 200962417, 923768),
  createCountryData('Brazil', 'BR', 210147125, 8515767)
] as const;

const COUNTRY_FIRST_COLUMNS = [
  { id: 'country', label: 'Country', colSpan: 2, align: 'center' },
  { id: 'details', label: 'Details', colSpan: 3, align: 'center' }
] as const;

const COUNTRY_SECOND_COLUMNS: CountryColumn[] = [
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

<TableContainer
  as={Box}
  elevation={2}
  round="sm"
  style={{ maxHeight: '500px', overflowY: 'auto' }}
>
  <Table stickyHeader>
    <TableHead>
      <TableRow>
        {COUNTRY_FIRST_COLUMNS.map(({ id, label, align, colSpan }) => {
          return (
            <TableCell key={id} align={align} colSpan={colSpan}>
              {label}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        {COUNTRY_SECOND_COLUMNS.map(({ id, label, align, minWidth }) => {
          return (
            <TableCell key={id} align={align} style={{ minWidth }}>
              {label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
    <TableBody>
      {COUNTRY_ROWS.map((row) => {
        return (
          <TableRow key={row.name}>
            {COUNTRY_SECOND_COLUMNS.map(({ id, align, format }) => {
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
</TableContainer>`.trim()
      }
    }
  }
};

export const CollapsibleTable: Story = {
  render: () => <CollapsibleTableTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
type HistoryType = {
  date: string;
  customerId: string;
  amount: number;
  total: number;
};

const createDesertHistoryData = (
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

const DESERT_HISTORY_ROWS = [
  createDesertHistoryData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99, HISTORY),
  createDesertHistoryData(
    'Ice cream sandwich',
    237,
    9.0,
    37,
    4.3,
    4.99,
    HISTORY
  ),
  createDesertHistoryData('Eclair', 262, 16.0, 24, 6.0, 3.79, HISTORY),
  createDesertHistoryData('Cupcake', 305, 3.7, 67, 4.3, 2.5, HISTORY),
  createDesertHistoryData('Gingerbread', 356, 16.0, 49, 3.9, 1.5, HISTORY)
];

const DESERT_HISTORY_COLUMNS = [
  { headerName: 'Date', field: 'date', dataType: 'string' },
  { headerName: 'Customer', field: 'customerId', dataType: 'string' },
  { headerName: 'Amount', field: 'amount', dataType: 'number' },
  { headerName: 'Total', field: 'total', dataType: 'number' }
] as const;

const DESERT_COLUMNS = [
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

const PurchaseHistoryTable = ({ rows }: { rows: HistoryType[] }) => {
  return (
    <Table size="small" style={{ width: '100%' }}>
      <TableHead>
        <TableRow>
          {DESERT_HISTORY_COLUMNS.map(({ headerName, field, dataType }) => {
            return (
              <TableCell
                key={field}
                align={getAlign(dataType)}
                style={{ width: '25%' }}
              >
                {headerName}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((purchaseHistory) => {
          return (
            <TableRow key={purchaseHistory.date}>
              {DESERT_HISTORY_COLUMNS.map(({ field, dataType }) => {
                return (
                  <TableCell key={field} align={getAlign(dataType)}>
                    {purchaseHistory[field]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const CollapsibleTableTemplate = () => {
  const [openedRows, setOpenedRows] = useState<string[]>([]);

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
            {DESERT_COLUMNS.map(({ headerName, field, dataType }) => {
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
          {DESERT_HISTORY_ROWS.map((row) => {
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
                      aria-label={\`\${isOpened ? 'hide' : 'show'} purchase history\`}
                    >
                      {isOpened ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </ButtonBase>
                  </TableCell>
                  {DESERT_COLUMNS.map(({ field, dataType }) => {
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
                        <PurchaseHistoryTable rows={row.history} />
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
`.trim()
      }
    }
  }
};

export const SpanningTable: Story = {
  render: () => <SpanningTableTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
type OfficeData = {
  desc: string;
  qty: number;
  unit: number;
  price: number;
};

type OfficeColumn = {
  label: string;
  align: 'left' | 'center' | 'right';
  colSpan?: number;
};

const createOfficeData = (
  desc: string,
  qty: number,
  unit: number
): OfficeData => {
  const price = Number((qty * unit).toFixed(2));
  return { desc, qty, unit, price };
};

const OFFICE_ROWS = [
  createOfficeData('Paperclips (Box)', 100, 1.15),
  createOfficeData('Paper (Case)', 10, 45.99),
  createOfficeData('Waste Basket', 2, 17.99)
] as const;

const OFFICE_FIRST_COLUMNS: OfficeColumn[] = [
  { label: 'Details', align: 'center', colSpan: 3 },
  { label: 'Price', align: 'right' }
] as const;

const OFFICE_SECOND_COLUMNS = [
  { label: 'Desc', field: 'desc', align: 'left' },
  { label: 'Qty.', field: 'qty', align: 'right' },
  { label: 'Unit', field: 'unit', align: 'right' },
  { label: 'Sum', field: 'price', align: 'right' }
] as const;

const SpanningTableTemplate = () => {
  const TAX_RATE = 0.07;

  const ccyFormat = (num: number) => {
    return \`\${num.toFixed(2)}\`;
  };
  const subtotal = (items: readonly OfficeData[]) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  };

  const invoiceSubtotal = subtotal(OFFICE_ROWS);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table>
        <TableHead>
          <TableRow>
            {OFFICE_FIRST_COLUMNS.map(({ label, align, colSpan }) => {
              return (
                <TableCell key={label} align={align} colSpan={colSpan}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            {OFFICE_SECOND_COLUMNS.map(({ label, align, field }) => {
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
          {OFFICE_ROWS.map((row) => {
            return (
              <TableRow key={row.desc}>
                {OFFICE_SECOND_COLUMNS.map(({ align, field }) => {
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
            <TableCell align="right">{\`\${(TAX_RATE * 100).toFixed(0)} %\`}</TableCell>
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
`.trim()
      }
    }
  }
};

export const EditingTable: Story = {
  render: () => <EditingTableTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
type EmployeeRow = {
  dataId: number;
  name: string;
  age: number;
  createdDate: string;
  lastLogin: string;
};

type EmployeeColumn = {
  headerName: string;
  field: keyof EmployeeRow;
  dataType: 'text' | 'number' | 'date' | 'datetime-local';
  width: string;
  format?: (value: string) => string;
};

const createEmployeeData = (
  dataId: number,
  name: string,
  age: number,
  createdDate: string,
  lastLogin: string
) => {
  return { dataId, name, age, createdDate, lastLogin };
};

const EMPLOYEE_ROWS: EmployeeRow[] = [
  createEmployeeData(1, 'Flora Anderson', 25, '2025-10-25', '2026-04-22T13:17'),
  createEmployeeData(2, 'Julian Garza', 36, '2025-05-23', '2026-04-22T16:04'),
  createEmployeeData(3, 'Jeffery Rose', 19, '2025-06-19', '2026-04-22T16:46')
] as const;

const EMPLOYEE_COLUMNS: EmployeeColumn[] = [
  { headerName: 'Name', field: 'name', dataType: 'text', width: '200px' },
  {
    headerName: 'Age',
    field: 'age',
    dataType: 'number',
    width: '80px',
    format: (age: string) => new Intl.NumberFormat().format(Number(age))
  },
  {
    headerName: 'Date Created',
    field: 'createdDate',
    dataType: 'date',
    width: '150px',
    format: (date: string) =>
      new Intl.DateTimeFormat(navigator.language, {
        dateStyle: 'medium'
      }).format(new Date(date))
  },
  {
    headerName: 'Last Login',
    field: 'lastLogin',
    dataType: 'datetime-local',
    width: '250px',
    format: (date: string) =>
      new Intl.DateTimeFormat(navigator.language, {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(date))
  }
] as const;

const EditingTableTemplate = () => {
  type EditingCellType = {
    dataId: number;
    editingField: keyof EmployeeRow;
  };

  const [rows, setRows] = useState(EMPLOYEE_ROWS);
  const [editingCell, setEditingCell] = useState<EditingCellType | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const handleCellDoubleClick = ({
    dataId,
    editingField,
    rowIdx
  }: EditingCellType & { rowIdx: number }) => {
    setEditingCell({ dataId, editingField });
    setInputValue(String(rows[rowIdx][editingField]));
  };

  const handleBlur = (event: React.FocusEvent) => {
    const focusedEl = event.relatedTarget as Element;
    const currentTarget = event.currentTarget as Element;
    if (currentTarget.contains(focusedEl)) return;

    if (editingCell && inputValue) {
      const newRows = JSON.parse(JSON.stringify(rows));
      for (const row of newRows) {
        if (row.dataId === editingCell.dataId) {
          row[editingCell.editingField] = inputValue;
          break;
        }
      }
      setRows(newRows);
    }
    setEditingCell(null);
    setInputValue('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <TableContainer
      as={Box}
      elevation={2}
      round="sm"
      style={{ width: 'max-content' }}
    >
      <Table className="editing-table">
        <TableHead>
          <TableRow>
            {EMPLOYEE_COLUMNS.map((column) => {
              return (
                <TableCell
                  key={column.field}
                  align={column.dataType === 'text' ? 'left' : 'right'}
                >
                  {column.headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIdx) => {
            return (
              <TableRow key={row.name}>
                {EMPLOYEE_COLUMNS.map((column) => {
                  const isEditingRow = editingCell?.dataId === row.dataId;
                  const isEditingCell =
                    isEditingRow && editingCell?.editingField === column.field;
                  const cellData = column.format
                    ? column.format(String(row[column.field]))
                    : row[column.field];

                  return (
                    <TableCell
                      key={column.field}
                      tabIndex={0}
                      align={column.dataType === 'text' ? 'left' : 'right'}
                      scope={column.field === 'name' ? 'row' : undefined}
                      onDoubleClick={() =>
                        handleCellDoubleClick({
                          dataId: row.dataId,
                          editingField: column.field,
                          rowIdx
                        })
                      }
                      onBlur={handleBlur}
                      style={{
                        width: column.width,
                        minWidth: 'max-content',
                        userSelect: 'none',
                        ...(isEditingRow && {
                          paddingTop: '0px',
                          paddingBottom: '0px'
                        }),
                        ...(isEditingCell && {
                          padding: '0px',
                          outline: 'none'
                        })
                      }}
                    >
                      {isEditingCell ? (
                        <Input
                          type={column.dataType}
                          value={inputValue}
                          onChange={handleInputChange}
                          {...(column.dataType === 'number' && { min: 0 })}
                          style={{
                            width: column.width,
                            minWidth: column.width,
                            height: '57px',
                            elevation: 3
                          }}
                        />
                      ) : (
                        cellData
                      )}
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
`.trim()
      }
    }
  }
};

export const FilteringTable: Story = {
  render: () => <></>,
  parameters: {
    docs: {
      source: {
        code: ``.trim()
      }
    }
  }
};

export const Customization: Story = {
  render: () => (
    <TableContainer as={Box} elevation={2} round="sm">
      <Table className="custom-table">
        <TableHead>
          <TableRow>
            {DESERT_COLUMNS.map((column) => {
              return (
                <TableCell key={column.field} align={getAlign(column.dataType)}>
                  {column.headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {DESERT_ROWS.map((row) => {
            return (
              <TableRow key={row.name}>
                {DESERT_COLUMNS.map((column) => {
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
  ),
  parameters: {
    docs: {
      source: {
        code: `
<TableContainer as={Box} elevation={2} round="sm">
  <Table className="custom-table">
    <TableHead>
      <TableRow>
        {DESERT_COLUMNS.map((column) => {
          return (
            <TableCell key={column.field} align={getAlign(column.dataType)}>
              {column.headerName}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
    <TableBody>
      {DESERT_ROWS.map((row) => {
        return (
          <TableRow key={row.name}>
            {DESERT_COLUMNS.map((column) => {
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
`.trim()
      }
    }
  }
};
