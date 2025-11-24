import { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@/tests/react-testing-tools';
import CheckboxGroup from './CheckboxGroup';
import { Checkbox } from '@/components/data-entry/Checkbox';

describe('<CheckboxGroup />', () => {
  it('renders the checkbox with defaultValue as checked by default', () => {
    render(
      <CheckboxGroup name="color" defaultValue={['red', 'yellow']}>
        <Checkbox value="red" />
        <Checkbox value="yellow" />
        <Checkbox value="green" />
      </CheckboxGroup>
    );

    const inputs = screen.getAllByRole('checkbox') as HTMLInputElement[];
    inputs.forEach((input) => expect(input).toHaveAttribute('name', 'color'));
    expect(inputs[0]).toHaveAttribute('value', 'red');
    expect(inputs[1]).toHaveAttribute('value', 'yellow');
    expect(inputs[2]).toHaveAttribute('value', 'green');

    expect(inputs[0].checked).toBe(true);
    expect(inputs[1].checked).toBe(true);
    expect(inputs[2].checked).toBe(false);
  });

  it('controls the checkbox group via the value prop and calls onChange whenever the checked state changes', () => {
    const onChange = vi.fn();
    const Template = () => {
      const [value, setValue] = useState(['red']);
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) setValue((prev) => [...prev, e.target.value]);
        else setValue((prev) => prev.filter((val) => val !== e.target.value));
        onChange();
      };
      return (
        <CheckboxGroup name="color" value={value} onChange={handleChange}>
          <Checkbox value="red" />
          <Checkbox value="yellow" />
          <Checkbox value="green" />
        </CheckboxGroup>
      );
    };
    render(<Template />);

    const inputs = screen.getAllByRole('checkbox') as HTMLInputElement[];
    expect(inputs[0].checked).toBe(true);
    expect(inputs[1].checked).toBe(false);
    expect(inputs[2].checked).toBe(false);

    fireEvent.click(inputs[0]);
    expect(onChange).toHaveBeenCalled();
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(false);
    expect(inputs[2].checked).toBe(false);

    fireEvent.click(inputs[2]);
    expect(onChange).toHaveBeenCalled();
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(false);
    expect(inputs[2].checked).toBe(true);
  });

  it('shows provided custom icons for checked/unchecked states', () => {
    const { container } = render(
      <CheckboxGroup
        name="color"
        icon={<span data-testid="icon-off">off</span>}
        checkedIcon={<span data-testid="icon-on">on</span>}
      >
        <Checkbox value="red" />
        <Checkbox value="yellow" />
        <Checkbox value="green" />
      </CheckboxGroup>
    );

    const checkboxes =
      container.querySelectorAll<HTMLElement>('.JinniCheckbox');
    const inputs = screen.getAllByRole('checkbox') as HTMLInputElement[];
    checkboxes.forEach((checkbox) => {
      expect(within(checkbox).getByTestId('icon-off')).toBeInTheDocument();
    });

    fireEvent.click(inputs[0]);
    expect(within(checkboxes[0]).getByTestId('icon-on')).toBeInTheDocument();
  });
});
