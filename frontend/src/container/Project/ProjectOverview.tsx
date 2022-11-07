import * as React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';
import PageHeadline from '../../components/PageHeadline';

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
      <>
        <PageHeadline text="Project not found" />
        <Typography variant="body1" component="div">
          The project could not be loaded.
        </Typography>
      </>
    );
  }

  return (
    <>
      <PageHeadline text="Project overview" />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ minWidth: 275, backgroundColor: 'secondary.main' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Project Information
              </Typography>
              <Typography variant="h5" gutterBottom>
                {currentProject.name}
              </Typography>
              <Typography variant="body2">
                {currentProject.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectOverview;
