import { supabase } from "@/lib/supabase";

export type StudentAttemptInput = {
  questionType: string;
  generationSeed: string;
  hash: string;
  studentAnswer: number | null;
  expectedAnswer: number;
  isCorrect: boolean;
  difference: number;
  submittedAt: string;
};

export async function saveStudentAttempt(attempt: StudentAttemptInput) {
  if (attempt.studentAnswer === null) {
    return;
  }

  const { error } = await supabase.from("student_attempts").insert({
    question_type: attempt.questionType,
    generation_seed: attempt.generationSeed,
    question_hash: attempt.hash,
    student_answer: attempt.studentAnswer,
    expected_answer: attempt.expectedAnswer,
    is_correct: attempt.isCorrect,
    difference: attempt.difference,
    submitted_at: attempt.submittedAt,
  });

  if (error) {
    throw error;
  }
}
