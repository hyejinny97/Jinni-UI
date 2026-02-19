import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import FileInput from './FileInput';

describe('<FileInput />', () => {
  it('renders file input', () => {
    render(
      <FileInput data-testid="file-input" value={null}>
        Choose File
      </FileInput>
    );

    const input = screen.getByTestId('file-input') as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when file is selected', () => {
    const mockOnChange = vi.fn();
    render(
      <FileInput data-testid="file-input" value={null} onChange={mockOnChange}>
        Choose File
      </FileInput>
    );

    const input = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object), file);
  });

  it('renders multiple file input', () => {
    render(
      <FileInput data-testid="file-input" multiple value={[]}>
        Choose Files
      </FileInput>
    );

    const input = screen.getByTestId('file-input') as HTMLInputElement;
    expect(input.multiple).toBeTruthy();
  });

  it('calls onChange with multiple files when multiple is true', () => {
    const mockOnChange = vi.fn();
    const initialFiles = [
      new File(['content1'], 'test1.txt', { type: 'text/plain' })
    ];
    render(
      <FileInput
        data-testid="file-input"
        value={initialFiles}
        multiple
        onChange={mockOnChange}
      >
        Choose Files
      </FileInput>
    );

    const input = screen.getByTestId('file-input') as HTMLInputElement;
    const newFile = new File(['content2'], 'test2.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [newFile] } });

    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object), [
      ...initialFiles,
      newFile
    ]);
  });

  it('renders disabled file input', () => {
    render(
      <FileInput data-testid="file-input" value={null} disabled>
        Choose File
      </FileInput>
    );

    const input = screen.getByTestId('file-input') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.disabled).toBeTruthy();
  });
});
