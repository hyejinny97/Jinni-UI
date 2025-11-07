import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '.';
import { Button } from '@/components/general/Button';

describe('<Toast />', () => {
  it('opens when trigger button is clicked', () => {
    const TestToggle = () => {
      const [open, setOpen] = useState(false);

      const openModal = () => {
        setOpen(true);
      };
      const closeModal = () => {
        setOpen(false);
      };

      return (
        <>
          <Button onClick={openModal}>Open</Button>
          <Modal open={open} onClose={closeModal}>
            <ModalHeader>Modal Header</ModalHeader>
            <ModalBody>Modal Body</ModalBody>
            <ModalFooter>
              <Button onClick={closeModal}>Close</Button>
            </ModalFooter>
          </Modal>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const modal = screen.getByRole('dialog');
    const modalHeader = screen.getByText('Modal Header');
    const modalBody = screen.getByText('Modal Body');
    expect(modal).toBeInTheDocument();
    expect(modalHeader).toBeInTheDocument();
    expect(modalBody).toBeInTheDocument();

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
          <Modal open={open} onClose={onClose}>
            <ModalHeader>Modal Header</ModalHeader>
            <ModalBody>Modal Body</ModalBody>
          </Modal>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

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
          <Modal open={open} onClose={onClose}>
            <ModalHeader>Modal Header</ModalHeader>
            <ModalBody>Modal Body</ModalBody>
          </Modal>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    await user.click(modal);
    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('backdropClick');
  });

  it('prevents outside interaction when modal is open and Tab or Shift+Tab is pressed (focus trap)', async () => {
    const user = userEvent.setup();
    const TestToggle = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Modal open={open}>
            <ModalHeader>Modal Header</ModalHeader>
            <ModalBody>Modal Body</ModalBody>
            <ModalFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
              <Button onClick={() => setOpen(false)}>Ok</Button>
            </ModalFooter>
          </Modal>
        </>
      );
    };
    render(<TestToggle />);

    const triggerBtn = screen.getByRole('button', { name: /open/i });
    fireEvent.click(triggerBtn);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

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
