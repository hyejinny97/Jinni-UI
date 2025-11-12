import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import Backdrop from './Backdrop';

describe('<Backdrop />', () => {
  it('renders backdrop', () => {
    render(<Backdrop data-testid="basic backdrop" />);
    const backdrop = screen.getByTestId('basic backdrop');
    expect(backdrop).toBeInTheDocument();
  });

  it('renders backdrop with children', () => {
    render(
      <Backdrop data-testid="basic backdrop">
        <div>content</div>
      </Backdrop>
    );
    const backdrop = screen.getByTestId('basic backdrop');
    const content = screen.getByText('content');
    expect(backdrop).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('calls onClick only when clicking the backdrop itself (not its children)', () => {
    const handleClick = vi.fn();
    render(
      <Backdrop onClick={handleClick} data-testid="basic backdrop">
        <div>content</div>
      </Backdrop>
    );

    const backdrop = screen.getByTestId('basic backdrop');
    const content = screen.getByText('content');

    fireEvent.click(content);
    expect(handleClick).not.toHaveBeenCalled();

    fireEvent.click(backdrop);
    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
