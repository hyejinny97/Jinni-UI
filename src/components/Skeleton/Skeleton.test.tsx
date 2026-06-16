import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Skeleton from './Skeleton';

describe('<Skeleton />', () => {
  it('renders skeleton', () => {
    render(<Skeleton data-testid="basic skeleton" />);
    const skeleton = screen.getByTestId('basic skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders skeleton with different variants', () => {
    render(
      <>
        <Skeleton variant="rectangular" data-testid="skeleton" />
        <Skeleton variant="rounded" data-testid="skeleton" />
        <Skeleton variant="circular" data-testid="skeleton" />
      </>
    );
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBe(3);
  });

  it('renders skeleton with different animations', () => {
    render(
      <>
        <Skeleton animation="pulse" data-testid="skeleton" />
        <Skeleton animation="wave" data-testid="skeleton" />
        <Skeleton animation="none" data-testid="skeleton" />
      </>
    );
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBe(3);
  });
});
