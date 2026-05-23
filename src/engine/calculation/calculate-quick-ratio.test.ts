import { describe, expect, it } from "vitest";
import { calculateQuickRatio } from "./calculate-quick-ratio";

describe("calculateQuickRatio", () => {
  it("calculates quick ratio", () => {
    const result = calculateQuickRatio(120_000, 30_000, 60_000);

    expect(result.quickRatio).toBe(1.5);
  });

  it("rejects negative current assets", () => {
    expect(() => calculateQuickRatio(-1, 30_000, 60_000)).toThrow(
      "Current assets cannot be negative.",
    );
  });

  it("rejects negative inventory", () => {
    expect(() => calculateQuickRatio(120_000, -1, 60_000)).toThrow(
      "Inventory cannot be negative.",
    );
  });

  it("rejects inventory greater than current assets", () => {
    expect(() => calculateQuickRatio(120_000, 130_000, 60_000)).toThrow(
      "Inventory cannot be greater than current assets.",
    );
  });

  it("rejects current liabilities that are zero or lower", () => {
    expect(() => calculateQuickRatio(120_000, 30_000, 0)).toThrow(
      "Current liabilities must be greater than zero.",
    );
  });
});
