import { useMemo } from 'react';
import JinniContext, {
  JinniContextType,
  JinniContextDesignSystemType
} from '@/contexts/JinniContext';
import { ELEVATION_LEVELS } from '@/constants/elevation';
import { DesignSystemType } from './JinniProvider.types';
import { useAddStyleTag, useTheme, useContrast } from './JinniProvider.hooks';

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
  const { computedContrast, changeContrast } = useContrast({
    contrast: designSystem.contrast
  });

  const computedDesignSystem = useMemo<JinniContextDesignSystemType>(() => {
    const { color, boxShadow, whiteOverlay } = designSystem;
    return {
      ...designSystem,
      theme: computedTheme,
      contrast: computedContrast,
      color: {
        scheme: color.scheme[computedTheme][computedContrast],
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
  }, [designSystem, computedTheme, computedContrast]);

  useAddStyleTag({ computedDesignSystem });

  return (
    <JinniContext.Provider
      value={{ ...computedDesignSystem, changeTheme, changeContrast }}
    >
      {children}
    </JinniContext.Provider>
  );
};

export default JinniProvider;
