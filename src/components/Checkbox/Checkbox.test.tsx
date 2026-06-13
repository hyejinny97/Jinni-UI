import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
  it('renders unchecked by default and exposes native input', () => {
    render(<Checkbox />);

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.checked).toBe(false);
  });

  it('shows provided custom icons for checked/unchecked states', () => {
    render(
      <Checkbox
        icon={<span data-testid="icon-off">off</span>}
        checkedIcon={<span data-testid="icon-on">on</span>}
      />
    );

    const input = screen.getByRole('checkbox');
    expect(screen.queryByTestId('icon-off')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-on')).toBeNull();

    fireEvent.click(input);
    expect(screen.queryByTestId('icon-on')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-off')).toBeNull();
  });

  it('supports defaultChecked', () => {
    render(
      <Checkbox
        defaultChecked
        icon={<span data-testid="off" />}
        checkedIcon={<span data-testid="on" />}
      />
    );

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(true);
    expect(screen.queryByTestId('on')).toBeInTheDocument();

    fireEvent.click(input);
    expect(input.checked).toBe(false);
    expect(screen.queryByTestId('off')).toBeInTheDocument();
  });

  it('renders indeterminate icon when indeterminate=true', () => {
    render(
      <Checkbox
        indeterminate
        indeterminateIcon={<span data-testid="indeterminate-icon" />}
      />
    );

    expect(screen.getByTestId('indeterminate-icon')).toBeInTheDocument();
  });

  it('applies disabled prop to the native input ', () => {
    render(<Checkbox disabled />);

    const input = screen.getByRole('checkbox');
    expect(input).toBeDisabled();
  });
});
