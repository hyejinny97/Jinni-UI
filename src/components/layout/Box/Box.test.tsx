import { describe, it, expect } from 'vitest';
import { render, screen } from '@/react-testing-tools';
import Box from './Box';

describe('<Box />', () => {
  it('renders box with content', () => {
    render(<Box>content</Box>);
    const box = screen.getByText('content');
    expect(box).toBeInTheDocument();
  });

  it('renders box with different elevation', () => {
    render(
      <>
        <Box elevation={5}>content</Box>
        <Box elevation={24}>content</Box>
      </>
    );
    const boxes = screen.getAllByText('content');
    expect(boxes.length).toBe(2);
  });

  it('renders outlined box', () => {
    render(<Box outlined>content</Box>);
    const box = screen.getByText('content');
    expect(box).toBeInTheDocument();
  });

  it('renders box with different round', () => {
    render(
      <>
        <Box round="sm">content</Box>
        <Box round="md">content</Box>
        <Box round="lg">content</Box>
        <Box round={30}>content</Box>
      </>
    );
    const boxes = screen.getAllByText('content');
    expect(boxes.length).toBe(4);
  });
});
