import { describe, it, expect } from 'vitest';
import { render, screen } from '@/react-testing-tools';
import Badge from './Badge';

describe('<Badge />', () => {
  it('renders with number content and anchor', () => {
    render(
      <Badge content={5}>
        <span data-testid="anchor">anchor</span>
      </Badge>
    );
    const anchor = screen.getByTestId('anchor');
    const badge = screen.getByText(5);
    expect(anchor).toBeInTheDocument();
    expect(badge).toBeInTheDocument();
  });

  it('shows max value with + when content exceeds max', () => {
    render(
      <Badge content={1000} max={999}>
        anchor
      </Badge>
    );
    const badge = screen.getByText('999+');
    expect(badge).toBeInTheDocument();
  });

  it('shows badge when content is 0', () => {
    render(
      <Badge content={0} showZero>
        anchor
      </Badge>
    );
    const badge = screen.getByText(0);
    expect(badge).toBeInTheDocument();
  });

  it('renders dot badge', () => {
    render(
      <Badge data-testid="dot-badge" content={5} variant="dot">
        anchor
      </Badge>
    );
    const dotBadge = screen.getByTestId('dot-badge');
    const badgeWithContent = screen.queryByText(5);
    expect(dotBadge).toBeInTheDocument();
    expect(badgeWithContent).not.toBeInTheDocument();
  });

  it('hide badge', () => {
    render(
      <Badge content={5} invisible>
        anchor
      </Badge>
    );
    const badge = screen.queryByText(5);
    expect(badge).toBeNull();
  });

  it('renders different sizes', () => {
    render(
      <>
        <Badge content={5} size="sm">
          anchor
        </Badge>
        <Badge content={5} size="md">
          anchor
        </Badge>
        <Badge content={5} size="lg">
          anchor
        </Badge>
      </>
    );
    const badges = screen.getAllByText(5);
    expect(badges.length).toBe(3);
  });

  it('renders different alignment', () => {
    render(
      <>
        <Badge
          content={5}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          anchor
        </Badge>
        <Badge
          content={5}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          anchor
        </Badge>
        <Badge
          content={5}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          anchor
        </Badge>
        <Badge
          content={5}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          anchor
        </Badge>
      </>
    );
    const badges = screen.getAllByText(5);
    expect(badges.length).toBe(4);
  });
});
