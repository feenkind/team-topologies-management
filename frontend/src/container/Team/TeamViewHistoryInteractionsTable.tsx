import * as React from 'react';
import { ITeam } from '../../store/slices/teamSlice';

import Table from '../../components/Table/Table';

interface ITeamViewHistoryInteractionsTableProps {
  team: ITeam;
  otherTeam: ITeam;
}
const TeamViewHistoryInteractionsTable: React.FC<
  ITeamViewHistoryInteractionsTableProps
> = ({ team, otherTeam }: ITeamViewHistoryInteractionsTableProps) => {
  return (
    <Table
      headerItems={[]}
      headerItemWidthsInPercentage={[]}
      contentItems={[]}
    />
  );
};

export default TeamViewHistoryInteractionsTable;
