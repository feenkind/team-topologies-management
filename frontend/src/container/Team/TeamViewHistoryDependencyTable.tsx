import * as React from 'react';
import { useAppSelector } from '../../hooks';
import { ITeam } from '../../store/slices/teamSlice';
import { Alert } from '@mui/material';
import Table from '../../components/Table/Table';

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

  const relevantDependencyHistories = dependencyHistoryProject.filter(
    (dependencyHistory) =>
      (dependencyHistory.dependency.fromTeamId === team.id ||
        dependencyHistory.dependency.toTeamId === team.id) &&
      (dependencyHistory.dependency.fromTeamId === otherTeam.id ||
        dependencyHistory.dependency.toTeamId === otherTeam.id),
  );

  if (relevantDependencyHistories.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 3 }}>
        {team.name} and {otherTeam.name} never had any dependencies.
      </Alert>
    );
  }

  // order dependencies desc by date
  const orderedDependencyHistories = relevantDependencyHistories
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return (
    <Table
      headerItems={[
        'Date',
        'History note',
        'Dependency action',
        'Dependency type',
        'Description',
      ]}
      headerItemWidthsInPercentage={[10, 25, 20, 15, 30]}
      contentItems={orderedDependencyHistories.map((dependencyHistory) => [
        new Date(dependencyHistory.date).toLocaleDateString('en-GB'),
        dependencyHistory.changeReason || 'No note',
        dependencyHistory.changeType,
        dependencyHistory.dependency.dependencyType,
        dependencyHistory.dependency.description,
      ])}
    />
  );
};

export default TeamViewHistoryDependencyTable;
