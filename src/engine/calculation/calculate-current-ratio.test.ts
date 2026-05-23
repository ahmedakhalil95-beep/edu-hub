import { describe, expect, it } from "vitest";
import { calculateCurrentRatio } from "./calculate-current-ratio";

describe("calculateCurrentRatio", () => {
  it("calculates current ratio", () => {
    const result = calculateCurrentRatio(120_000, 60_000);

    expect(result.currentRatio).toBe(2);
  });

  it("rejects negative current assets", () => {
    expect(() => calculateCurrentRatio(-1, 60_000)).toThrow(
      "Current assets cannot be negative.",
    );
  });

  it("rejects current liabilities that are zero or lower", () => {
    expect(() => calculateCurrentRatio(120_000, 0)).toThrow(
      "Current liabilities must be greater than zero.",
    );
  });
});
