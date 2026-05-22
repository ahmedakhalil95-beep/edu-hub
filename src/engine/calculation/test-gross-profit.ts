import { calculateGrossProfit } from "./calculate-gross-profit";

const validExample = {
  revenue: 100_000,
  costOfSales: 60_000,
};

const invalidZeroRevenue = {
  revenue: 0,
  costOfSales: 40_000,
};

const invalidNegativeCost = {
  revenue: 80_000,
  costOfSales: -5_000,
};

function logCalculationResult(
  label: string,
  revenue: number,
  costOfSales: number,
) {
  console.log(`\n=== ${label} ===`);
  console.log("Inputs:", { revenue, costOfSales });

  try {
    const result = calculateGrossProfit(revenue, costOfSales);
    console.log("Success: true");
    console.log("Result:", result);
  } catch (error) {
    console.log("Success: false");
    console.log(
      "Error:",
      error instanceof Error ? error.message : String(error),
    );
  }
}

logCalculationResult("Valid example", validExample.revenue, validExample.costOfSales);
logCalculationResult(
  "Invalid example: zero revenue",
  invalidZeroRevenue.revenue,
  invalidZeroRevenue.costOfSales,
);
logCalculationResult(
  "Invalid example: negative cost of sales",
  invalidNegativeCost.revenue,
  invalidNegativeCost.costOfSales,
);
