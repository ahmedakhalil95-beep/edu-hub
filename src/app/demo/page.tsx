import {
  createQuestionByType,
  type ProceduralQuestionType,
} from "@/engine/generation";
import type { Question } from "@/shared/schemas/question.schema";
import { DemoAnswerForm } from "./demo-answer-form";

export const dynamic = "force-dynamic";

const questionTypes: ProceduralQuestionType[] = [
  "gross-profit",
  "current-ratio",
  "quick-ratio",
];

function pickRandomQuestionType(): ProceduralQuestionType {
  const randomIndex = Math.floor(Math.random() * questionTypes.length);

  return questionTypes[randomIndex];
}

function getExpectedNumericAnswer(question: Question) {
  if (question.questionType === "gross-profit") {
    return question.inputs.revenue - question.inputs.costOfSales;
  }

  if (question.questionType === "current-ratio") {
    return question.inputs.currentAssets / question.inputs.currentLiabilities;
  }

  if (question.questionType === "quick-ratio") {
    return (
      (question.inputs.currentAssets - question.inputs.inventory) /
      question.inputs.currentLiabilities
    );
  }

  throw new Error(`Unsupported question type: ${question.questionType}`);
}

export default function DemoPage() {
  const selectedQuestionType = pickRandomQuestionType();
  const question = createQuestionByType(selectedQuestionType);
  const expectedAnswer = getExpectedNumericAnswer(question);

  return (
    <main className="mx-auto max-w-2xl p-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Engine demo</h1>
          <p className="text-gray-600">
            Procedural {question.questionType} question
          </p>
        </div>
        <a
          href="/demo"
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
        >
          New question
        </a>
      </div>

      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Title
          </h2>
          <p className="text-xl font-semibold text-gray-900">{question.title}</p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Body
          </h2>
          <p className="text-gray-800">{question.body}</p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Generation seed
          </h2>
          <p className="font-mono text-sm text-gray-800">{question.generationSeed}</p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Hash
          </h2>
          <p className="break-all font-mono text-sm text-gray-800">{question.hash}</p>
        </section>

        <DemoAnswerForm
          expectedAnswer={expectedAnswer}
          generationSeed={question.generationSeed}
          hash={question.hash}
          questionType={question.questionType}
        />
      </div>
    </main>
  );
}
