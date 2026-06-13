import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import ColorPicker from './ColorPicker';

describe('<ColorPicker />', () => {
  it('renders color picker', () => {
    render(<ColorPicker />);

    const input = screen.getByRole('textbox', {
      hidden: true
    }) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('primary');
  });
});
