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

// Toast 테스트
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import { userEvent } from '@testing-library/user-event';
import { useRef, useState } from 'react';
import Toast from './Toast';
import { Button } from '@/components/general/Button';
import { Alert } from '@/components/feedback/Alert';

describe('<Toast />', () => {
  it('opens when trigger button is clicked', () => {
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Toast
            open={open}
            onClose={() => setOpen(false)}
            message="Toast Message"
            action={<Button onClick={() => setOpen(false)}>Close</Button>}
          />
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const toast = screen.getByRole('alert');
    const toastContent = screen.getByText('Toast Message');
    expect(toast).toBeInTheDocument();
    expect(toastContent).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('calls onClose with reason "escapeKeydown" when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Toast open={open} onClose={onClose} message="Toast Message" />
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const toast = screen.getByRole('alert');
    expect(toast).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('escapeKeydown');
  });

  it('calls onClose with reason "backgroundClick" when background is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Toast open={open} onClose={onClose} message="Toast Message" />
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const toast = screen.getByRole('alert');
    expect(toast).toBeInTheDocument();

    await user.click(document.body);
    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('backgroundClick');
  });

  it('calls onClose with reason "timeout" when autoHideDuration elapses', async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Toast
            open={open}
            onClose={onClose}
            message="Toast Message"
            autoHideDuration={2}
          />
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const toast = screen.getByRole('alert');
    expect(toast).toBeInTheDocument();

    vi.advanceTimersByTime(2000);
    await vi.runAllTimersAsync?.();

    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('timeout');

    vi.useRealTimers();
  });

  it('renders children when they are provided', () => {
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Toast open={open} onClose={() => setOpen(false)}>
            <Alert>Alert Message</Alert>
          </Toast>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const alertMessage = screen.getByText('Alert Message');
    expect(alertMessage).toBeInTheDocument();
  });
});
