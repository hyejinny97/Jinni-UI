import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import { Dots, Dot } from '.';

describe('<Dots />', () => {
  it('render dots', () => {
    render(
      <Dots>
        <Dot value={1} />
        <Dot value={2} />
        <Dot value={3} />
      </Dots>
    );

    const dots = screen.getByRole('navigation');
    const dotButtons = screen.getAllByRole('button');
    expect(dots).toBeInTheDocument();
    expect(dotButtons.length).toBe(3);
    dotButtons.forEach((dotButton) =>
      expect(dotButton).toHaveAttribute('aria-current', 'false')
    );

    fireEvent.click(dotButtons[1]);
    expect(dotButtons[1]).toHaveAttribute('aria-current', 'true');
  });

  it('render dots with defaultValue', () => {
    render(
      <Dots defaultValue={1}>
        <Dot value={1} />
        <Dot value={2} />
        <Dot value={3} />
      </Dots>
    );

    const dots = screen.getByRole('navigation');
    const dotButtons = screen.getAllByRole('button');
    expect(dots).toBeInTheDocument();
    expect(dotButtons.length).toBe(3);
    expect(dotButtons[0]).toHaveAttribute('aria-current', 'true');
  });

  it('render disabled dots', () => {
    render(
      <Dots disabled>
        <Dot value={1} />
        <Dot value={2} />
        <Dot value={3} />
      </Dots>
    );

    const dots = screen.getByRole('navigation');
    const dotButtons = screen.getAllByRole('button');
    expect(dots).toBeInTheDocument();
    expect(dotButtons.length).toBe(3);
    dotButtons.forEach((dotButton) => expect(dotButton).toBeDisabled());
  });
});
