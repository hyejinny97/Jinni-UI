import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import CircularProgress from './CircularProgress';

describe('<CircularProgress />', () => {
  it('renders indeterminate progress', () => {
    render(<CircularProgress />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).not.toHaveAttribute('aria-valuenow');
  });

  it('renders determinate progress', () => {
    render(<CircularProgress value={30} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '30');
  });

  it('throws error if value is out of range(0~100)', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<CircularProgress value={-1} />)).toThrow();
    expect(() => render(<CircularProgress value={101} />)).toThrow();
    spy.mockRestore();
  });

  it('renders progress with different progress color', () => {
    render(
      <>
        <CircularProgress progressColor="secondary" />
        <CircularProgress progressColor="yellow-400" />
        <CircularProgress progressColor="rgb(100, 200, 200)" />
      </>
    );
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBe(3);
  });

  it('renders progress with different track color', () => {
    render(
      <>
        <CircularProgress trackColor="gray-200" />
        <CircularProgress progressColor="yellow-400" trackColor="yellow-200" />
      </>
    );
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBe(2);
  });

  it('renders progress with different size', () => {
    render(
      <>
        <CircularProgress size="sm" />
        <CircularProgress size="md" />
        <CircularProgress size="lg" />
        <CircularProgress size={100} />
      </>
    );
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBe(4);
  });

  it('renders progress with different thickness', () => {
    render(<CircularProgress thickness={6} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders progress with different linecap', () => {
    render(
      <>
        <CircularProgress lineCap="round" />
        <CircularProgress lineCap="butt" />
      </>
    );
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBe(2);
  });

  it('renders indeterminate progress with different speed', () => {
    render(<CircularProgress speed={3} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders indeterminate progress with disableShrink', () => {
    render(<CircularProgress disableShrink />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });
});
