import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Masonry from './Masonry';

describe('<Masonry />', () => {
  it('renders masonry', () => {
    render(
      <Masonry data-testid="basic masonry">
        <div data-testid="item">1</div>
        <div data-testid="item">2</div>
        <div data-testid="item">3</div>
      </Masonry>
    );

    const masonry = screen.getByTestId('basic masonry');
    const items = screen.getAllByTestId('item');
    expect(masonry).toBeInTheDocument();
    expect(items.length).toBe(3);
  });
});
