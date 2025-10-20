import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { ResizeObserverMock } from './src/tests/mocks/observer.mock.tsx';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

vi.stubGlobal('ResizeObserver', ResizeObserverMock);
