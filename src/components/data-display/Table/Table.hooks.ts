import { useContext } from 'react';
import TableContext from './Table.contexts';

export const useTable = () => useContext(TableContext);
