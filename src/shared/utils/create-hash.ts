import { createHash as createSha256Hash } from "crypto";

export function createHash(input: string): string {
  return createSha256Hash("sha256").update(input).digest("hex");
}
