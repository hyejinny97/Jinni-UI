// Transition 제거
import * as motionMock from '@/tests/mocks/motion.mock.tsx';

vi.mock('@/components/motion/Motion', () => ({
  __esModule: true,
  Motion: motionMock.Motion
}));

vi.mock('@/components/motion/AnimatePresence', () => ({
  __esModule: true,
  AnimatePresence: motionMock.AnimatePresence
}));

// Tooltip 테스트
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import Tooltip from './Tooltip';

describe('<Tooltip />', () => {
  it('opens the tooltip on mouse enter and closes it on mouse leave', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    render(
      <Tooltip content="contents" onOpen={onOpen} onClose={onClose}>
        <button>anchor</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'anchor' });
    fireEvent.mouseEnter(button);
    const tooltip = screen.getByRole('tooltip', { name: 'contents' });
    expect(tooltip).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalled();

    fireEvent.mouseLeave(button);
    expect(
      screen.queryByRole('tooltip', { name: 'contents' })
    ).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });

  it('opens the tooltip on focus and closes it on blur', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    render(
      <Tooltip content="contents" onOpen={onOpen} onClose={onClose}>
        <button>anchor</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'anchor' });
    fireEvent.focus(button);
    const tooltip = screen.getByRole('tooltip', { name: 'contents' });
    expect(tooltip).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalled();

    fireEvent.blur(button);
    expect(
      screen.queryByRole('tooltip', { name: 'contents' })
    ).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });

  it('opens the tooltip on anchor click and closes it on background click', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    render(
      <Tooltip content="contents" onOpen={onOpen} onClose={onClose}>
        <button>anchor</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'anchor' });
    fireEvent.click(button);
    const tooltip = screen.getByRole('tooltip', { name: 'contents' });
    expect(tooltip).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalled();

    fireEvent.click(tooltip);
    expect(tooltip).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(
      screen.queryByRole('tooltip', { name: 'contents' })
    ).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });

  it('renders when open prop is true (controlled)', () => {
    render(
      <Tooltip content="contents" open>
        <button>anchor</button>
      </Tooltip>
    );

    const tooltip = screen.getByRole('tooltip', { name: 'contents' });
    expect(tooltip).toBeInTheDocument();
  });
});
