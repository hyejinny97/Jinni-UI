import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import ButtonBase from './ButtonBase';

describe('<ButtonBase />', () => {
  it('renders button', () => {
    render(<ButtonBase>Label</ButtonBase>);
    const button = screen.getByRole('button', { name: 'Label' });
    expect(button).toBeInTheDocument();
  });

  it('renders link button', () => {
    render(<ButtonBase href="#">Label</ButtonBase>);
    const linkButton = screen.getByRole('link', { name: 'Label' });
    expect(linkButton).toBeInTheDocument();
  });

  it('renders disabled button', () => {
    render(<ButtonBase disabled>Label</ButtonBase>);
    const button = screen.getByRole('button', { name: 'Label' });
    expect(button).toBeDisabled();
  });
});
