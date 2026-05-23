# Edu Hub

Edu Hub is a procedural accounting learning platform prototype. The goal is to help students practice accounting concepts with deterministic question engines, instant grading, and lightweight attempt tracking.

The project currently focuses on a clean foundation: accounting engines generate questions, the demo lets a student submit answers, and attempts can be saved to Supabase for later analysis.

## Product Vision

Edu Hub is designed to become a practical learning environment for accounting students.

Instead of relying only on fixed question banks, Edu Hub can generate repeatable accounting questions from small procedural engines. This makes it possible to create many variations of the same learning objective while still keeping each question traceable through a generation seed and hash.

Long term, the platform can support:

- Personalized accounting practice
- Attempt history and progress tracking
- Topic-level performance analytics
- Instructor dashboards
- More procedural engines across accounting syllabuses

## Tech Stack

- Next.js
- TypeScript
- React
- Supabase
- ESLint

## Current Features

- Deterministic accounting engines
- Procedural question generation
- Question type registry
- Gross profit engine
- Current ratio engine
- Quick ratio engine
- Interactive grading demo
- Local student attempt tracking
- Supabase student attempt persistence
- Layered architecture for engine, shared utilities, platform services, and UI

## Architecture Overview

Edu Hub keeps the accounting logic separate from the user interface.

The main layers are:

- `src/app`: Next.js application routes and demo UI
- `src/engine`: Accounting calculations, question generation, resolvers, grading, and validation
- `src/shared`: Shared schemas and utilities used across the project
- `src/platform`: Platform integrations such as telemetry and persistence helpers
- `src/lib`: Third-party client setup, including Supabase
- `supabase/sql`: SQL scripts for database setup

This structure keeps the core accounting engines testable and reusable. The UI can call into the engine layer without owning calculation rules, and persistence can live in platform helpers instead of being spread through components.

## Procedural Flow

The current demo follows this flow:

```text
questionType
  -> question type registry
  -> question creator
  -> question resolver
  -> calculation layer
  -> grading
  -> local attempt tracking
  -> Supabase attempt persistence
```

### Step By Step

1. A `questionType` is selected, such as `gross-profit`, `current-ratio`, or `quick-ratio`.
2. The question type registry maps that type to the correct creator function.
3. The creator builds a deterministic question with inputs, title, body, generation seed, and hash.
4. The resolver calculates the correct answer text for the generated question.
5. The calculation layer performs the actual accounting formula.
6. The demo grades the student's numeric answer.
7. The client stores the latest attempt in local React state.
8. A telemetry helper saves the attempt to Supabase.

## Accounting Engines

### Gross Profit

Calculates gross profit and gross profit margin from revenue and cost of sales.

### Current Ratio

Calculates:

```text
currentRatio = currentAssets / currentLiabilities
```

### Quick Ratio

Calculates:

```text
quickRatio = (currentAssets - inventory) / currentLiabilities
```

## Folder Structure

```text
edu-hub/
  src/
    app/
      demo/
        page.tsx
        demo-answer-form.tsx
    engine/
      calculation/
      generation/
      grading/
      validation/
    lib/
      supabase.ts
    platform/
      telemetry/
        save-student-attempt.ts
    shared/
      schemas/
      utils/
  supabase/
    sql/
      create-student-attempts.sql
```

## Running Locally

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
.env.local
```

Add the required Supabase values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The interactive demo is available at:

```text
http://localhost:3000/demo
```

## Database Setup

The student attempts table is defined in:

```text
supabase/sql/create-student-attempts.sql
```

Apply that SQL script in Supabase before testing attempt persistence.

The current development policy allows insert and select while authentication is not yet implemented. This should be tightened before production use.

## Quality Checks

Run linting:

```bash
npm.cmd run lint
```

Run TypeScript checks:

```bash
npx.cmd tsc --noEmit
```

## Roadmap

- Add authentication
- Associate attempts with authenticated students
- Add attempt history views
- Add topic and syllabus progress tracking
- Add more accounting engines
- Add automated tests for calculations, resolvers, and creators
- Add instructor-facing analytics
- Improve Supabase row-level security policies for production
- Expand the demo into a full practice workflow

## Project Status

Edu Hub is an early prototype. The current priority is building a clear, reliable architecture for procedural accounting questions before adding larger product features.
