import { IInteraction } from '../../store/slices/teamSlice';

export const filterTeamInteractions = ({
  interactions,
  teamId,
  filterCurrent,
  filterExpected,
}: {
  interactions: IInteraction[];
  teamId: string;
  filterCurrent?: boolean;
  filterExpected?: boolean;
}) => {
  const currentDate = new Date();
  if (!filterCurrent && !filterExpected) {
    return interactions.filter(
      (interaction) =>
        interaction.teamIdOne === teamId || interaction.teamIdTwo === teamId,
    );
  }

  if (filterCurrent) {
    return interactions.filter(
      (interaction) =>
        (interaction.teamIdOne === teamId ||
          interaction.teamIdTwo === teamId) &&
        new Date(interaction.startDate) <= currentDate,
    );
  }

  if (filterExpected) {
    return interactions.filter(
      (interaction) =>
        (interaction.teamIdOne === teamId ||
          interaction.teamIdTwo === teamId) &&
        new Date(interaction.startDate) > currentDate,
    );
  }
};
