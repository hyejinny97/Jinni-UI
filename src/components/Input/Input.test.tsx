import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Input from './Input';

describe('<Input />', () => {
  it('renders input', () => {
    render(<Input />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it('renders input with default value', () => {
    render(<Input defaultValue="content" />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('content');
  });

  it('renders disabled input', () => {
    render(<Input disabled />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.disabled).toBeTruthy();
  });
});
