import type { ProceduralQuestionType } from "@/engine/generation";

export type PMSyllabusLearningOutcome = {
  type: "learning-outcome";
  loId: string;
  title: string;
  description: string;
  questionTypes: ProceduralQuestionType[];
  plainEnglish: string;
  formula: string;
  examinerTrap: string;
};

export type PMSyllabusTopic = {
  type: "topic";
  title: string;
  description: string;
  learningOutcomes: PMSyllabusLearningOutcome[];
};

export type PMSyllabusArea = {
  type: "area";
  title: string;
  description: string;
  topics: PMSyllabusTopic[];
};

export type PMSyllabusNode =
  | PMSyllabusArea
  | PMSyllabusTopic
  | PMSyllabusLearningOutcome;

export const pmSyllabus: PMSyllabusArea[] = [
  {
    type: "area",
    title: "Performance Management",
    description:
      "A small starter map for ACCA PM performance analysis practice.",
    topics: [
      {
        type: "topic",
        title: "Financial ratios / performance analysis",
        description:
          "Learning outcomes for calculating and interpreting core performance ratios.",
        learningOutcomes: [
          {
            type: "learning-outcome",
            loId: "PM_RATIO_CURRENT",
            title: "Calculate and interpret the current ratio",
            description:
              "Use current assets and current liabilities to calculate and interpret short-term liquidity.",
            questionTypes: ["current-ratio"],
            plainEnglish:
              "Current ratio checks whether short-term assets are enough to cover short-term debts.",
            formula: "Current ratio = Current assets / Current liabilities",
            examinerTrap:
              "A higher ratio is not always better if too much cash or inventory is sitting unused.",
          },
          {
            type: "learning-outcome",
            loId: "PM_RATIO_QUICK",
            title: "Calculate and interpret the quick ratio",
            description:
              "Use current assets, inventory, and current liabilities to calculate and interpret quick liquidity.",
            questionTypes: ["quick-ratio"],
            plainEnglish:
              "Quick ratio focuses on assets that can usually be turned into cash quickly.",
            formula:
              "Quick ratio = (Current assets - Inventory) / Current liabilities",
            examinerTrap:
              "Do not include inventory when calculating the quick ratio.",
          },
          {
            type: "learning-outcome",
            loId: "PM_RATIO_GROSS_PROFIT",
            title: "Calculate and interpret gross profit margin",
            description:
              "Use revenue and cost of sales to calculate and interpret gross profit margin.",
            questionTypes: ["gross-profit"],
            plainEnglish:
              "Gross profit margin shows how much profit is left from sales after covering direct costs.",
            formula:
              "Gross profit margin = Gross profit / Revenue x 100",
            examinerTrap:
              "Use gross profit, not net profit, when calculating gross profit margin.",
          },
        ],
      },
    ],
  },
];

export function getAllLearningOutcomes(): PMSyllabusLearningOutcome[] {
  return pmSyllabus.flatMap((area) =>
    area.topics.flatMap((topic) => topic.learningOutcomes),
  );
}

export function getLearningOutcomeById(
  loId: string,
): PMSyllabusLearningOutcome | undefined {
  return getAllLearningOutcomes().find((outcome) => outcome.loId === loId);
}

export function getQuestionTypesForLearningOutcome(
  loId: string,
): ProceduralQuestionType[] {
  return getLearningOutcomeById(loId)?.questionTypes ?? [];
}

export function getLearningOutcomeForQuestionType(
  questionType: ProceduralQuestionType,
): PMSyllabusLearningOutcome | undefined {
  return getAllLearningOutcomes().find((outcome) =>
    outcome.questionTypes.includes(questionType),
  );
}
