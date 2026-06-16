import { describe, it, expect } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@/tests/react-testing-tools';
import { useState } from 'react';
import DateTimeRangePicker from './DateTimeRangePicker';
import { RangeType } from '@/types/date-time-component';

describe('<DateTimeRangePicker />', () => {
  it('renders date time range picker', () => {
    render(<DateTimeRangePicker />);

    const group = screen.getByRole('group', {
      name: /Date Time Range Picker/i
    });
    expect(group).toBeInTheDocument();
  });

  it('renders with defaultValue', () => {
    render(
      <DateTimeRangePicker
        locale="ko-KR"
        defaultValue={{
          start: new Date(2025, 8, 15, 10, 30),
          end: new Date(2025, 8, 20, 11, 20)
        }}
      />
    );

    expect(screen.getByDisplayValue(/2025.*9.*15.*10:30/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/2025.*9.*20.*11:20/)).toBeInTheDocument();
  });

  it('handles controlled value', async () => {
    const ControlledDateTimeRangePicker = () => {
      const [dateTime, setDateTime] = useState<RangeType<Date | null>>({
        start: new Date(2025, 8, 15, 10, 30),
        end: new Date(2025, 8, 20, 11, 20)
      });
      return (
        <DateTimeRangePicker
          locale="ko-KR"
          value={dateTime}
          onChange={(newValue) => setDateTime(newValue)}
        />
      );
    };
    render(<ControlledDateTimeRangePicker />);

    expect(screen.getByDisplayValue(/2025.*9.*15.*10:30/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/2025.*9.*20.*11:20/)).toBeInTheDocument();
  });

  it('opens popover when clicking the open button', async () => {
    render(<DateTimeRangePicker />);

    const openButton = screen.getByRole('button', {
      name: /Choose Date Time/i
    });
    fireEvent.click(openButton);
    await waitFor(() => {
      expect(openButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('closes popover when clicking Cancel button', async () => {
    render(<DateTimeRangePicker />);

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
