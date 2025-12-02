import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Slider from './Slider';

describe('<Slider />', () => {
  it('renders range input', () => {
    render(<Slider />);

    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('0');
    expect(input).toHaveAttribute('aria-valuenow', '0');
    expect(input).toHaveAttribute('aria-valuemin', '0');
    expect(input).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders a default value', () => {
    render(<Slider defaultValue={20} />);

    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('20');
  });

  it('renders controlled slider', () => {
    render(<Slider value={10} />);

    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('10');
  });

  it('applies minimum and maximum value', () => {
    render(<Slider min={10} max={30} />);

    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-valuemin', '10');
    expect(input).toHaveAttribute('aria-valuemax', '30');
  });

  it('renders range slider', () => {
    render(<Slider value={[10, 20]} />);

    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    expect(inputs.length).toBe(2);
    expect(inputs[0].value).toBe('10');
    expect(inputs[1].value).toBe('20');
  });

  it('applies scale function', () => {
    render(<Slider value={5} min={1} max={10} scale={(v: number) => v * 2} />);

    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toHaveAttribute('aria-valuenow', '10');
    expect(input).toHaveAttribute('aria-valuemin', '2');
    expect(input).toHaveAttribute('aria-valuemax', '20');
  });

  it('renders disabled slider', () => {
    render(<Slider disabled />);

    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toBeDisabled();
  });
});
