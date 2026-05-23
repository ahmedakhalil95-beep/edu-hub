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
  detailedExplanation: string;
  workedExample: string;
  commonMistakes: string[];
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
            detailedExplanation:
              "The current ratio measures short-term liquidity. It compares current assets with current liabilities to show whether the business appears able to pay debts due soon. The formula is current assets divided by current liabilities. A high ratio may suggest a comfortable liquidity position, but it may also mean resources are tied up in slow-moving inventory or unused cash. A low ratio may suggest pressure to pay suppliers or other short-term debts, but it must be interpreted carefully. Good interpretation depends on the industry, the trend over time, and the working capital cycle of the business.",
            workedExample:
              "If current assets are 120,000 and current liabilities are 80,000, the current ratio is 120,000 / 80,000 = 1.5 times. This means the business has 1.50 of current assets for every 1.00 of current liabilities.",
            commonMistakes: [
              "Using non-current assets in the calculation.",
              "Ignoring industry context.",
              "Assuming higher is always better.",
            ],
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
            detailedExplanation:
              "Detailed quick ratio lesson content will be added here.",
            workedExample:
              "A worked quick ratio example will be added here.",
            commonMistakes: [
              "Common quick ratio mistakes will be added here.",
            ],
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
            detailedExplanation:
              "Detailed gross profit margin lesson content will be added here.",
            workedExample:
              "A worked gross profit margin example will be added here.",
            commonMistakes: [
              "Common gross profit margin mistakes will be added here.",
            ],
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
