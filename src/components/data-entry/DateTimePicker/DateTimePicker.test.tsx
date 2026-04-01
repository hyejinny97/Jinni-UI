import { describe, it, expect } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@/tests/react-testing-tools';
import { useState } from 'react';
import DateTimePicker from './DateTimePicker';

describe('<DateTimePicker />', () => {
  it('renders date time picker', () => {
    render(<DateTimePicker />);

    const group = screen.getByRole('group', { name: /Date Time Picker/i });
    expect(group).toBeInTheDocument();
  });

  it('renders with defaultValue', () => {
    render(
      <DateTimePicker
        locale="ko-KR"
        defaultValue={new Date(2025, 8, 15, 10, 30)}
      />
    );

    expect(
      screen.getByDisplayValue(/2025. 9. 15. 오전 10:30:00/)
    ).toBeInTheDocument();
  });

  it('handles controlled value', async () => {
    const ControlledDateTimePicker = () => {
      const [date, setTime] = useState<Date | null>(
        new Date(2025, 8, 15, 10, 30)
      );
      return (
        <DateTimePicker
          locale="ko-KR"
          value={date}
          onChange={(newValue) => setTime(newValue)}
        />
      );
    };
    render(<ControlledDateTimePicker />);

    expect(
      screen.getByDisplayValue(/2025. 9. 15. 오전 10:30:00/)
    ).toBeInTheDocument();
  });

  it('opens popover when clicking the open button', async () => {
    render(<DateTimePicker />);

    const openButton = screen.getByRole('button', {
      name: /Choose Date Time/i
    });
    fireEvent.click(openButton);
    await waitFor(() => {
      expect(openButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('closes popover when clicking OK button', async () => {
    render(<DateTimePicker />);

    const openButton = screen.getByRole('button', {
      name: /Choose Date Time/i
    });
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
    render(<DateTimePicker />);

    const openButton = screen.getByRole('button', {
      name: /Choose Date Time/i
    });
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
