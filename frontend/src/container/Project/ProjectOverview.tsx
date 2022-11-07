import * as React from 'react';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';

const ProjectOverview: React.FC = () => {
  const currentProjectId = useAppSelector(
    (state) => state.project.currentProjectId,
  );
  const projects = useAppSelector((state) => state.project.projects);
  const currentProject = projects.find(
    (project) => project.id === currentProjectId,
  );

  if (!currentProject) {
    return (
      <Typography variant="body1" component="div">
        The project could not be loaded.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="body1" component="div">
        Hello, welcome to your project: {currentProject.name}
      </Typography>
    </>
  );
};

export default ProjectOverview;
