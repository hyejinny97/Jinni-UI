import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Divider from './Divider';

describe('<Divider />', () => {
  it('renders divider', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
  });

  it('renders divider with different thickness', () => {
    render(<Divider thickness={3} />);
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
  });

  it('renders divider with different variant', () => {
    render(
      <>
        <Divider variant="solid" />
        <Divider variant="dashed" />
        <Divider variant="dotted" />
      </>
    );
    const dividers = screen.getAllByRole('separator');
    expect(dividers.length).toBe(3);
  });

  it('renders divider with different orientation', () => {
    render(
      <>
        <Divider orientation="horizontal" />
        <Divider orientation="vertical" />
      </>
    );
    const dividers = screen.getAllByRole('separator');
    expect(dividers.length).toBe(2);
    expect(dividers[0]).toHaveAttribute('aria-orientation', 'horizontal');
    expect(dividers[1]).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders divider with content', () => {
    render(<Divider>content</Divider>);
    const divider = screen.getByRole('separator');
    const content = screen.getByText('content');
    expect(divider).toBeInTheDocument();
    expect(divider).toContainElement(content);
  });

  it('renders divider with different content alignment', () => {
    render(
      <>
        <Divider contentAlign="center">content</Divider>
        <Divider contentAlign="start">content</Divider>
        <Divider contentAlign="end">content</Divider>
      </>
    );
    const dividers = screen.getAllByRole('separator');
    const contents = screen.getAllByText('content');
    expect(dividers.length).toBe(3);
    expect(contents.length).toBe(3);
    dividers.forEach((divider, idx) =>
      expect(divider).toContainElement(contents[idx])
    );
  });

  it('renders divider with different color', () => {
    render(
      <>
        <Divider color="secondary" />
        <Divider color="yellow-400" />
        <Divider color="rgb(100,100,100)" />
      </>
    );
    const dividers = screen.getAllByRole('separator');
    expect(dividers.length).toBe(3);
  });
});
