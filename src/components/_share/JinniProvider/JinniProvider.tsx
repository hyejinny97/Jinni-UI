import { useMemo } from 'react';
import JinniContext, {
  JinniContextType,
  JinniContextDesignSystemType
} from '@/contexts/JinniContext';
import { ELEVATION_LEVELS } from '@/constants/elevation';
import { DesignSystemType } from './JinniProvider.types';
import { useAddStyleTag, useTheme } from './JinniProvider.hooks';

interface JinniProviderProps {
  children: React.ReactNode;
  designSystem: DesignSystemType;
  useSystemColorScheme?: boolean;
}

const JinniProvider = ({
  children,
  designSystem,
  useSystemColorScheme
}: JinniProviderProps) => {
  const { computedTheme, changeTheme } = useTheme({
    theme: designSystem.theme,
    useSystemColorScheme
  });

  const computedDesignSystem = useMemo<JinniContextDesignSystemType>(() => {
    const { contrast, color, boxShadow, whiteOverlay } = designSystem;

    return {
      ...designSystem,
      theme: computedTheme,
      color: {
        scheme: color.scheme[computedTheme][contrast],
        palette: color.palette
      },
      elevation: ELEVATION_LEVELS.map((level) =>
        computedTheme === 'dark'
          ? {
              'box-shadow': boxShadow[level],
              'background-image': whiteOverlay[level]
            }
          : {
              'box-shadow': boxShadow[level]
            }
      ).reduce(
        (acc, value, idx) => ({ ...acc, [idx]: value }),
        {} as JinniContextType['elevation']
      )
    };
  }, [designSystem, computedTheme]);

  useAddStyleTag({ computedDesignSystem });

  return (
    <JinniContext.Provider value={{ ...computedDesignSystem, changeTheme }}>
      {children}
    </JinniContext.Provider>
  );
};

export default JinniProvider;
