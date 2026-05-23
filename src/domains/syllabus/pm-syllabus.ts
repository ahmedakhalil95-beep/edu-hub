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
              "Quick ratio checks whether the business can pay short-term debts without relying on selling inventory.",
            formula:
              "Quick ratio = (Current assets - Inventory) / Current liabilities",
            examinerTrap:
              "Inventory is excluded, but other current assets such as receivables are still included.",
            detailedExplanation:
              "The quick ratio measures short-term liquidity using assets that are usually more readily available than inventory. The formula is current assets minus inventory, divided by current liabilities. Inventory is excluded because it may take time to sell, may need discounts, or may not turn into cash before debts are due. A high quick ratio may suggest stronger immediate liquidity, while a low quick ratio may suggest pressure to meet short-term obligations. Interpretation depends on the industry, inventory turnover, and the business's normal liquidity needs.",
            workedExample:
              "If current assets are 150,000, inventory is 50,000, and current liabilities are 80,000, the quick ratio is (150,000 - 50,000) / 80,000 = 1.25 times. This means the business has 1.25 of quick assets for every 1.00 of current liabilities.",
            commonMistakes: [
              "Forgetting to exclude inventory.",
              "Excluding all current assets by mistake.",
              "Assuming every low quick ratio is automatically bad.",
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
              "Gross profit margin shows how much of each sale is left after covering the direct cost of making or buying the goods sold.",
            formula:
              "Gross profit margin = Gross profit / Revenue × 100",
            examinerTrap:
              "Divide gross profit by revenue, not by cost of sales.",
            detailedExplanation:
              "Gross profit margin measures how efficiently a business turns sales into gross profit before overheads and other expenses. The formula is gross profit divided by revenue, multiplied by 100. A high margin may suggest strong pricing, good cost control, or a favorable sales mix. A low margin may suggest discounting, rising direct costs, or less profitable products. Interpretation depends on pricing strategy, cost control, sales mix, and the industry the business operates in.",
            workedExample:
              "If revenue is 200,000 and cost of sales is 120,000, gross profit is 80,000. Gross profit margin is 80,000 / 200,000 × 100 = 40%. This means 40% of sales revenue remains after direct costs.",
            commonMistakes: [
              "Using net profit instead of gross profit.",
              "Dividing by cost of sales instead of revenue.",
              "Ignoring sales mix or industry context.",
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
