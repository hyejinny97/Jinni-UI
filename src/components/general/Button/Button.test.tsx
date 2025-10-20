import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Button from './Button';
import { MailIcon } from '@/components/icons/MailIcon';
import { CircularProgress } from '@/components/feedback/CircularProgress';

describe('<Button />', () => {
  it('renders button ', () => {
    render(<Button>Label</Button>);
    const button = screen.getByRole('button', { name: 'Label' });
    expect(button).toBeInTheDocument();
  });

  it('renders button with different variant', () => {
    render(
      <>
        <Button variant="filled">Label</Button>
        <Button variant="subtle-filled">Label</Button>
        <Button variant="outlined">Label</Button>
        <Button variant="text">Label</Button>
      </>
    );
    const buttons = screen.getAllByRole('button', { name: 'Label' });
    expect(buttons.length).toBe(4);
  });

  it('renders button with different shape', () => {
    render(
      <>
        <Button shape="rounded">Label</Button>
        <Button shape="pill">Label</Button>
      </>
    );
    const buttons = screen.getAllByRole('button', { name: 'Label' });
    expect(buttons.length).toBe(2);
  });

  it('renders button with adornment', () => {
    render(
      <>
        <Button startAdornment={<MailIcon role="img" />}>Mail</Button>
        <Button endAdornment={<MailIcon role="img" />}>Mail</Button>
        <Button startAdornment={<CircularProgress />}>Label</Button>
      </>
    );
    const buttons = screen.getAllByRole('button', { name: 'Mail' });
    const adornments = screen.getAllByRole('img');
    const progress = screen.getByRole('progressbar');
    expect(buttons.length).toBe(2);
    expect(adornments.length).toBe(2);
    expect(progress).toBeInTheDocument();
  });

  it('renders fullWidth button', () => {
    render(<Button fullWidth>Label</Button>);
    const button = screen.getByRole('button', { name: 'Label' });
    expect(button).toBeInTheDocument();
  });

  it('renders button with different color', () => {
    render(
      <>
        <Button color="secondary">Label</Button>
        <Button color="yellow-400">Label</Button>
      </>
    );
    const buttons = screen.getAllByRole('button', { name: 'Label' });
    expect(buttons.length).toBe(2);
  });

  it('renders button with different size', () => {
    render(
      <>
        <Button size="sm">Label</Button>
        <Button size="md">Label</Button>
        <Button size="lg">Label</Button>
      </>
    );
    const buttons = screen.getAllByRole('button', { name: 'Label' });
    expect(buttons.length).toBe(3);
  });

  it('renders link button', () => {
    render(<Button href="#">Label</Button>);
    const linkButton = screen.getByRole('link', { name: 'Label' });
    expect(linkButton).toBeInTheDocument();
  });

  it('disable button', () => {
    render(<Button disabled>Label</Button>);
    const button = screen.getByRole('button', { name: 'Label' });
    expect(button).toBeDisabled();
  });
});
