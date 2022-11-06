import * as React from 'react';
import { useAppSelector } from '../hooks';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const ProjectList: React.FC = () => {
  const projects = useAppSelector((state) => state.project.projects);

  // TODO: mark selected project
  return (
    <>
      <TableContainer sx={{ minWidth: 750 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {project.name}
                </TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell align="right">some actions (later)</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProjectList;
