import { useContext } from 'react';
import { TableHeadContext } from './TableHead.contexts';

export const useTableHead = () => useContext(TableHeadContext);
