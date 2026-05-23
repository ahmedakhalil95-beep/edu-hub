export type QuickRatioResult = {
  quickRatio: number;
};

export function calculateQuickRatio(
  currentAssets: number,
  inventory: number,
  currentLiabilities: number,
): QuickRatioResult {
  if (currentAssets < 0) {
    throw new Error("Current assets cannot be negative.");
  }

  if (inventory < 0) {
    throw new Error("Inventory cannot be negative.");
  }

  if (inventory > currentAssets) {
    throw new Error("Inventory cannot be greater than current assets.");
  }

  if (currentLiabilities <= 0) {
    throw new Error("Current liabilities must be greater than zero.");
  }

  const quickRatio = (currentAssets - inventory) / currentLiabilities;

  return {
    quickRatio,
  };
}
