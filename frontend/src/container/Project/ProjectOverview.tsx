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
import { Link } from 'react-router-dom';
import ButtonLink from '../../components/Buttons/ButtonLink';
import TeamLink from '../../components/Buttons/TeamLink';

const ProjectOverview: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const projects = useAppSelector((state) => state.project.projects);
  const currentProjectData = projects.find(
    (project) => project.id === currentProject.id,
  );
  const domains = useAppSelector(
    (state) => state.domain.domains[currentProject.id],
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);

  if (!currentProjectData) {
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
              {!domains && (
                <Typography variant="h5" gutterBottom>
                  {currentProject.name} has no domains
                </Typography>
              )}
              {domains && (
                <>
                  <Typography variant="h5" gutterBottom>
                    {currentProject.name} has {domains.length} domain(s)
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    {domains.map((domain) => (
                      <ButtonLink
                        key={domain.id}
                        label={domain.name}
                        url={`/project/${currentProject.id}/domain/${domain.id}`}
                      />
                    ))}
                  </Box>
                </>
              )}
            </CardContent>
            <CardActions sx={{ alignItems: 'center' }}>
              <Button
                component={Link}
                to={`/project/${currentProject.id}/domains`}
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
                {currentProjectData.description}
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
              {teams.length === 0 && (
                <Typography variant="h5" gutterBottom color="white">
                  {currentProject.name} has no teams
                </Typography>
              )}
              {teams.length > 0 && (
                <>
                  <Typography variant="h5" gutterBottom color="white">
                    {teams.length} team(s) work(s) on {currentProject.name}
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    {teams.map((team) => (
                      <TeamLink
                        key={team.id}
                        label={team.name}
                        teamType={team.topology}
                        url={`/project/${currentProject.id}/team/${team.id}`}
                      />
                    ))}
                  </Box>
                </>
              )}
            </CardContent>
            <CardActions sx={{ alignItems: 'center' }}>
              <Button
                component={Link}
                to={`/project/${currentProject.id}/teams`}
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
