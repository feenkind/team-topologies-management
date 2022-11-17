import * as React from 'react';
import { useAppSelector } from '../../hooks';
import { ITeam } from '../../store/slices/teamSlice';

interface ITeamViewHistoryDependencyTableProps {
  team: ITeam;
  otherTeamId: string;
}

const TeamViewHistoryDependencyTable: React.FC<
  ITeamViewHistoryDependencyTableProps
> = ({ team, otherTeamId }: ITeamViewHistoryDependencyTableProps) => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const dependencyHistoryProject = useAppSelector(
    (state) => state.team.historyDependencies[currentProject.id],
  );

  return <>Coming soon</>;
};

export default TeamViewHistoryDependencyTable;
