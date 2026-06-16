import { describe, it, expect } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@/tests/react-testing-tools';
import { useState } from 'react';
import DatePicker from './DatePicker';

describe('<DatePicker />', () => {
  it('renders date picker', () => {
    render(<DatePicker />);

    const group = screen.getByRole('group', { name: /Date Picker/i });
    expect(group).toBeInTheDocument();
  });

  it('renders with defaultValue', () => {
    render(<DatePicker locale="ko-KR" defaultValue={new Date(2025, 8, 15)} />);

    expect(screen.getByDisplayValue(/2025. 9. 15./)).toBeInTheDocument();
  });

  it('handles controlled value', async () => {
    const ControlledDatePicker = () => {
      const [date, setTime] = useState<Date | null>(new Date(2025, 8, 15));
      return (
        <DatePicker
          locale="ko-KR"
          value={date}
          onChange={(newValue) => setTime(newValue)}
        />
      );
    };
    render(<ControlledDatePicker />);

    expect(screen.getByDisplayValue(/2025. 9. 15./)).toBeInTheDocument();
  });

  it('opens popover when clicking the open button', async () => {
    render(<DatePicker />);

    const openButton = screen.getByRole('button', { name: /Choose Date/i });
    fireEvent.click(openButton);
    await waitFor(() => {
      expect(openButton).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
