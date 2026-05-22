export type CurrentRatioResult = {
  currentRatio: number;
};

export function calculateCurrentRatio(
  currentAssets: number,
  currentLiabilities: number,
): CurrentRatioResult {
  if (currentAssets < 0) {
    throw new Error("Current assets cannot be negative.");
  }

  if (currentLiabilities <= 0) {
    throw new Error("Current liabilities must be greater than zero.");
  }

  const currentRatio = currentAssets / currentLiabilities;

  return {
    currentRatio,
  };
}
