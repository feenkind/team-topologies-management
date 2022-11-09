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
import TeamLink from '../../components/Buttons/TeamLink';

const ProjectOverview: React.FC = () => {
  const { projectId } = useParams<{
    projectId: string;
  }>();

  const projects = useAppSelector((state) => state.project.projects);
  const currentProject = projects.find((project) => project.id === projectId);
  const projectDomains = useAppSelector(
    (state) => state.domain.domains[projectId || ''],
  );
  const projectTeams = useAppSelector((state) =>
    state.team.teams.filter(
      (team) => projectId && team.projects?.includes(projectId),
    ),
  );

  if (!currentProject) {
    return <Page404 />;
  }

  return (
    <>
      <PageHeadline text="Project overview" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: 'secondary.light' }}>
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
                    {currentProject.name} has {projectDomains.length} domain(s)
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
                See domain list for this project
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: 'secondary.main' }}>
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
          <Card sx={{ backgroundColor: 'primary.light' }}>
            <CardContent>
              <Typography variant="body2" color="white" gutterBottom>
                Teams
              </Typography>
              {projectTeams.length === 0 && (
                <Typography variant="h5" gutterBottom color="white">
                  {currentProject.name} has no teams
                </Typography>
              )}
              {projectTeams.length > 0 && (
                <>
                  <Typography variant="h5" gutterBottom color="white">
                    {projectTeams.length} team(s) work(s) on{' '}
                    {currentProject.name}
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    {projectTeams.map((team) => (
                      <TeamLink
                        key={team.id}
                        label={team.name}
                        teamTopology={team.topology}
                        url={`/team/${team.id}`}
                      />
                    ))}
                  </Box>
                </>
              )}
            </CardContent>
            <CardActions sx={{ alignItems: 'center' }}>
              <Button
                component={Link}
                to={`/project/${projectId}/teams`}
                variant="contained"
                fullWidth
              >
                See team list for this project
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectOverview;
