'use client';

import { useMemo } from 'react';
import JinniContext, {
  JinniContextDesignSystemType
} from '@/contexts/JinniContext';
import { DesignSystemType } from './JinniProvider.types';
import {
  useAddStyleTag,
  useTheme,
  useContrast,
  useOverlay
} from './JinniProvider.hooks';

export interface JinniProviderProps {
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
  const { whiteOverlay, blackOverlay } = useOverlay({
    overlayAlpha: designSystem.overlayAlpha
  });

  const computedDesignSystem = useMemo<JinniContextDesignSystemType>(() => {
    const { color, boxShadow } = designSystem;
    return {
      ...designSystem,
      theme: computedTheme,
      contrast: computedContrast,
      color: {
        scheme: color.scheme[computedTheme][computedContrast],
        palette: color.palette
      },
      whiteOverlay,
      blackOverlay,
      elevation: Object.fromEntries(
        Object.keys(boxShadow)
          .map((key) => {
            if (!whiteOverlay[key]) return false;
            return [
              key,
              {
                'box-shadow': boxShadow[key],
                ...(computedTheme === 'dark' && {
                  'background-image': whiteOverlay[key]
                })
              }
            ];
          })
          .filter((val) => val !== false)
      )
    };
  }, [
    designSystem,
    computedTheme,
    computedContrast,
    whiteOverlay,
    blackOverlay
  ]);

  useAddStyleTag({ computedDesignSystem });

  return (
    <JinniContext
      value={{ ...computedDesignSystem, changeTheme, changeContrast }}
    >
      {children}
    </JinniContext>
  );
};

export default JinniProvider;
