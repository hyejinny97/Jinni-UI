import { useContext } from 'react';
import { TableHeadContext } from './Table.contexts';

export const useTableHead = () => useContext(TableHeadContext);
