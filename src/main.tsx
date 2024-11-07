import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@/styles/color.scss';
import JinniColorProvider from '@/components/JinniColorProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JinniColorProvider>
      <App />
    </JinniColorProvider>
  </StrictMode>
);
