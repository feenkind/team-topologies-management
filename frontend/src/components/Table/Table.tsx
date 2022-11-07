import * as React from 'react';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table as MuiTable,
  IconButton,
} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Link } from 'react-router-dom';

interface ITableProps {
  actions?: {
    id: string;
    view: boolean;
    edit: boolean;
    delete: boolean;
  }[];
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
              {actions && actions[rowIndex].id && (
                <TableCell align="right">
                  {actions[rowIndex].view && (
                    <IconButton
                      component={Link}
                      to={`/project/${actions[rowIndex].id}`}
                    >
                      <ManageSearchIcon />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;