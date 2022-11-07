import * as React from 'react';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table as MuiTable,
  IconButton,
  Tooltip,
} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Link } from 'react-router-dom';

interface ITableProps {
  actions?: {
    basePath: string;
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
    <TableContainer sx={{ width: '100%' }}>
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
              {actions && actions[rowIndex].basePath && (
                <TableCell align="right">
                  {actions[rowIndex].view && (
                    <Tooltip title="View">
                      <IconButton
                        component={Link}
                        to={`${actions[rowIndex].basePath}`}
                      >
                        <ManageSearchIcon />
                      </IconButton>
                    </Tooltip>
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
