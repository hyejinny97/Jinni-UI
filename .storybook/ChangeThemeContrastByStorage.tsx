import { useEffect } from 'react';
import useJinni from '../src/hooks/useJinni';
import { JinniContextType } from '../src/contexts/JinniContext';

const STORAGE_THEME_KEY = 'jinni-theme';
const STORAGE_CONTRAST_KEY = 'jinni-contrast';

const ChangeThemeContrastByStorage = () => {
  const value = useJinni();
  const { changeTheme, changeContrast } = value as JinniContextType;

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === sessionStorage) {
        const { newValue } = event;
        switch (event.key) {
          case STORAGE_THEME_KEY:
            if (['light', 'dark'].some((theme) => theme === newValue)) {
              changeTheme(newValue);
            }
            break;
          case STORAGE_CONTRAST_KEY:
            if (
              ['standard', 'medium', 'high'].some(
                (contrast) => contrast === newValue
              )
            ) {
              changeContrast(newValue);
            }
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [changeTheme, changeContrast]);

  return null;
};

export default ChangeThemeContrastByStorage;
