import { useAppSelector } from '../../hooks';
import { ITeam } from '../../store/slices/teamSlice';
import { complexity } from '../../constants/categories';

export const useCognitiveLoad = ({
  team,
  projectId,
}: {
  team?: ITeam;
  projectId?: string;
}): { isLoadTooHigh: boolean } => {
  const domains = useAppSelector(
    (state) => (projectId && state.domain.domains[projectId]) || [],
  );
  if (!team || !projectId) {
    return {
      isLoadTooHigh: false,
    };
  }

  const amountSimpleDomains = domains.filter(
    (domain) =>
      team.domains?.includes(domain.id) &&
      domain.complexity === complexity.SIMPLE,
  ).length;
  const amountComplicatedDomains = domains.filter(
    (domain) =>
      team.domains?.includes(domain.id) &&
      domain.complexity === complexity.COMPLICATED,
  ).length;
  const amountComplexDomains = domains.filter(
    (domain) =>
      team.domains?.includes(domain.id) &&
      domain.complexity === complexity.COMPLEX,
  ).length;

  // subjective load feeling is most important
  // subjective cognitive load that is under 10 means on average 2/5 points for
  // each category
  if (team.cognitiveLoad <= 11) {
    return {
      isLoadTooHigh: true,
    };
  }
  // not more than one complex domain
  if (amountComplexDomains > 1) {
    return {
      isLoadTooHigh: true,
    };
  }
  // if one complex domain, no other domains
  if (
    amountComplexDomains === 1 &&
    (amountComplicatedDomains > 0 || amountSimpleDomains > 0)
  ) {
    return {
      isLoadTooHigh: true,
    };
  }
  // ideally not more then 1 complicated and not more than 3 simple domains
  if (amountComplicatedDomains > 1 || amountSimpleDomains > 3) {
    return {
      isLoadTooHigh: true,
    };
  }

  return {
    isLoadTooHigh: false,
  };
};
