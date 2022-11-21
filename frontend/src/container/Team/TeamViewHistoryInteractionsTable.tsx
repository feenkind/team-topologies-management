import * as React from 'react';
import { changeType, ITeam } from '../../store/slices/teamSlice';

import Table from '../../components/Table/Table';
import { useAppSelector } from '../../hooks';
import { Alert } from '@mui/material';
import TeamInteractionModeCategory from '../../components/Categories/TeamInteractionModeCategory';

interface ITeamViewHistoryInteractionsTableProps {
  team: ITeam;
  otherTeam: ITeam;
}
const TeamViewHistoryInteractionsTable: React.FC<
  ITeamViewHistoryInteractionsTableProps
> = ({ team, otherTeam }: ITeamViewHistoryInteractionsTableProps) => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const interactionsHistoryProject = useAppSelector(
    (state) => state.team.historyInteractions[currentProject.id] || [],
  );

  const relevantInteractionsHistory = interactionsHistoryProject.filter(
    (history) =>
      (history.interaction.teamIdOne === team.id ||
        history.interaction.teamIdTwo === team.id) &&
      (history.interaction.teamIdOne === otherTeam.id ||
        history.interaction.teamIdTwo === otherTeam.id),
  );

  if (relevantInteractionsHistory.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 3 }}>
        {team.name} and {otherTeam.name} never had any interaction.
      </Alert>
    );
  }

  // order interactions desc by date
  const orderedInteractionsHistory = relevantInteractionsHistory
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return (
    <Table
      headerItems={[
        'Date',
        'History note',
        'Action',
        'Interaction mode',
        'Purpose',
        'Start date',
        'Duration',
        'Additional notes',
      ]}
      headerItemWidthsInPercentage={[10, 15, 10, 10, 15, 10, 10, 10]}
      contentItems={orderedInteractionsHistory.map((history) => [
        new Date(history.date).toLocaleDateString('en-GB'),
        history.changeReason || 'No note',
        `Interaction ${history.changeType}`,
        history.changeType === changeType.REMOVED ? (
          ''
        ) : (
          <TeamInteractionModeCategory
            interactionMode={history.interaction.interactionMode}
          />
        ),
        history.interaction.purpose,
        new Date(history.interaction.startDate).toLocaleDateString('en-GB'),
        `${history.interaction.expectedDuration} weeks`,
        history.interaction.additionalInformation || '',
      ])}
    />
  );
};

export default TeamViewHistoryInteractionsTable;
