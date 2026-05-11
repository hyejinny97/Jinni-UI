import { useEffect, useLayoutEffect } from 'react';
import useJinni from '../src/hooks/useJinni';
import { JinniContextType } from '../src/contexts/JinniContext';

const STORAGE_THEME_KEY = 'jinni-theme';
const STORAGE_CONTRAST_KEY = 'jinni-contrast';

const isThemeValue = (value: string | null): boolean =>
  !!value && ['light', 'dark'].some((theme) => theme === value);
const isContrastValue = (value: string | null): boolean =>
  !!value &&
  ['standard', 'medium', 'high'].some((contrast) => contrast === value);

const ChangeThemeContrastByStorage = () => {
  const value = useJinni();
  const { theme, contrast, changeTheme, changeContrast } =
    value as JinniContextType;

  useLayoutEffect(() => {
    const currentTheme = sessionStorage.getItem(STORAGE_THEME_KEY);
    const currentContrast = sessionStorage.getItem(STORAGE_CONTRAST_KEY);
    if (isThemeValue(currentTheme) && currentTheme !== theme) {
      changeTheme(currentTheme);
    }
    if (isContrastValue(currentContrast) && currentContrast !== contrast) {
      changeContrast(currentContrast);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === sessionStorage) {
        const { newValue, oldValue } = event;
        if (oldValue === newValue) return;

        switch (event.key) {
          case STORAGE_THEME_KEY:
            if (isThemeValue(newValue)) {
              changeTheme(newValue);
            }
            break;
          case STORAGE_CONTRAST_KEY:
            if (isContrastValue(newValue)) {
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
