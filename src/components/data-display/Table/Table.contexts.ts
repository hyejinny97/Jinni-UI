import { createContext } from 'react';
import { TableProps } from './Table';

type TableContextProps = Pick<TableProps, 'size' | 'stickyHeader'>;

const TableContext = createContext<TableContextProps | null>(null);

export default TableContext;
