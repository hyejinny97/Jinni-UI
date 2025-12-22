import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import ToggleButtonGroup from './ToggleButtonGroup';
import { ToggleButton } from '@/components/general/ToggleButton';
import { FormatAlignLeftIcon } from '@/components/icons/FormatAlignLeftIcon';
import { FormatAlignCenterIcon } from '@/components/icons/FormatAlignCenterIcon';

describe('<ToggleButtonGroup />', () => {
  it('renders toggle button group', () => {
    render(
      <ToggleButtonGroup>
        <ToggleButton value="left">
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value="center">
          <FormatAlignCenterIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    );

    const toggleButtonGroup = screen.getByRole('group');
    const toggleButtons = screen.getAllByRole('button');
    expect(toggleButtonGroup).toBeInTheDocument();
    expect(toggleButtons.length).toBe(2);
    toggleButtons.forEach((button) =>
      expect(button).toHaveAttribute('aria-pressed', 'false')
    );

    fireEvent.click(toggleButtons[0]);
    expect(toggleButtons[0]).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders exclusive toggle button group', () => {
    render(
      <ToggleButtonGroup defaultValue="left">
        <ToggleButton value="left">
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value="center">
          <FormatAlignCenterIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    );

    const toggleButtonGroup = screen.getByRole('group');
    const toggleButtons = screen.getAllByRole('button');
    expect(toggleButtonGroup).toBeInTheDocument();
    expect(toggleButtons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButtons[1]).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders multiple toggle button group', () => {
    render(
      <ToggleButtonGroup defaultValue={['left', 'center']}>
        <ToggleButton value="left">
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value="center">
          <FormatAlignCenterIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    );

    const toggleButtonGroup = screen.getByRole('group');
    const toggleButtons = screen.getAllByRole('button');
    expect(toggleButtonGroup).toBeInTheDocument();
    expect(toggleButtons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButtons[1]).toHaveAttribute('aria-pressed', 'true');
  });
});
