import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { JinniProvider } from '@/components/_share/JinniProvider';
import '@/styles/color.scss';
import '@/styles/typography.scss';
import '@/styles/breakpoint.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JinniProvider>
      <App />
    </JinniProvider>
  </StrictMode>
);
