import { IDependency } from '../../store/slices/teamSlice';
import { useAppSelector } from '../../hooks';

export const useDependencyHistory = ({
  projectId,
  date,
}: {
  projectId: string;
  date: string;
}): { dependencies: IDependency[] } => {
  const dependencies = useAppSelector(
    (state) => state.team.historyDependencies[projectId],
  );

  if (!dependencies) {
    return { dependencies: [] };
  }

  return { dependencies: [dependencies[0].dependency] };
};
