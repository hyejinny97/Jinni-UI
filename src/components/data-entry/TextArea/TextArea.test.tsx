import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import TextArea from './TextArea';

describe('<TextArea />', () => {
  it('renders textarea', () => {
    render(<TextArea />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
  });

  it('renders textarea with default value', () => {
    render(<TextArea defaultValue="content" />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe('content');
  });

  it('renders disabled textarea', () => {
    render(<TextArea disabled />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.disabled).toBeTruthy();
  });

  it('renders textarea with default rows', () => {
    render(<TextArea rows={3} />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.rows).toBe(3);
  });
});
