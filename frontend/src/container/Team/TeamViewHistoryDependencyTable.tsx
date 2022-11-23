import * as React from 'react';
import { useAppSelector } from '../../hooks';
import { changeType, ITeam } from '../../store/slices/team/teamSlice';
import { Alert } from '@mui/material';
import Table from '../../components/Table/Table';
import DependencyCategory from '../../components/Categories/DependencyCategory';

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
    (state) => state.team.historyDependencies[currentProject.id] || [],
  );

  const relevantDependencyHistory = dependencyHistoryProject.filter(
    (dependencyHistory) =>
      (dependencyHistory.dependency.fromTeamId === team.id ||
        dependencyHistory.dependency.toTeamId === team.id) &&
      (dependencyHistory.dependency.fromTeamId === otherTeam.id ||
        dependencyHistory.dependency.toTeamId === otherTeam.id),
  );

  if (relevantDependencyHistory.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 3 }}>
        {team.name} and {otherTeam.name} never had any dependencies.
      </Alert>
    );
  }

  // order dependencies desc by date
  const orderedDependencyHistory = relevantDependencyHistory
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return (
    <Table
      headerItems={[
        'Date',
        'History note',
        'Action',
        'Dependency type',
        'Description',
      ]}
      headerItemWidthsInPercentage={[10, 25, 20, 15, 30]}
      contentItems={orderedDependencyHistory.map((dependencyHistory) => [
        new Date(dependencyHistory.date).toLocaleDateString('en-GB'),
        dependencyHistory.changeReason || 'No note',
        `Dependency ${dependencyHistory.changeType}`,
        dependencyHistory.changeType === changeType.REMOVED ? (
          ''
        ) : (
          <DependencyCategory
            key={dependencyHistory.date}
            dependencyType={dependencyHistory.dependency.dependencyType}
          />
        ),
        dependencyHistory.changeType === changeType.REMOVED
          ? ''
          : dependencyHistory.dependency.description,
      ])}
    />
  );
};

export default TeamViewHistoryDependencyTable;
