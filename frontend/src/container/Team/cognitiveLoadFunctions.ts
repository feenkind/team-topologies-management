export const isCognitiveLoadTooHigh = ({
  cognitiveLoadPoints,
  amountSimpleDomains,
  amountComplicatedDomains,
  amountComplexDomains,
}: {
  cognitiveLoadPoints: number;
  amountSimpleDomains: number;
  amountComplicatedDomains: number;
  amountComplexDomains: number;
}): boolean => {
  // subjective load feeling is most important
  // subjective cognitive load that is under 10 means on average 2/5 points for
  // each category
  if (cognitiveLoadPoints <= 11) {
    return true;
  }
  // not more than one complex domain
  if (amountComplexDomains > 1) {
    return true;
  }
  // if one complex domain, no other domains
  if (
    amountComplexDomains === 1 &&
    (amountComplicatedDomains > 0 || amountSimpleDomains > 0)
  ) {
    return true;
  }
  // ideally not more then 1 complicated and not more than 3 simple domains
  if (amountComplicatedDomains > 1 || amountSimpleDomains > 3) {
    return true;
  }

  return false;
};
