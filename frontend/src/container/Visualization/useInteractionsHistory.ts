import { IInteraction } from '../../store/slices/team/teamSlice';
import { useAppSelector } from '../../hooks';
import { changeType } from '../../types/changeTypes';

export const useInteractionsHistory = ({
  projectId,
  date,
}: {
  projectId: string;
  date: string;
}): { interactions: IInteraction[] } => {
  const interactionsHistory = useAppSelector(
    (state) => state.team.historyInteractions[projectId],
  );

  if (!interactionsHistory) {
    return { interactions: [] };
  }

  // order history asc by date
  const orderedInteractionHistory = interactionsHistory
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));

  // filter away all changes after requested date
  const relevantInteractionHistory = orderedInteractionHistory.filter(
    (history) => new Date(history.date) <= new Date(date),
  );

  const relevantInteractions: IInteraction[] = [];
  for (let i = 0; i < relevantInteractionHistory.length; i++) {
    const currentInteractionValue = relevantInteractionHistory[i].interaction;

    // check if current interaction value between two teams has been
    // re-added, resolved or changed after this date - if so, ignore the
    // current interaction
    const interactionDuplicate = relevantInteractionHistory
      .slice(i + 1)
      .find(
        (followingInteractionHistory) =>
          followingInteractionHistory.interaction.teamIdOne ===
            currentInteractionValue.teamIdOne &&
          followingInteractionHistory.interaction.teamIdTwo ===
            currentInteractionValue.teamIdTwo,
      );
    if (interactionDuplicate) {
      continue;
    }
    // if it is the last version of a dependency between two teams and it
    // has not been resolved, it is a relevant dependency to display
    if (relevantInteractionHistory[i].changeType !== changeType.REMOVED) {
      relevantInteractions.push(currentInteractionValue);
    }
  }
  return { interactions: relevantInteractions };
};
