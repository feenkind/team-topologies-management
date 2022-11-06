import * as React from 'react';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table as MuiTable,
} from '@mui/material';

interface ITableProps {
  actions: boolean;
  contentItems: string[][] | React.ReactNode[][];
  headerItems: string[];
}

const Table: React.FC<ITableProps> = ({
  actions,
  contentItems,
  headerItems,
}: ITableProps) => {
  return (
    <TableContainer sx={{ minWidth: 750 }}>
      <MuiTable>
        <TableHead>
          <TableRow
            sx={{
              '& th': {
                fontWeight: 'bolder',
              },
            }}
          >
            {headerItems.map((item) => (
              <TableCell key={item}>{item}</TableCell>
            ))}
            {actions && <TableCell align="right">Actions</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {contentItems.map((rowItems, rowIndex) => (
            <TableRow
              hover
              key={`tableRow${rowIndex}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {rowItems &&
                rowItems.map((item, columnIndex) => (
                  <TableCell key={`tableRow${rowIndex}Column${columnIndex}`}>
                    {item}
                  </TableCell>
                ))}
              {actions && (
                <TableCell align="right">some actions (later)</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
