import { describe, it, expect } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@/tests/react-testing-tools';
import { useState } from 'react';
import TimeRangePicker from './TimeRangePicker';
import { RangeType } from '@/types/time-component';

describe('<TimeRangePicker />', () => {
  it('renders time range picker', () => {
    render(<TimeRangePicker />);

    const group = screen.getByRole('group', { name: /Time Range Picker/i });
    expect(group).toBeInTheDocument();
  });

  it('renders with defaultValue', () => {
    render(
      <TimeRangePicker
        defaultValue={{
          start: new Date(1970, 0, 1, 10, 30),
          end: new Date(1970, 0, 1, 17, 0)
        }}
      />
    );

    expect(screen.getByDisplayValue(/10:30/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/17:00/)).toBeInTheDocument();
  });

  it('handles controlled value', async () => {
    const ControlledTimeRangePicker = () => {
      const [time, setTime] = useState<RangeType<Date | null>>({
        start: new Date(1970, 0, 1, 10, 30),
        end: new Date(1970, 0, 1, 17, 0)
      });
      return (
        <TimeRangePicker
          value={time}
          onChange={(newValue) => setTime(newValue)}
        />
      );
    };
    render(<ControlledTimeRangePicker />);

    expect(screen.getByDisplayValue(/10:30/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/17:00/)).toBeInTheDocument();
  });

  it('opens popover when clicking the open button', async () => {
    render(<TimeRangePicker />);

    const openButton = screen.getByRole('button', { name: /Choose Time/i });
    fireEvent.click(openButton);
    await waitFor(() => {
      expect(openButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('closes popover when clicking Cancel button', async () => {
    render(<TimeRangePicker />);

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
