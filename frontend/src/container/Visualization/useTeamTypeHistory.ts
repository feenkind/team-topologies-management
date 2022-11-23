import { useAppSelector } from '../../hooks';
import { teamType } from '../../constants/categories';
import { ITeam } from '../../store/slices/team/teamSlice';

interface ITeamTypesByTeamId {
  [keys: string]: teamType;
}

const mapCurrentTeamDataToTeamTypesByTeamId = (
  teams: ITeam[],
): ITeamTypesByTeamId => {
  const currentTeamTypesByTeamId: ITeamTypesByTeamId = {};
  teams.forEach((team) => {
    currentTeamTypesByTeamId[team.id] = team.type;
  });

  return currentTeamTypesByTeamId;
};

export const useTeamTypeHistory = ({
  projectId,
  date,
}: {
  projectId: string;
  date: string;
}): { teamTypesByTeamId: ITeamTypesByTeamId } => {
  const teamTypeHistory = useAppSelector(
    (state) => state.team.historyTeamTypes,
  );
  const currentTeamData = useAppSelector(
    (state) => state.team.teams[projectId],
  );
  if (!currentTeamData) {
    return {
      teamTypesByTeamId: {},
    };
  }

  const currentTeamTypesByTeamId =
    mapCurrentTeamDataToTeamTypesByTeamId(currentTeamData);
  if (!teamTypeHistory) {
    return {
      teamTypesByTeamId: currentTeamTypesByTeamId,
    };
  }

  const requestedDate = new Date(date);
  const teamTypesByTeamId: ITeamTypesByTeamId = {};

  for (let i = 0; i < currentTeamData.length; i++) {
    const team = currentTeamData[i];
    // if this team has no history, add current data and continue with the
    // next team
    if (!teamTypeHistory[team.id]) {
      teamTypesByTeamId[team.id] = currentTeamTypesByTeamId[team.id];
      continue;
    }

    // order history asc by date
    const orderedTeamHistory = teamTypeHistory[team.id]
      .slice()
      .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
    // filter away all changes after requested date
    const relevantTeamHistory = orderedTeamHistory.filter(
      (history) => new Date(history.date) <= requestedDate,
    );

    // add latest team type before this date - if there is none, add
    // current team type
    teamTypesByTeamId[team.id] =
      relevantTeamHistory.length > 0
        ? relevantTeamHistory[relevantTeamHistory.length - 1].teamType
        : currentTeamTypesByTeamId[team.id];
  }

  return { teamTypesByTeamId };
};
