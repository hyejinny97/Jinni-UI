import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '.';
import { Button } from '@/components/general/Button';

describe('<Drawer />', () => {
  it('opens when trigger button is clicked', () => {
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
          <Drawer open={open} onClose={closeDrawer}>
            <DrawerHeader>Drawer Header</DrawerHeader>
            <DrawerBody>Drawer Body</DrawerBody>
            <DrawerFooter>
              <Button onClick={closeDrawer}>Close</Button>
            </DrawerFooter>
          </Drawer>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);

    const drawer = screen.getByRole('dialog');
    const drawerHeader = screen.getByText('Drawer Header');
    const drawerBody = screen.getByText('Drawer Body');
    expect(drawer).toBeInTheDocument();
    expect(drawerHeader).toBeInTheDocument();
    expect(drawerBody).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose with reason "escapeKeydown" when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const TestToggle = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Drawer open={open} onClose={onClose}>
            <DrawerHeader>Drawer Header</DrawerHeader>
            <DrawerBody>Drawer Body</DrawerBody>
          </Drawer>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);

    const drawer = screen.getByRole('dialog');
    expect(drawer).toBeInTheDocument();

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
          <Drawer open={open} onClose={onClose}>
            <DrawerHeader>Drawer Header</DrawerHeader>
            <DrawerBody>Drawer Body</DrawerBody>
          </Drawer>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);

    const drawer = screen.getByRole('dialog');
    expect(drawer).toBeInTheDocument();

    const backdrop = screen.getByTestId('drawer-backdrop');
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
          <Drawer open={open}>
            <DrawerHeader>Drawer Header</DrawerHeader>
            <DrawerBody>Drawer Body</DrawerBody>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
              <Button onClick={() => setOpen(false)}>Ok</Button>
            </DrawerFooter>
          </Drawer>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);

    const drawer = screen.getByRole('dialog');
    expect(drawer).toBeInTheDocument();

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

  it('renders the permanent drawer always visible on the screen', () => {
    render(
      <Drawer variant="permanent">
        <DrawerHeader>Drawer Header</DrawerHeader>
        <DrawerBody>Drawer Body</DrawerBody>
      </Drawer>
    );

    const drawerHeader = screen.getByText('Drawer Header');
    const drawerBody = screen.getByText('Drawer Body');
    expect(drawerHeader).toBeInTheDocument();
    expect(drawerBody).toBeInTheDocument();
  });
});
