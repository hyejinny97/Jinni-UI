import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import ButtonGroup from './ButtonGroup';
import { Button } from '@/components/general/Button';

describe('<ButtonGroup />', () => {
  it('renders button group', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    );
    const buttonGroup = screen.getByRole('group');
    const buttons = screen.getAllByRole('button');
    expect(buttonGroup).toBeInTheDocument();
    expect(buttons.length).toBe(3);
  });

  it('renders disabled buttons', () => {
    render(
      <ButtonGroup disabled>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    );
    const buttonGroup = screen.getByRole('group');
    const buttons = screen.getAllByRole('button');
    expect(buttonGroup).toBeInTheDocument();
    buttons.forEach((button) => expect(button).toBeDisabled());
  });
});
