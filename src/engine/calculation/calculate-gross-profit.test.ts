import { describe, expect, it } from "vitest";
import { calculateGrossProfit } from "./calculate-gross-profit";

describe("calculateGrossProfit", () => {
  it("calculates gross profit and gross profit margin", () => {
    const result = calculateGrossProfit(100_000, 60_000);

    expect(result.grossProfit).toBe(40_000);
    expect(result.grossProfitMargin).toBe(40);
  });

  it("rejects revenue that is zero or lower", () => {
    expect(() => calculateGrossProfit(0, 10_000)).toThrow(
      "Revenue must be greater than zero.",
    );
  });

  it("rejects negative cost of sales", () => {
    expect(() => calculateGrossProfit(100_000, -1)).toThrow(
      "Cost of sales cannot be negative.",
    );
  });
});
