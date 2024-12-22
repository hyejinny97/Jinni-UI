import { ThemeModeType } from '@/types/theme-mode';

export const getOverlayType = ({ themeMode }: { themeMode: ThemeModeType }) => {
  switch (themeMode) {
    case 'light':
      return 'blackOverlay';
    case 'dark':
      return 'whiteOverlay';
  }
};
