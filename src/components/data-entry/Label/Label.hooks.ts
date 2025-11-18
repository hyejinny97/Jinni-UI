import { useContext } from 'react';
import LabelContext from './Label.contexts';

export const useLabelContext = () => {
  const value = useContext(LabelContext);
  return value;
};
