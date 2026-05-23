import '@testing-library/jest-dom/vitest';
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import {
  JinniProvider,
  createDesignSystem
} from '@/components/_share/JinniProvider';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const designSystem = createDesignSystem();
    return (
      <JinniProvider designSystem={designSystem}>{children}</JinniProvider>
    );
  };
  return render(ui, { wrapper: Wrapper, ...options });
};

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };
