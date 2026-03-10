import { describe, it, expect } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@/tests/react-testing-tools';
import { useState } from 'react';
import TimePicker from './TimePicker';

describe('<TimePicker />', () => {
  it('renders time picker', () => {
    render(<TimePicker />);

    const group = screen.getByRole('group', { name: /Time Picker/i });
    expect(group).toBeInTheDocument();
  });

  it('renders with defaultValue', () => {
    render(<TimePicker defaultValue={new Date(1970, 0, 1, 10, 30)} />);

    expect(screen.getByDisplayValue(/10:30/)).toBeInTheDocument();
  });

  it('handles controlled value', async () => {
    const ControlledTimePicker = () => {
      const [time, setTime] = useState<Date | null>(
        new Date(1970, 0, 1, 10, 30)
      );
      return (
        <TimePicker value={time} onChange={(newValue) => setTime(newValue)} />
      );
    };
    render(<ControlledTimePicker />);

    expect(screen.getByDisplayValue(/10:30/)).toBeInTheDocument();
  });

  it('opens popover when clicking the open button', async () => {
    render(<TimePicker />);

    const openButton = screen.getByRole('button', { name: /Choose Time/i });
    fireEvent.click(openButton);
    await waitFor(() => {
      expect(openButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('closes popover when clicking OK button', async () => {
    render(<TimePicker />);

    const openButton = screen.getByRole('button', { name: /Choose Time/i });
    fireEvent.click(openButton);
    await waitFor(() => {
      expect(openButton).toHaveAttribute('aria-expanded', 'true');
    });

    const okButton = screen.getByRole('button', { name: /OK/i });
    fireEvent.click(okButton);
    await waitFor(() => {
      expect(openButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('closes popover when clicking Cancel button', async () => {
    render(<TimePicker />);

    const openButton = screen.getByRole('button', { name: /Choose Time/i });
    fireEvent.click(openButton);
    await waitFor(() => {
      expect(openButton).toHaveAttribute('aria-expanded', 'true');
    });

    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);
    await waitFor(() => {
      expect(openButton).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
