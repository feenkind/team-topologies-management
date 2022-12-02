import * as React from 'react';
import {
  Box,
  Button,
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
import DependencyCategory from '../../components/Categories/DependencyCategory';
import TeamInteractionModeCategory from '../../components/Categories/TeamInteractionModeCategory';
import { interactionMode } from '../../types/interactionTypes';
import { dependencyType } from '../../types/dependencyType';
import CardLight from '../../components/Card/CardLight';
import CardRegular from '../../components/Card/CardRegular';
import CardCategory from '../../components/Card/CardCategory';

const getDependencyPluralization = (dependencyLength: number): string =>
  dependencyLength === 1 ? 'dependency' : 'dependencies';
const getInteractionPluralization = (interactionLength: number): string =>
  interactionLength === 1 ? 'interaction mode' : 'interaction modes';
const getArePluralization = (dependencyLength: number): string =>
  dependencyLength === 1 ? 'is' : 'are';

const ProjectOverview: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const projects = useAppSelector((state) => state.project.projects);
  const currentProjectData = projects.find(
    (project) => project.id === currentProject.id,
  );
  const domains = useAppSelector(
    (state) => state.domain.domains[currentProject.id] || [],
  );
  const teams = useAppSelector(
    (state) => state.team.teams[currentProject.id] || [],
  );
  const interactions = useAppSelector(
    (state) => state.team.interactions[currentProject.id] || [],
  );
  const dependencies = useAppSelector(
    (state) => state.team.dependencies[currentProject.id] || [],
  );

  const currentDate = new Date();
  const currentInteractions = interactions
    ? interactions.filter(
        (interaction) => new Date(interaction.startDate) <= currentDate,
      )
    : [];
  const collaborationInteractionsLength = currentInteractions.filter(
    (interaction) =>
      interaction.interactionMode === interactionMode.COLLABORATION,
  ).length;
  const xAsAServiceInteractionsLength = currentInteractions.filter(
    (interaction) =>
      interaction.interactionMode === interactionMode.X_AS_A_SERVICE,
  ).length;
  const facilitatingInteractionsLength = currentInteractions.filter(
    (interaction) =>
      interaction.interactionMode === interactionMode.FACILITATING,
  ).length;
  const undefinedInteractionsLength = currentInteractions.filter(
    (interaction) => interaction.interactionMode === interactionMode.UNDEFINED,
  ).length;

  const currentDependencies = dependencies || [];
  const blockingDependenciesLength = currentDependencies.filter(
    (dependency) => dependency.dependencyType === dependencyType.BLOCKING,
  ).length;
  const slowingDependenciesLength = currentDependencies.filter(
    (dependency) => dependency.dependencyType === dependencyType.SLOWING,
  ).length;
  const okDependenciesLength = currentDependencies.filter(
    (dependency) => dependency.dependencyType === dependencyType.OK,
  ).length;

  if (!currentProjectData) {
    return <Page404 />;
  }

  return (
    <>
      <PageHeadline text="Project overview" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CardLight>
            <CardContent>
              <CardCategory>Interactions & Dependencies</CardCategory>
              {currentInteractions.length === 0 && (
                <Typography>
                  {currentProject.name} has currently no interactions between
                  teams.
                </Typography>
              )}
              {currentInteractions.length > 0 && (
                <>
                  <Typography>
                    Number of current interactions between teams in the project:{' '}
                    <Typography component="span" variant="h6">
                      {currentInteractions.length}
                    </Typography>
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="body2"
                      mr={0.5}
                    >{`${collaborationInteractionsLength} ${getInteractionPluralization(
                      collaborationInteractionsLength,
                    )} ${getArePluralization(
                      collaborationInteractionsLength,
                    )}`}</Typography>
                    <TeamInteractionModeCategory
                      interactionMode={interactionMode.COLLABORATION}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="body2"
                      mr={0.5}
                    >{`${xAsAServiceInteractionsLength} ${getInteractionPluralization(
                      xAsAServiceInteractionsLength,
                    )} ${getArePluralization(
                      xAsAServiceInteractionsLength,
                    )}`}</Typography>
                    <TeamInteractionModeCategory
                      interactionMode={interactionMode.X_AS_A_SERVICE}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="body2"
                      mr={0.5}
                    >{`${facilitatingInteractionsLength} ${getInteractionPluralization(
                      facilitatingInteractionsLength,
                    )} ${getArePluralization(
                      facilitatingInteractionsLength,
                    )}`}</Typography>
                    <TeamInteractionModeCategory
                      interactionMode={interactionMode.FACILITATING}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="body2"
                      mr={0.5}
                    >{`${undefinedInteractionsLength} ${getInteractionPluralization(
                      undefinedInteractionsLength,
                    )} ${getArePluralization(
                      undefinedInteractionsLength,
                    )}`}</Typography>
                    <TeamInteractionModeCategory
                      interactionMode={interactionMode.UNDEFINED}
                    />
                  </Box>
                </>
              )}

              {currentDependencies.length === 0 && (
                <Typography>
                  {currentProject.name} has currently no dependencies between
                  teams.
                </Typography>
              )}
              {currentDependencies.length > 0 && (
                <>
                  <Typography sx={{ mt: 2 }}>
                    Number of current dependencies between teams in the project:{' '}
                    <Typography component="span" variant="h6">
                      {currentDependencies.length}
                    </Typography>
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body2"
                      mr={0.5}
                    >{`${blockingDependenciesLength} ${getDependencyPluralization(
                      blockingDependenciesLength,
                    )} ${getArePluralization(
                      blockingDependenciesLength,
                    )}`}</Typography>
                    <DependencyCategory
                      dependencyType={dependencyType.BLOCKING}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body2"
                      mr={0.5}
                    >{`${slowingDependenciesLength} ${getDependencyPluralization(
                      slowingDependenciesLength,
                    )} ${getArePluralization(
                      slowingDependenciesLength,
                    )}`}</Typography>
                    <DependencyCategory
                      dependencyType={dependencyType.SLOWING}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body2"
                      mr={0.5}
                    >{`${okDependenciesLength} ${getDependencyPluralization(
                      okDependenciesLength,
                    )} ${getArePluralization(
                      okDependenciesLength,
                    )}`}</Typography>
                    <DependencyCategory dependencyType={dependencyType.OK} />
                  </Box>
                </>
              )}
            </CardContent>
            <CardActions sx={{ alignItems: 'center' }}>
              <Button
                component={Link}
                to={`/project/${currentProject.id}/visualization`}
                variant="contained"
                color="secondary"
              >
                See visualization for interactions and dependencies
              </Button>
            </CardActions>
          </CardLight>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardRegular>
            <CardContent>
              <CardCategory>Project information for</CardCategory>
              <Typography variant="h5" sx={{ mb: 3 }}>
                {currentProject.name}
              </Typography>
              <Typography variant="body2">
                {currentProjectData.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ alignItems: 'center' }}>
              <Button
                component={Link}
                to={`/project/${currentProject.id}/edit`}
                variant="outlined"
                color="primary"
              >
                Edit project details
              </Button>
              <Button
                component={Link}
                to={`/project/${currentProject.id}/delete`}
                variant="outlined"
                color="warning"
              >
                Delete project
              </Button>
            </CardActions>
          </CardRegular>
        </Grid>

        <Grid item xs={12} md={12}>
          <CardLight>
            <CardContent>
              <CardCategory>Domains</CardCategory>
              {!domains && (
                <Typography>{currentProject.name} has no domains.</Typography>
              )}
              {domains && (
                <>
                  <Typography>
                    Number of domains in the project:{' '}
                    <Typography component="span" variant="h6">
                      {domains.length}
                    </Typography>
                  </Typography>
                  <Typography mt={2}>List of domains:</Typography>
                  <Box sx={{ mb: 2, mt: 1 }}>
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
                color="secondary"
              >
                See domain details for this project
              </Button>
            </CardActions>
          </CardLight>
        </Grid>

        <Grid item xs={12} md={12}>
          <CardLight>
            <CardContent>
              <CardCategory>Teams</CardCategory>
              {teams.length === 0 && (
                <Typography>{currentProject.name} has no teams.</Typography>
              )}
              {teams.length > 0 && (
                <>
                  <Typography>
                    Number of teams working on project the project:{' '}
                    <Typography component="span" variant="h6">
                      {teams.length}
                    </Typography>
                  </Typography>
                  <Typography mt={2}>List of teams:</Typography>
                  <Box sx={{ mb: 2 }}>
                    {teams.map((team) => (
                      <TeamLink
                        key={team.id}
                        label={team.name}
                        teamType={team.type}
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
                color="secondary"
              >
                See team details for this project
              </Button>
            </CardActions>
          </CardLight>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectOverview;
