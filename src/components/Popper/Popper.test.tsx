import { useRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Popper from './Popper';

describe('<Popper />', () => {
  it('display popper', () => {
    const Template = () => {
      const anchorElRef = useRef<HTMLSpanElement>(null);
      return (
        <>
          <span ref={anchorElRef}>anchor</span>
          <Popper anchorElRef={anchorElRef}>Popper Content</Popper>
        </>
      );
    };
    render(<Template />);

    const popper = screen.getByRole('tooltip', { name: 'Popper Content' });
    expect(popper).toBeInTheDocument();
  });
});
