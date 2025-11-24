import { describe, it, expect, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@/tests/react-testing-tools';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import {
  SwipeableDrawer,
  SwipeableDrawerHeader,
  SwipeableDrawerBody,
  SwipeableDrawerFooter
} from '.';
import { Button } from '@/components/general/Button';

describe('<SwipeableDrawer />', () => {
  it('opens when trigger button is clicked', async () => {
    const TestToggle = () => {
      const [open, setOpen] = useState(false);

      const openDrawer = () => {
        setOpen(true);
      };
      const closeDrawer = () => {
        setOpen(false);
      };

      return (
        <>
          <Button onClick={openDrawer}>Open</Button>
          <SwipeableDrawer open={open} onClose={closeDrawer}>
            <SwipeableDrawerHeader>Drawer Header</SwipeableDrawerHeader>
            <SwipeableDrawerBody>Drawer Body</SwipeableDrawerBody>
            <SwipeableDrawerFooter>
              <Button onClick={closeDrawer}>Close</Button>
            </SwipeableDrawerFooter>
          </SwipeableDrawer>
        </>
      );
    };
    render(<TestToggle />);

    const drawerContainer = screen.getByTestId('swipeable-drawer-container');
    const drawerEl = screen.getByRole('dialog');
    expect(drawerContainer).toBeInTheDocument();

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    expect(drawerContainer).toHaveStyle('visibility: visible');

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    fireEvent.transitionEnd(drawerEl);
    await waitFor(() => {
      expect(drawerContainer).toHaveStyle('visibility: hidden');
    });
  });

  it('calls onClose with reason "escapeKeydown" when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const TestToggle = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open</Button>
          <SwipeableDrawer open={open} onClose={onClose}>
            <SwipeableDrawerHeader>Drawer Header</SwipeableDrawerHeader>
            <SwipeableDrawerBody>Drawer Body</SwipeableDrawerBody>
          </SwipeableDrawer>
        </>
      );
    };
    render(<TestToggle />);

    const drawerContainer = screen.getByTestId('swipeable-drawer-container');
    expect(drawerContainer).toBeInTheDocument();

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    expect(drawerContainer).toHaveStyle('visibility: visible');

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('escapeKeydown');
  });

  it('calls onClose with reason "backdropClick" when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const TestToggle = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open</Button>
          <SwipeableDrawer open={open} onClose={onClose}>
            <SwipeableDrawerHeader>Drawer Header</SwipeableDrawerHeader>
            <SwipeableDrawerBody>Drawer Body</SwipeableDrawerBody>
          </SwipeableDrawer>
        </>
      );
    };
    render(<TestToggle />);

    const drawerContainer = screen.getByTestId('swipeable-drawer-container');
    expect(drawerContainer).toBeInTheDocument();

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    expect(drawerContainer).toHaveStyle('visibility: visible');

    const backdrop = screen.getByTestId('swipeable-drawer-backdrop');
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('backdropClick');
  });

  it('prevents outside interaction when drawer is open and Tab or Shift+Tab is pressed (focus trap)', async () => {
    const user = userEvent.setup();
    const TestToggle = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open</Button>
          <SwipeableDrawer open={open}>
            <SwipeableDrawerHeader>Drawer Header</SwipeableDrawerHeader>
            <SwipeableDrawerBody>Drawer Body</SwipeableDrawerBody>
            <SwipeableDrawerFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
              <Button onClick={() => setOpen(false)}>Ok</Button>
            </SwipeableDrawerFooter>
          </SwipeableDrawer>
        </>
      );
    };
    render(<TestToggle />);

    const drawerContainer = screen.getByTestId('swipeable-drawer-container');
    expect(drawerContainer).toBeInTheDocument();

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    expect(drawerContainer).toHaveStyle('visibility: visible');

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
