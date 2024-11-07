import { JinniColorContext } from '@/contexts/JinniColorContext';
import { JinniColorType } from '@/types/jinni-color';
import { getColorValue } from '@/utils/getColorValue';

const JinniColorProvider = ({ children }: { children: React.ReactNode }) => {
  const color: JinniColorType = {
    theme: {
      primary: getColorValue('--jinni-color-primary')
    },
    palette: {
      yellow: {
        50: getColorValue('--jinni-color-yellow-50'),
        400: getColorValue('--jinni-color-yellow-400')
      }
    }
  };

  return (
    <JinniColorContext.Provider value={color}>
      {children}
    </JinniColorContext.Provider>
  );
};

export default JinniColorProvider;
