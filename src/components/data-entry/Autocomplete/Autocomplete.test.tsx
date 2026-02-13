import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import { userEvent } from '@testing-library/user-event';
import { Autocomplete, AutocompleteOption } from '.';

describe('<Autocomplete />', () => {
  it('renders autocomplete', async () => {
    render(
      <Autocomplete data-testid="autocomplete">
        <AutocompleteOption value={1} label="Option 1">
          Option 1
        </AutocompleteOption>
        <AutocompleteOption value={2} label="Option 2">
          Option 2
        </AutocompleteOption>
        <AutocompleteOption value={3} label="Option 3">
          Option 3
        </AutocompleteOption>
      </Autocomplete>
    );

    const autocomplete = screen.getByTestId('autocomplete');
    const autocompleteInput = screen.getByRole('combobox');
    expect(autocomplete).toBeInTheDocument();
    expect(autocompleteInput).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await userEvent.click(autocompleteInput);
    const optionList = screen.getByRole('listbox');
    const options = screen.getAllByRole('option');
    expect(optionList).toBeInTheDocument();
    expect(options.length).toBe(3);
  });

  it('renders autocomplete with placeholder', async () => {
    render(
      <Autocomplete placeholder="Select an option">
        <AutocompleteOption value={1} label="Option 1">
          Option 1
        </AutocompleteOption>
      </Autocomplete>
    );

    const input = screen.getByRole('combobox') as HTMLInputElement;
    expect(input.placeholder).toBe('Select an option');
  });

  it('renders disabled autocomplete', async () => {
    render(
      <Autocomplete disabled>
        <AutocompleteOption value={1} label="Option 1">
          Option 1
        </AutocompleteOption>
      </Autocomplete>
    );

    const input = screen.getByRole('combobox') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('filters options by input value', async () => {
    render(
      <Autocomplete>
        <AutocompleteOption value={1} label="Apple">
          Apple
        </AutocompleteOption>
        <AutocompleteOption value={2} label="Banana">
          Banana
        </AutocompleteOption>
        <AutocompleteOption value={3} label="Orange">
          Orange
        </AutocompleteOption>
      </Autocomplete>
    );

    const input = screen.getByRole('combobox') as HTMLInputElement;
    await userEvent.click(input);
    await userEvent.type(input, 'app');

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(1);
    expect(options[0]).toHaveTextContent('Apple');
  });
});
