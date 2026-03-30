import { describe, it, expect } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@/tests/react-testing-tools';
import { useState } from 'react';
import DateRangePicker from './DateRangePicker';
import { RangeType } from '@/types/time-component';

describe('<DateRangePicker />', () => {
  it('renders date range picker', () => {
    render(<DateRangePicker />);

    const group = screen.getByRole('group', { name: /Date Range Picker/i });
    expect(group).toBeInTheDocument();
  });

  it('renders with defaultValue', () => {
    render(
      <DateRangePicker
        locale="ko-KR"
        defaultValue={{
          start: new Date(2025, 3, 10),
          end: new Date(2025, 4, 20)
        }}
      />
    );

    expect(screen.getByDisplayValue(/2025. 4. 10./)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/2025. 5. 20./)).toBeInTheDocument();
  });

  it('handles controlled value', async () => {
    const ControlledDateRangePicker = () => {
      const [time, setTime] = useState<RangeType<Date | null>>({
        start: new Date(2025, 3, 10),
        end: new Date(2025, 4, 20)
      });
      return (
        <DateRangePicker
          locale="ko-KR"
          value={time}
          onChange={(newValue) => setTime(newValue)}
        />
      );
    };
    render(<ControlledDateRangePicker />);

    expect(screen.getByDisplayValue(/2025. 4. 10./)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/2025. 5. 20./)).toBeInTheDocument();
  });

  it('opens popover when clicking the open button', async () => {
    render(<DateRangePicker />);

    const openButton = screen.getByRole('button', { name: /Choose Date/i });
    fireEvent.click(openButton);
    await waitFor(() => {
      expect(openButton).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
