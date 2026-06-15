import { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import Switch from './Switch';

describe('<Switch />', () => {
  it('renders unchecked by default and exposes native input', () => {
    render(<Switch />);

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.checked).toBe(false);
  });

  it('supports defaultChecked', () => {
    render(<Switch defaultChecked />);

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(true);

    fireEvent.click(input);
    expect(input.checked).toBe(false);
  });

  it('renders controlled switch', () => {
    const Template = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Switch
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      );
    };
    render(<Template />);

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(false);

    fireEvent.click(input);
    expect(input.checked).toBe(true);
  });

  it('applies disabled prop to the native input ', () => {
    render(<Switch disabled />);

    const input = screen.getByRole('checkbox');
    expect(input).toBeDisabled();
  });
});
