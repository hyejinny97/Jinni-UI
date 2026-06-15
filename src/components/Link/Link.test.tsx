import { describe, expect, it } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Link from './Link';

describe('<Link />', () => {
  it('render link with href', () => {
    render(<Link href="#">Home</Link>);

    const link = screen.getByRole('link', { name: /home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');
  });
});
