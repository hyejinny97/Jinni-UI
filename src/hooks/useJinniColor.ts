import { useContext } from 'react';
import { JinniColorContext } from '@/contexts/JinniColorContext';

const useJinniColor = () => {
  const color = useContext(JinniColorContext);
  if (!color) throw Error('JinniColorContext value is null');
  return color;
};

export default useJinniColor;
