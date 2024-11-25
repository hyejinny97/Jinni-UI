import { useContext } from 'react';
import JinniContext from '@/contexts/JinniContext';

const useJinni = () => {
  const jinni = useContext(JinniContext);
  if (!jinni) throw Error('JinniContext value is null');
  return jinni;
};

export default useJinni;
