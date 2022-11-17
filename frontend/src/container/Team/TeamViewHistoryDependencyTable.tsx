import * as React from 'react';
import { useAppSelector } from '../../hooks';
import { ITeam } from '../../store/slices/teamSlice';

interface ITeamViewHistoryDependencyTableProps {
  team: ITeam;
  otherTeam: ITeam;
}

const TeamViewHistoryDependencyTable: React.FC<
  ITeamViewHistoryDependencyTableProps
> = ({ team, otherTeam }: ITeamViewHistoryDependencyTableProps) => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const dependencyHistoryProject = useAppSelector(
    (state) => state.team.historyDependencies[currentProject.id],
  );

  const relevantDependencies = dependencyHistoryProject.filter(
    (dependencyHistory) =>
      (dependencyHistory.dependency.fromTeamId === team.id ||
        dependencyHistory.dependency.toTeamId === team.id) &&
      (dependencyHistory.dependency.fromTeamId === otherTeam.id ||
        dependencyHistory.dependency.toTeamId === otherTeam.id),
  );

  return <>Coming soon</>;
};

export default TeamViewHistoryDependencyTable;
