import { useAppSelector } from '../../hooks';
import { ITeam } from '../../store/slices/teamSlice';
import { complexity } from '../../constants/categories';

export const useCognitiveLoad = ({
  team,
  projectId,
}: {
  team?: ITeam;
  projectId?: string;
}): { isSubjectiveLoadTooHigh: boolean; isComplexityLoadToHigh: boolean } => {
  const domains = useAppSelector(
    (state) => (projectId && state.domain.domains[projectId]) || [],
  );
  if (!team || !projectId) {
    return {
      isSubjectiveLoadTooHigh: false,
      isComplexityLoadToHigh: false,
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

  // subjective cognitive load that is over 20 means on average 4/5 points for
  // each category
  const isSubjectiveLoadTooHigh = team.cognitiveLoad >= 20;

  // not more than one complex domain
  if (amountComplexDomains > 1) {
    return {
      isSubjectiveLoadTooHigh,
      isComplexityLoadToHigh: true,
    };
  }
  // if one complex domain, no other domains
  if (
    amountComplexDomains === 1 &&
    (amountComplicatedDomains > 0 || amountSimpleDomains > 0)
  ) {
    return {
      isSubjectiveLoadTooHigh,
      isComplexityLoadToHigh: true,
    };
  }
  // ideally not more then 1 complicated and not more than 3 simple domains
  if (amountComplicatedDomains > 1 || amountSimpleDomains > 3) {
    return {
      isSubjectiveLoadTooHigh,
      isComplexityLoadToHigh: true,
    };
  }

  return {
    isSubjectiveLoadTooHigh,
    isComplexityLoadToHigh: false,
  };
};
