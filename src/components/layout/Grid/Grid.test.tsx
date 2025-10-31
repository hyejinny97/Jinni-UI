import { describe, expect, it } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Grid from './Grid';

describe('<Grid />', () => {
  it('renders grid items', () => {
    render(
      <Grid>
        <div>Item A</div>
        <div>Item B</div>
      </Grid>
    );
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
  });
});
