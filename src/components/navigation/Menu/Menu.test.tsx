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

// Menu 테스트
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import { userEvent } from '@testing-library/user-event';
import { useRef, useState } from 'react';
import Menu from './Menu';
import { MenuItem } from '@/components/navigation/MenuItem';
import { Button } from '@/components/general/Button';

describe('<Menu />', () => {
  it('opens when trigger button is clicked', async () => {
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Menu
            anchorElRef={anchorElRef}
            open={open}
            onClose={() => setOpen(false)}
          >
            <MenuItem onClick={() => setOpen(false)}>Item A</MenuItem>
            <MenuItem onClick={() => setOpen(false)}>Item B</MenuItem>
          </Menu>
        </>
      );
    };
    render(<TestToggle />);
    const triggerBtn = screen.getByRole('button', { name: /open/i });

    fireEvent.click(triggerBtn);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    const menuItem = screen.getByText('Item A');
    fireEvent.click(menuItem);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
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
          <Menu anchorElRef={anchorElRef} open={open} onClose={onClose}>
            <MenuItem>Item A</MenuItem>
            <MenuItem>Item B</MenuItem>
          </Menu>
        </>
      );
    };
    render(<TestToggle />);
    const triggerBtn = screen.getByRole('button', { name: /open/i });

    fireEvent.click(triggerBtn);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    fireEvent.keyDown(menu, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('escapeKeyDown');
  });

  it('calls onClose with reason "tabKeyDown" when Tab is pressed', () => {
    const onClose = vi.fn();
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Menu anchorElRef={anchorElRef} open={open} onClose={onClose}>
            <MenuItem>Item A</MenuItem>
            <MenuItem>Item B</MenuItem>
          </Menu>
        </>
      );
    };
    render(<TestToggle />);
    const triggerBtn = screen.getByRole('button', { name: /open/i });

    fireEvent.click(triggerBtn);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    fireEvent.keyDown(menu, { key: 'Tab', code: 'Tab' });
    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('tabKeyDown');
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
          <Menu anchorElRef={anchorElRef} open={open} onClose={onClose}>
            <MenuItem>Item A</MenuItem>
            <MenuItem>Item B</MenuItem>
          </Menu>
        </>
      );
    };
    render(<TestToggle />);
    const triggerBtn = screen.getByRole('button', { name: /open/i });

    fireEvent.click(triggerBtn);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    const backdrop = screen.getByTestId('menu-backdrop');
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('backdropClick');
  });

  it('moves focus between menu items with arrow keys', async () => {
    const user = userEvent.setup();
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Menu
            anchorElRef={anchorElRef}
            open={open}
            onClose={() => setOpen(false)}
          >
            <MenuItem>Item A</MenuItem>
            <MenuItem>Item B</MenuItem>
          </Menu>
        </>
      );
    };
    render(<TestToggle />);
    const triggerBtn = screen.getByRole('button', { name: /open/i });

    await user.click(triggerBtn);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    const menuItems = screen.getAllByRole('menuitem');
    menuItems[0].focus();
    expect(menuItems[0]).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(menuItems[1]).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(menuItems[0]).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(menuItems[1]).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(menuItems[0]).toHaveFocus();
  });

  it('moves focus to the menu item that starts with the pressed key', async () => {
    const user = userEvent.setup();
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Menu
            anchorElRef={anchorElRef}
            open={open}
            onClose={() => setOpen(true)}
          >
            <MenuItem>Apple</MenuItem>
            <MenuItem>Banana</MenuItem>
            <MenuItem>Melon</MenuItem>
          </Menu>
        </>
      );
    };
    render(<TestToggle />);
    const triggerBtn = screen.getByRole('button', { name: /open/i });

    await user.click(triggerBtn);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    const menuItems = screen.getAllByRole('menuitem');
    await user.keyboard('B');
    expect(menuItems[1]).toHaveFocus();

    await user.keyboard('A');
    expect(menuItems[0]).toHaveFocus();

    await user.keyboard('M');
    expect(menuItems[2]).toHaveFocus();
  });

  it('selects the menu item when Enter key(or Space key) is pressed', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const TestToggle = () => {
      const anchorElRef = useRef<HTMLElement | null>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open
          </Button>
          <Menu
            anchorElRef={anchorElRef}
            open={open}
            onClose={() => setOpen(false)}
          >
            <MenuItem onClick={onClick}>Item A</MenuItem>
            <MenuItem onClick={() => setOpen(false)}>Item B</MenuItem>
          </Menu>
        </>
      );
    };
    render(<TestToggle />);
    const triggerBtn = screen.getByRole('button', { name: /open/i });

    await user.click(triggerBtn);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    const menuItem = screen.getByRole('menuitem', { name: 'Item A' });
    menuItem.focus();
    expect(menuItem).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();

    await user.keyboard('{ }');
    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
