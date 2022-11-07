import * as React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';
import PageHeadline from '../../components/PageHeadline';
import Page404 from '../../components/Page404';

const ProjectOverview: React.FC = () => {
  const currentProjectId = useAppSelector(
    (state) => state.project.currentProject.id,
  );
  const projects = useAppSelector((state) => state.project.projects);
  const currentProject = projects.find(
    (project) => project.id === currentProjectId,
  );

  if (!currentProject) {
    return <Page404 />;
  }

  return (
    <>
      <PageHeadline text="Project overview" />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ minWidth: 275, backgroundColor: 'secondary.main' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Project information for
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
