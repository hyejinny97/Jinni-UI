import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import {
  JinniProvider,
  createDesignSystem
} from '@/components/_share/JinniProvider';

const designSystem = createDesignSystem();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JinniProvider designSystem={designSystem}>
      <App />
    </JinniProvider>
  </StrictMode>
);
