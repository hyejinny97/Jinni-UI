import { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import Radio from './Radio';

describe('<Radio />', () => {
  it('renders native input', () => {
    render(<Radio />);

    const input = screen.getByRole('radio') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.checked).toBe(false);
  });

  it('renders controlled radios', () => {
    const Template = () => {
      const [checkedValue, setCheckedValue] = useState('');
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedValue(e.target.value);
      };
      return (
        <>
          <Radio
            name="color"
            value="red"
            checked={checkedValue === 'red'}
            onChange={handleChange}
          />
          <Radio
            name="color"
            value="yellow"
            checked={checkedValue === 'yellow'}
            onChange={handleChange}
          />
        </>
      );
    };
    render(<Template />);

    const inputs = screen.getAllByRole('radio');
    expect(inputs[0]).toHaveAttribute('value', 'red');
    expect(inputs[1]).toHaveAttribute('value', 'yellow');

    fireEvent.click(inputs[0]);
    expect(inputs[0].checked).toBe(true);
    expect(inputs[1].checked).toBe(false);

    fireEvent.click(inputs[1]);
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(true);
  });

  it('shows provided custom icons for checked/unchecked states', () => {
    const Template = () => {
      const [checked, SetChecked] = useState(false);
      return (
        <Radio
          checked={checked}
          onClick={() => SetChecked((prev) => !prev)}
          icon={<span data-testid="icon-off">off</span>}
          checkedIcon={<span data-testid="icon-on">on</span>}
        />
      );
    };
    render(<Template />);

    const input = screen.getByRole('radio');
    expect(input.checked).toBe(false);
    expect(screen.queryByTestId('icon-on')).toBeNull();
    expect(screen.queryByTestId('icon-off')).toBeInTheDocument();

    fireEvent.click(input);
    expect(input.checked).toBe(true);
    expect(screen.queryByTestId('icon-on')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-off')).toBeNull();
  });

  it('applies disabled prop to the native input ', () => {
    render(<Radio disabled />);

    const input = screen.getByRole('radio');
    expect(input).toBeDisabled();
  });
});
