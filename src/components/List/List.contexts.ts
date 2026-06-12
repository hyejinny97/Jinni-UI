import { createContext } from 'react';
import { ListProps } from './List';

type ListContextProps = Required<Pick<ListProps, 'dense'>>;

const ListContext = createContext<ListContextProps | null>(null);

export default ListContext;
