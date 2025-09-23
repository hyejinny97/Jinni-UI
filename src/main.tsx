import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { JinniProvider } from '@/components/_share/JinniProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JinniProvider>
      <App />
    </JinniProvider>
  </StrictMode>
);
