import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Fraction from './Fraction';

describe('<Fraction />', () => {
  it('renders fraction', () => {
    render(<Fraction count={5} value={2} data-testid="fraction" />);

    const fraction = screen.getByTestId('fraction');
    expect(fraction).toBeInTheDocument();
  });
});
