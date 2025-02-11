import { useContext } from 'react';
import ExpandContext from './Accordion.contexts';

export const useExpand = () => {
  const value = useContext(ExpandContext);
  if (!value) throw Error('ExpandContext value is null');
  return value;
};
