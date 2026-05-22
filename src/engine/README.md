# Edu Hub Engine

The **engine** holds business logic for questions and calculations. It is separate from the website UI (`src/app`) and from the database (`src/lib/supabase`).

Design goal: **predictable, testable, deterministic** behavior — the same inputs always produce the same outputs.

---

## Layers

### 1. Validation (`validation/`)

**Purpose:** Check that data matches the expected shape before the engine uses it.

- Example: `validateQuestion()` uses `QuestionSchema` (Zod) from `src/shared/schemas/`.
- Returns a safe result (`success` / `error`) instead of crashing on bad data.

**Think of it as:** a bouncer at the door — only well-formed questions enter the pipeline.

---

### 2. Calculation (`calculation/`)

**Purpose:** Pure math and formulas. No AI, no database, no UI.

- Example: `calculateGrossProfit(revenue, costOfSales)` returns `grossProfit` and `grossProfitMargin`.
- Validates inputs (e.g. revenue must be positive) and throws clear errors when rules are broken.

**Think of it as:** a calculator — numbers in, numbers out.

---

### 3. Generation (`generation/`)

**Purpose:** Connect structured questions to the right calculations and produce learner-facing output.

- Example: `resolveGrossProfitQuestion(question)` reads `revenue` and `costOfSales` from `question.inputs`, runs the calculation layer, and returns numeric results plus `answerText`.

**Think of it as:** an assembler — it knows which calculation a question needs and how to run it.

---

## Deterministic philosophy

| Principle | What it means here |
|-----------|-------------------|
| **No randomness** | No AI or “guess” in core engine paths |
| **Same inputs → same outputs** | Given the same `Question` and figures, results are always identical |
| **Pure calculations** | `calculation/` functions depend only on their arguments |
| **Explicit errors** | Invalid data fails with readable messages, not silent wrong answers |
| **Schema-first** | Questions are described in `src/shared/schemas/` before engines trust them |

This keeps ACCA-style training trustworthy: students and auditors can reproduce results.

---

## Gross profit example flow

End-to-end path for a calculation-based gross profit question:

```mermaid
flowchart LR
  Q[Question object]
  V[validateQuestion]
  R[resolveGrossProfitQuestion]
  C[calculateGrossProfit]
  O[Result + answerText]

  Q --> V
  V -->|valid Question| R
  R --> C
  C --> O
```

**Step by step**

1. **Schema** — A question includes `inputs` such as `{ revenue: 100000, costOfSales: 60000 }` (see `question.schema.ts`).
2. **Validation** — `validateQuestion(data)` confirms the object is a valid `Question`.
3. **Generation** — `resolveGrossProfitQuestion(question)` reads `inputs.revenue` and `inputs.costOfSales`.
4. **Calculation** — `calculateGrossProfit(revenue, costOfSales)` computes profit and margin.
5. **Output** — e.g. `grossProfit: 40000`, `grossProfitMargin: 40`, and a short `answerText` string.

**Example result**

- Gross profit: `40,000`
- Gross profit margin: `40%`
- Answer text: *"Gross profit is 40000 with a gross profit margin of 40.00%."*

---

## Folder layout

```
src/engine/
├── README.md                 ← this file
├── calculation/
│   ├── calculate-gross-profit.ts
│   ├── index.ts
│   └── test-gross-profit.ts      (manual learning script)
├── validation/
│   ├── validate-question.ts
│   └── test-question.ts            (manual learning script)
└── generation/
    ├── resolve-gross-profit-question.ts
    ├── index.ts
    └── test-resolve-gross-profit.ts (manual learning script)
```

Files named `test-*.ts` are **manual scripts** for learning (run with `npx tsx`). They are not formal unit tests yet.

---

## Imports (barrel files)

- `@/engine/calculation` — e.g. `calculateGrossProfit`
- `@/engine/generation` — e.g. `resolveGrossProfitQuestion`
- `@/engine/validation/validate-question` — question validation (no index yet)

---

## What is not in the engine (yet)

- Website pages and components
- Supabase / database calls
- AI question generation
- Formal test runners (Jest / Vitest)

Those belong in other layers (`src/app`, `src/platform`, etc.) when you add them.
