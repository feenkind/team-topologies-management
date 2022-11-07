import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useAppSelector } from '../../hooks';
import PageHeadline from '../../components/Layout/PageHeadline';
import Page404 from '../../components/Page404';
import { Link, useParams } from 'react-router-dom';
import ButtonLink from '../../components/Buttons/ButtonLink';

const ProjectOverview: React.FC = () => {
  const { projectId } = useParams<{
    projectId: string;
  }>();

  const projects = useAppSelector((state) => state.project.projects);
  const currentProject = projects.find((project) => project.id === projectId);
  const projectDomains = useAppSelector(
    (state) => state.domain.domains[projectId || ''],
  );

  if (!currentProject) {
    return <Page404 />;
  }

  return (
    <>
      <PageHeadline text="Project overview" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
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

        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 275, backgroundColor: 'secondary.light' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Domains
              </Typography>
              {!projectDomains && (
                <Typography variant="h5" gutterBottom>
                  {currentProject.name} has no domains
                </Typography>
              )}
              {projectDomains && (
                <>
                  <Typography variant="h5" gutterBottom>
                    {currentProject.name} has {projectDomains.length} domains
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    {projectDomains.map((domain) => (
                      <ButtonLink
                        key={domain.id}
                        label={domain.name}
                        url={`/project/${projectId}/domain/${domain.id}`}
                      />
                    ))}
                  </Box>
                </>
              )}
            </CardContent>
            <CardActions sx={{ alignItems: 'center' }}>
              <Button
                component={Link}
                to={`/project/${projectId}/domains`}
                variant="contained"
                fullWidth
              >
                See domain list
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectOverview;
