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

// Popover 테스트
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import { userEvent } from '@testing-library/user-event';
import { useRef, useState } from 'react';
import Popover from './Popover';
import { Button } from '@/components/general/Button';

describe('<Popover />', () => {
  it('opens when trigger button is clicked', async () => {
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Popover
            anchorElRef={anchorElRef}
            open={open}
            onClose={() => setOpen(false)}
          >
            Popover content
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Popover>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const popover = screen.getByRole('dialog');
    expect(popover).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose with reason "escapeKeyDown" when Escape is pressed', () => {
    const onClose = vi.fn();
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Popover anchorElRef={anchorElRef} open={open} onClose={onClose}>
            Popover content
            <Button onClick={onClose}>Close</Button>
          </Popover>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const popover = screen.getByRole('dialog');
    expect(popover).toBeInTheDocument();

    fireEvent.keyDown(popover, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('escapeKeyDown');
  });

  it('calls onClose with reason "backdropClick" when Backdrop is clicked', () => {
    const onClose = vi.fn();
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Popover anchorElRef={anchorElRef} open={open} onClose={onClose}>
            Popover content
            <Button onClick={onClose}>Close</Button>
          </Popover>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const popover = screen.getByRole('dialog');
    expect(popover).toBeInTheDocument();

    const backdrop = screen.getByTestId('popover-backdrop');
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('backdropClick');
  });

  it('prevents outside interaction when popover is open and Tab or Shift+Tab is pressed (focus trap)', async () => {
    const user = userEvent.setup();
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Popover
            anchorElRef={anchorElRef}
            open={open}
            onClose={() => setOpen(false)}
          >
            Popover content
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button onClick={() => setOpen(false)}>Ok</Button>
          </Popover>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const popover = screen.getByRole('dialog');
    expect(popover).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close/i });
    const okBtn = screen.getByRole('button', { name: /ok/i });
    expect(closeBtn).toHaveFocus();

    await user.tab();
    expect(okBtn).toHaveFocus();

    await user.tab();
    expect(closeBtn).toHaveFocus();

    await user.tab({ shift: true });
    expect(okBtn).toHaveFocus();

    await user.tab({ shift: true });
    expect(closeBtn).toHaveFocus();
  });
});
