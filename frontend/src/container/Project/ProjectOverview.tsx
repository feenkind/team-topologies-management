import * as React from 'react';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';

const ProjectOverview: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );

  return (
    <>
      <Typography variant="body2" component="div">
        Hello, welcome to your project: {currentProject}
      </Typography>
      <Link to="/projects">View all projects</Link>
    </>
  );
};

export default ProjectOverview;
