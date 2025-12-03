import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Rating from './Rating';

describe('<Rating />', () => {
  it('renders rating', () => {
    render(<Rating />);

    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('0');
    expect(input.min).toBe('0');
    expect(input.max).toBe('5');
  });

  it('renders a default value', () => {
    render(<Rating defaultValue={3} />);

    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('3');
  });

  it('renders controlled rating', () => {
    render(<Rating value={2} />);

    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('2');
  });

  it('applies maximum value', () => {
    render(<Rating max={10} />);

    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.max).toBe('10');
  });

  it('renders disabled rating', () => {
    render(<Rating disabled />);

    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toBeDisabled();
  });
});
