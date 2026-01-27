import { useContext } from 'react';
import ListContext from './List.contexts';

export const useList = () => {
  const value = useContext(ListContext);
  return value;
};
