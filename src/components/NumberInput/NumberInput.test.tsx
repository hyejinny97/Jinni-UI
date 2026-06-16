import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import userEvent from '@testing-library/user-event';
import NumberInput from './NumberInput';

describe('<NumberInput />', () => {
  it('renders input', async () => {
    const user = userEvent.setup();
    render(<NumberInput />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    const increaseButton = screen.getByRole('button', { name: 'increase' });
    expect(increaseButton).toBeInTheDocument();
    await user.click(increaseButton);
    expect(input.value).toBe('0');

    await user.click(increaseButton);
    expect(input.value).toBe('1');

    const decreaseButton = screen.getByRole('button', { name: 'decrease' });
    expect(decreaseButton).toBeInTheDocument();
    await user.click(decreaseButton);
    expect(input.value).toBe('0');
  });

  it('renders input with default value', () => {
    render(<NumberInput defaultValue={15} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('15');
  });

  it('should increment and decrement value by specified step', async () => {
    const user = userEvent.setup();
    render(<NumberInput defaultValue={15} step={5} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('15');

    const increaseButton = screen.getByRole('button', { name: 'increase' });
    expect(increaseButton).toBeInTheDocument();
    await user.click(increaseButton);
    expect(input.value).toBe('20');

    const decreaseButton = screen.getByRole('button', { name: 'decrease' });
    expect(decreaseButton).toBeInTheDocument();
    await user.click(decreaseButton);
    expect(input.value).toBe('15');
  });

  it('should clamp value within min and max range', async () => {
    const user = userEvent.setup();
    render(<NumberInput defaultValue={10} step={20} min={10} max={30} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('10');

    const decreaseButton = screen.getByRole('button', { name: 'decrease' });
    expect(decreaseButton).toBeInTheDocument();
    await user.click(decreaseButton);
    expect(input.value).toBe('10');

    const increaseButton = screen.getByRole('button', { name: 'increase' });
    expect(increaseButton).toBeInTheDocument();
    await user.click(increaseButton);
    expect(input.value).toBe('30');

    await user.click(increaseButton);
    expect(input.value).toBe('30');
  });

  it('renders disabled input', () => {
    render(<NumberInput disabled />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.disabled).toBeTruthy();

    const increaseButton = screen.getByRole('button', {
      name: 'increase'
    }) as HTMLButtonElement;
    const decreaseButton = screen.getByRole('button', {
      name: 'decrease'
    }) as HTMLButtonElement;
    expect(increaseButton.disabled).toBeTruthy();
    expect(decreaseButton.disabled).toBeTruthy();
  });
});
