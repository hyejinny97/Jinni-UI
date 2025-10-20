import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import LinearProgress from './LinearProgress';

describe('<LinearProgress />', () => {
  it('renders indeterminate progress', () => {
    render(<LinearProgress />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).not.toHaveAttribute('aria-valuenow');
  });

  it('renders determinate progress', () => {
    render(<LinearProgress value={30} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '30');
  });

  it('throws error if value is out of range(0~100)', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<LinearProgress value={-1} />)).toThrow();
    expect(() => render(<LinearProgress value={101} />)).toThrow();
    spy.mockRestore();
  });

  it('renders progress with different orientation', () => {
    render(<LinearProgress orientation="vertical" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders progress with different progress color', () => {
    render(
      <>
        <LinearProgress progressColor="secondary" />
        <LinearProgress progressColor="yellow-400" />
        <LinearProgress progressColor="rgb(100, 200, 200)" />
      </>
    );
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBe(3);
  });

  it('renders progress with different track color', () => {
    render(
      <>
        <LinearProgress trackColor="gray-200" />
        <LinearProgress progressColor="yellow-400" trackColor="yellow-200" />
      </>
    );
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBe(2);
  });

  it('renders progress with different thickness', () => {
    render(<LinearProgress thickness={6} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders progress with different linecap', () => {
    render(
      <>
        <LinearProgress lineCap="round" />
        <LinearProgress lineCap="butt" />
      </>
    );
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBe(2);
  });

  it('renders indeterminate progress with different speed', () => {
    render(<LinearProgress speed={3} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });
});
