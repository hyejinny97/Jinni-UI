import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import { userEvent } from '@testing-library/user-event';
import { Select, Option } from '.';

describe('<Select />', () => {
  it('renders select', async () => {
    render(
      <Select data-testid="select">
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3</Option>
      </Select>
    );

    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await userEvent.click(select);
    const optionList = screen.getByRole('listbox');
    const options = screen.getAllByRole('option');
    expect(optionList).toBeInTheDocument();
    expect(options.length).toBe(3);

    const firstOption = options[0];
    await userEvent.click(firstOption);
    expect(select).toHaveTextContent('Option 1');
  });

  it('renders select with default value', async () => {
    render(
      <Select data-testid="select" defaultValue="option1">
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3</Option>
      </Select>
    );

    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent('Option 1');
  });

  it('renders select with placeholder', async () => {
    render(
      <Select data-testid="select" placeholder="Select the option">
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3</Option>
      </Select>
    );

    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent('Select the option');
  });

  it('renders multiple select', async () => {
    render(
      <Select
        data-testid="select"
        multiple
        defaultValue={['option1', 'option2']}
      >
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3</Option>
      </Select>
    );

    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent('Option 1, Option 2');
  });

  it('customize rendering values', async () => {
    render(
      <Select
        data-testid="select"
        multiple
        defaultValue={['option1', 'option2']}
        renderValue={(selectedOptions) =>
          selectedOptions.map((option) => option.label).join(' + ')
        }
      >
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3</Option>
      </Select>
    );

    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent('Option 1 + Option 2');
  });
});
