import * as React from 'react';
import { ITeam } from '../../store/slices/teamSlice';
import { useAppSelector } from '../../hooks';
import { Alert } from '@mui/material';
import Table from '../../components/Table/Table';
import TeamTypeCategory from '../../components/Categories/TeamTypeCategory';

interface ITeamViewHistoryTeamTypeTableProps {
  team: ITeam;
}
const TeamViewHistoryTeamTypeTable: React.FC<
  ITeamViewHistoryTeamTypeTableProps
> = ({ team }: ITeamViewHistoryTeamTypeTableProps) => {
  const teamTypeHistory = useAppSelector(
    (state) => state.team.historyTeamTypes[team.id] || [],
  );

  if (teamTypeHistory.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 3 }}>
        {team.name} has always been a team with team type {team.type}.
      </Alert>
    );
  }

  // order team type history desc by date
  const orderedTeamTypeHistory = teamTypeHistory
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return (
    <Table
      headerItems={['Date', 'History note', 'Team type']}
      headerItemWidthsInPercentage={[20, 50, 30]}
      contentItems={orderedTeamTypeHistory.map((history) => [
        new Date(history.date).toLocaleDateString('en-GB'),
        history.changeReason || 'No note',
        <TeamTypeCategory key={history.date} teamType={history.teamType} />,
      ])}
    />
  );
};

export default TeamViewHistoryTeamTypeTable;
