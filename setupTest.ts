import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { ResizeObserverMock } from './src/tests/mocks/observer.mock.tsx';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Mock Element.prototype.scroll for jsdom test environment
if (!Element.prototype.scroll) {
  Object.defineProperty(Element.prototype, 'scroll', {
    value: vi.fn(),
    configurable: true,
    writable: true
  });
}
