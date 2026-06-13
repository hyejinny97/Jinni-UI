import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Label from './Label';

describe('<Label />', () => {
  it('renders content and children', () => {
    render(
      <Label content="label">
        <input />
      </Label>
    );

    const labelContent = screen.getByText('label');
    const childInput = screen.getByRole('textbox');
    expect(labelContent).toBeInTheDocument();
    expect(childInput).toBeInTheDocument();
  });

  it('shows required asterisk when required=true', () => {
    render(
      <Label content="label" required>
        <input />
      </Label>
    );

    const asterisk = document.querySelector(
      '.JinniLabelContentAsterisk'
    ) as HTMLElement | null;
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveTextContent('*');
  });
});
