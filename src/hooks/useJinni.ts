import { useContext } from 'react';
import JinniContext from '@/contexts/JinniContext';

const useJinni = () => {
  const jinni = useContext(JinniContext);
  if (!jinni)
    throw Error(
      'JinniProvider로 root 컴포넌트를 감싸야 JinniUI 컴포넌트를 사용할 수 있습니다. (JinniContext value is null)'
    );
  return jinni;
};

export default useJinni;
