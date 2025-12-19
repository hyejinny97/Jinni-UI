import { useContext } from 'react';
import ButtonGroupContext from './ButtonGroup.contexts';

export const useButtonGroupContext = () => {
  const value = useContext(ButtonGroupContext);
  return value;
};
