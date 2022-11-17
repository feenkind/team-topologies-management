import { IDependency } from '../../store/slices/teamSlice';
import { useAppSelector } from '../../hooks';

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
  const currentDependencies = useAppSelector(
    (state) => state.team.dependencies[projectId],
  );
  const today = new Date();

  if (date === today.toDateString() && currentDependencies) {
    return { dependencies: currentDependencies };
  }

  return { dependencies: [] };

  // if (!dependencyHistory) {
  //   return { dependencies: [] };
  // }
  //
  // return { dependencies: [dependencyHistory[0].dependency] };
};
