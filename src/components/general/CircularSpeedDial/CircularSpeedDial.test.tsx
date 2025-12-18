import { useState, useRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import { CircularSpeedDial, CircularSpeedDialAction } from '.';
import { Button } from '@/components/general/Button';

describe('<CircularSpeedDial />', () => {
  it('renders speed dial', () => {
    const Template = () => {
      const [open, setOpen] = useState(false);
      const anchorElRef = useRef<HTMLElement>(null);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open SpeedDial
          </Button>
          <CircularSpeedDial
            anchorElRef={anchorElRef}
            open={open}
            onClose={() => setOpen(false)}
          >
            <CircularSpeedDialAction TooltipProps={{ content: 'tooltip 1' }}>
              Action 1
            </CircularSpeedDialAction>
            <CircularSpeedDialAction TooltipProps={{ content: 'tooltip 2' }}>
              Action 2
            </CircularSpeedDialAction>
          </CircularSpeedDial>
        </>
      );
    };
    render(<Template />);

    const triggerButton = screen.getByRole('button', {
      name: 'Open SpeedDial'
    });
    expect(triggerButton).toBeInTheDocument();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    fireEvent.click(triggerButton);
    const speedDial = screen.queryByRole('menu');
    const speedDialActions = screen.queryAllByRole('menuitem');
    expect(speedDial).toBeInTheDocument();
    expect(speedDialActions.length).toBe(2);
  });
});
