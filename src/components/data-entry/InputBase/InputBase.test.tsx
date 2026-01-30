import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import InputBase from './InputBase';

describe('<InputBase />', () => {
  it('renders content', () => {
    render(<InputBase data-testid="input-base">Content</InputBase>);

    const inputBase = screen.getByTestId('input-base');
    expect(inputBase).toBeInTheDocument();
    expect(inputBase).toHaveTextContent('Content');
  });

  it('renders content with adornments', () => {
    render(
      <InputBase
        data-testid="input-base"
        startAdornment="start"
        endAdornment="end"
      >
        Content
      </InputBase>
    );

    const inputBase = screen.getByTestId('input-base');
    expect(inputBase).toBeInTheDocument();
    expect(inputBase).toHaveTextContent('Content');
    expect(inputBase).toHaveTextContent('start');
    expect(inputBase).toHaveTextContent('end');
  });
});
