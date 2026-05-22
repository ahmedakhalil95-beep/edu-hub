export type GrossProfitResult = {
  grossProfit: number;
  grossProfitMargin: number;
};

export function calculateGrossProfit(
  revenue: number,
  costOfSales: number,
): GrossProfitResult {
  if (revenue <= 0) {
    throw new Error("Revenue must be greater than zero.");
  }

  if (costOfSales < 0) {
    throw new Error("Cost of sales cannot be negative.");
  }

  const grossProfit = revenue - costOfSales;
  const grossProfitMargin = (grossProfit / revenue) * 100;

  return {
    grossProfit,
    grossProfitMargin,
  };
}
