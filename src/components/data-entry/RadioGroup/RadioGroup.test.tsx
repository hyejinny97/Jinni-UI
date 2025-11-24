import { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@/tests/react-testing-tools';
import RadioGroup from './RadioGroup';
import { Radio } from '@/components/data-entry/Radio';

describe('<RadioGroup />', () => {
  it('renders the radio with defaultValue as checked by default', () => {
    render(
      <RadioGroup name="color" defaultValue="red">
        <Radio value="red" />
        <Radio value="yellow" />
        <Radio value="green" />
      </RadioGroup>
    );

    const inputs = screen.getAllByRole('radio') as HTMLInputElement[];
    inputs.forEach((input) => expect(input).toHaveAttribute('name', 'color'));
    expect(inputs[0]).toHaveAttribute('value', 'red');
    expect(inputs[1]).toHaveAttribute('value', 'yellow');
    expect(inputs[2]).toHaveAttribute('value', 'green');

    expect(inputs[0].checked).toBe(true);
    expect(inputs[1].checked).toBe(false);
    expect(inputs[2].checked).toBe(false);
  });

  it('controls the radio group via the value prop and calls onChange whenever the checked state changes', () => {
    const onChange = vi.fn();
    const Template = () => {
      const [value, setValue] = useState('red');
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange();
      };
      return (
        <RadioGroup name="color" value={value} onChange={handleChange}>
          <Radio value="red" />
          <Radio value="yellow" />
          <Radio value="green" />
        </RadioGroup>
      );
    };
    render(<Template />);

    const inputs = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(inputs[0].checked).toBe(true);
    expect(inputs[1].checked).toBe(false);
    expect(inputs[2].checked).toBe(false);

    fireEvent.click(inputs[1]);
    expect(onChange).toHaveBeenCalled();
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(true);
    expect(inputs[2].checked).toBe(false);
  });

  it('shows provided custom icons for checked/unchecked states', () => {
    const { container } = render(
      <RadioGroup
        name="color"
        icon={<span data-testid="icon-off">off</span>}
        checkedIcon={<span data-testid="icon-on">on</span>}
      >
        <Radio value="red" />
        <Radio value="yellow" />
        <Radio value="green" />
      </RadioGroup>
    );

    const radios = container.querySelectorAll<HTMLElement>('.JinniRadio');
    const inputs = screen.getAllByRole('radio') as HTMLInputElement[];
    radios.forEach((radio) => {
      expect(within(radio).getByTestId('icon-off')).toBeInTheDocument();
    });

    fireEvent.click(inputs[0]);
    expect(within(radios[0]).getByTestId('icon-on')).toBeInTheDocument();
  });
});
