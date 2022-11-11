import * as React from 'react';
import Table from '../../components/Table/Table';
import { Paper, Typography } from '@mui/material';
import { IDependency, ITeam } from '../../store/slices/teamSlice';
import { useAppSelector } from '../../hooks';
import DependencyCategory from '../../components/Categories/DependencyCategory';
import TeamLink from '../../components/Buttons/TeamLink';

interface ITeamViewDependenciesProps {
  team: ITeam;
}

const TeamViewDependencies: React.FC<ITeamViewDependenciesProps> = ({
  team,
}: ITeamViewDependenciesProps) => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);
  const dependencies = useAppSelector(
    (state) => state.team.dependencies[currentProject.id],
  );
  const teamsDependingOn =
    dependencies &&
    dependencies.filter((dependency) => dependency.fromTeamId === team.id);
  const dependingTeams =
    dependencies &&
    dependencies.filter((dependency) => dependency.toTeamId === team.id);

  const mapDependenciesToTableContent = (
    dependencies: IDependency[],
    dependingOnTheOtherTeam: boolean,
  ) =>
    dependencies.map((dependency) => {
      const otherTeam = teams.find(
        (team) =>
          team.id ===
          (dependingOnTheOtherTeam
            ? dependency.toTeamId
            : dependency.fromTeamId),
      );
      const teamsHaveDomainsInCommon =
        otherTeam &&
        otherTeam.domains?.filter((otherTeamDomain) =>
          team.domains?.includes(otherTeamDomain),
        ).length === 0;

      return otherTeam
        ? [
            <TeamLink
              key={otherTeam.id}
              label={otherTeam.name}
              url={`/project/${currentProject.id}/team/${otherTeam.id}`}
              teamTopology={otherTeam.topology}
            />,
            <DependencyCategory
              key={`dependency${dependency.fromTeamId}${dependency.toTeamId}`}
              dependencyType={dependency.dependencyType}
            />,
            teamsHaveDomainsInCommon ? 'no' : 'yes',
            dependency.description,
          ]
        : [];
    });

  const headerItems = [
    'Team name',
    'Dependency type',
    'Cross-domain',
    'Description',
  ];
  return (
    <>
      <Typography variant="button" component="h3" marginBottom={4}>
        Team {team.name} is depending on
      </Typography>
      <Paper variant="outlined">
        {teamsDependingOn && teamsDependingOn.length > 0 ? (
          <Table
            headerItems={headerItems}
            headerItemWidthsInPercentage={[20, 15, 15, 50]}
            contentItems={mapDependenciesToTableContent(teamsDependingOn, true)}
          />
        ) : (
          <Typography p={2}>
            This team does not depend on any other teams right now.
          </Typography>
        )}
      </Paper>
      <Typography
        variant="button"
        component="h3"
        marginTop={9}
        marginBottom={4}
      >
        Following teams depend on team {team.name}
      </Typography>
      <Paper variant="outlined">
        {dependingTeams && dependingTeams.length > 0 ? (
          <Table
            headerItems={headerItems}
            headerItemWidthsInPercentage={[20, 15, 15, 50]}
            contentItems={mapDependenciesToTableContent(dependingTeams, false)}
          />
        ) : (
          <Typography p={2}>
            No teams are depending on this team right now.
          </Typography>
        )}
      </Paper>
    </>
  );
};

export default TeamViewDependencies;
