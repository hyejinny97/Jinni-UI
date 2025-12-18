import { useState, useRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import { LinearSpeedDial, LinearSpeedDialAction } from '.';
import { Button } from '@/components/general/Button';

describe('<LinearSpeedDial />', () => {
  it('renders speed dial', () => {
    const Template = () => {
      const [open, setOpen] = useState(false);
      const anchorElRef = useRef<HTMLElement>(null);
      return (
        <>
          <Button ref={anchorElRef} onClick={() => setOpen(true)}>
            Open SpeedDial
          </Button>
          <LinearSpeedDial
            anchorElRef={anchorElRef}
            open={open}
            onClose={() => setOpen(false)}
          >
            <LinearSpeedDialAction TooltipProps={{ content: 'tooltip 1' }}>
              Action 1
            </LinearSpeedDialAction>
            <LinearSpeedDialAction TooltipProps={{ content: 'tooltip 2' }}>
              Action 2
            </LinearSpeedDialAction>
          </LinearSpeedDial>
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
