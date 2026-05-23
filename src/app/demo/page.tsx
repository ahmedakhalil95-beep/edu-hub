import {
  createQuestionByType,
  getExpectedNumericAnswer,
  type ProceduralQuestionType,
} from "@/engine/generation";
import { getLearningOutcomeForQuestionType } from "@/domains/syllabus/pm-syllabus";
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

export default function DemoPage() {
  const selectedQuestionType = pickRandomQuestionType();
  const question = createQuestionByType(selectedQuestionType);
  const expectedAnswer = getExpectedNumericAnswer(question);
  const learningOutcome = getLearningOutcomeForQuestionType(
    selectedQuestionType,
  );

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

        {learningOutcome && (
          <section>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Learning outcome
            </h2>
            <div className="space-y-2 rounded-lg bg-blue-50 p-4 text-blue-950">
              <p>
                <span className="font-semibold">Question Type:</span>{" "}
                {question.questionType}
              </p>
              <p>
                <span className="font-semibold">LO_ID:</span>{" "}
                <span className="font-mono text-sm">{learningOutcome.loId}</span>
              </p>
              <p>
                <span className="font-semibold">Learning Outcome:</span>{" "}
                {learningOutcome.title}
              </p>
              <p className="mt-1 text-sm">{learningOutcome.description}</p>
            </div>
          </section>
        )}

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
