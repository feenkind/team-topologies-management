import { IDependency } from '../../store/slices/team/teamSlice';
import { useAppSelector } from '../../hooks';
import { changeType } from '../../constants/categories';

export const useDependencyHistory = ({
  projectId,
  date,
}: {
  projectId: string;
  date: string;
}): { dependencies: IDependency[] } => {
  const dependencyHistory = useAppSelector(
    (state) => state.team.historyDependencies[projectId],
  );

  if (!dependencyHistory) {
    return { dependencies: [] };
  }

  // order dependency history asc by date
  const orderedDependencyHistory = dependencyHistory
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));

  // filter away all changes after requested date
  const relevantDependencyHistory = orderedDependencyHistory.filter(
    (dependencyHistory) => new Date(dependencyHistory.date) <= new Date(date),
  );

  const relevantDependencies: IDependency[] = [];
  for (let i = 0; i < relevantDependencyHistory.length; i++) {
    const currentDependencyValue = relevantDependencyHistory[i].dependency;

    // check if current dependency value between two teams has been
    // re-added, resolved or changed after this date - if so, ignore the
    // current dependency
    const dependencyDuplicate = relevantDependencyHistory
      .slice(i + 1)
      .find(
        (followingDependencyHistory) =>
          followingDependencyHistory.dependency.fromTeamId ===
            currentDependencyValue.fromTeamId &&
          followingDependencyHistory.dependency.toTeamId ===
            currentDependencyValue.toTeamId,
      );
    if (dependencyDuplicate) {
      continue;
    }
    // if it is the last version of a dependency between two teams and it
    // has not been resolved, it is a relevant dependency to display
    if (relevantDependencyHistory[i].changeType !== changeType.REMOVED) {
      relevantDependencies.push(currentDependencyValue);
    }
  }
  return { dependencies: relevantDependencies };
};
