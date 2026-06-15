import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import TableContainer from '@/components/TableContainer';
import Table from '@/components/Table';
import TableHead from '@/components/TableHead';
import TableBody from '@/components/TableBody';
import TableRow from '@/components/TableRow';
import TableCell from '@/components/TableCell';
import Box from '@/components/Box';

const COLUMNS = [
  { headerName: 'Breakpoint Type', field: 'bpType' },
  { headerName: 'Viewport Width', field: 'bpValue' }
] as const;

const ROWS = [
  { bpType: 'xs', bpValue: '0px' },
  { bpType: 'sm', bpValue: '600px' },
  { bpType: 'md', bpValue: '900px' },
  { bpType: 'lg', bpValue: '1200px' },
  { bpType: 'xl', bpValue: '1536px' }
] as const;

const BreakpointTable = () => {
  return (
    <JinniProviderWrapper>
      <TableContainer
        as={Box}
        elevation={2}
        round="xs"
        style={{ width: 'max-content' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => {
                return (
                  <TableCell key={column.field}>{column.headerName}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {ROWS.map((row) => {
              return (
                <TableRow key={row.bpType}>
                  {COLUMNS.map((column) => {
                    return (
                      <TableCell
                        key={column.field}
                        style={{ minWidth: '100px' }}
                      >
                        {row[column.field]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </JinniProviderWrapper>
  );
};

export default BreakpointTable;
