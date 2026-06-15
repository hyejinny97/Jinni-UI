import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import ToggleButton from './ToggleButton';

describe('<ToggleButton />', () => {
  it('renders toggle button', () => {
    render(<ToggleButton value="value">Label</ToggleButton>);

    const button = screen.getByRole('button', { name: 'Label' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders toggle button with defaultSelected', () => {
    render(
      <ToggleButton value="value" defaultSelected>
        Label
      </ToggleButton>
    );

    const button = screen.getByRole('button', { name: 'Label' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('disable button', () => {
    render(
      <ToggleButton value="value" disabled>
        Label
      </ToggleButton>
    );

    const button = screen.getByRole('button', { name: 'Label' });
    expect(button).toBeDisabled();
  });
});
