import { describe, it, expect } from 'vitest';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter
} from '.';
import { render, screen } from '@/tests/react-testing-tools';

const TableTemplate = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Head 1</TableCell>
            <TableCell>Head 1</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Row 1 - 1</TableCell>
            <TableCell>Row 1 - 2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2 - 1</TableCell>
            <TableCell>Row 2 - 2</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer 1</TableCell>
            <TableCell>Footer 2</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

describe('<Table />', () => {
  it('render Table', () => {
    render(<TableTemplate />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const container = table.parentElement;
    expect(container).toHaveClass('JinniTableContainer');

    const thead = container?.querySelector('thead');
    expect(thead).toBeInTheDocument();

    const tbody = container?.querySelector('tbody');
    expect(tbody).toBeInTheDocument();

    const tfoot = container?.querySelector('tfoot');
    expect(tfoot).toBeInTheDocument();
  });

  it('should render td element in tbody', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const row = screen.getByRole('row');
    expect(row).toBeInTheDocument();

    const cell = screen.getByText('Cell Content');
    expect(cell).toBeInTheDocument();
    expect(cell.tagName).toBe('TD');
  });

  it('should render th element in thead', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Header Content</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    );

    const row = screen.getByRole('row');
    expect(row).toBeInTheDocument();

    const cell = screen.getByText('Header Content');
    expect(cell).toBeInTheDocument();
    expect(cell.tagName).toBe('TH');
  });
});
