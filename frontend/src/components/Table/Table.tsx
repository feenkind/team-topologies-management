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
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

export interface ITableAction {
  basePath: string;
  view: boolean;
  edit: boolean;
  delete: boolean;
}

interface ITableProps {
  actions?: ITableAction[];
  contentItems: (string | React.ReactNode)[][];
  headerItems: string[];
  headerItemWidthsInPercentage?: number[];
}

const Table: React.FC<ITableProps> = ({
  actions,
  contentItems,
  headerItems,
  headerItemWidthsInPercentage,
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
            {headerItems.map((item, index) => (
              <TableCell
                width={
                  headerItemWidthsInPercentage &&
                  headerItemWidthsInPercentage[index] &&
                  `${headerItemWidthsInPercentage[index]}%`
                }
                key={item}
              >
                {item}
              </TableCell>
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

                  {actions[rowIndex].edit && (
                    <Tooltip title="Edit">
                      <IconButton
                        component={Link}
                        to={`${actions[rowIndex].basePath}/edit`}
                      >
                        <EditIcon />
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
