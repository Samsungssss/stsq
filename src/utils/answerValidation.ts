import { Passage, UserAnswer, SessionStats } from '../types/question';

export const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'] as const;
export type OptionLetter = (typeof OPTION_LETTERS)[number];

export function indexToLetter(index: number | null | undefined): string {
  if (index === null || index === undefined || index < 0 || index >= OPTION_LETTERS.length) {
    return '';
  }
  return OPTION_LETTERS[index];
}

export function letterToIndex(letter: string): number {
  return OPTION_LETTERS.indexOf(letter.toUpperCase() as OptionLetter);
}

/**
 * Deterministic local grading of a selected sentence/letter against the predefined answer index.
 */
export function validateAnswer(passage: Passage, selectedIndex: number | null): boolean {
  if (selectedIndex === null || selectedIndex === undefined) {
    return false;
  }
  return selectedIndex === passage.correctAnswerIndex;
}

/**
 * Calculates aggregated performance statistics from user answers.
 */
export function calculateSessionStats(
  passages: Passage[],
  answers: Record<number, UserAnswer>,
  totalTimeSeconds: number = 0
): SessionStats {
  const totalQuestions = passages.length;
  let completedQuestions = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let cumulativeTime = 0;

  for (const passage of passages) {
    const ans = answers[passage.id];
    if (ans && ans.isSubmitted) {
      completedQuestions += 1;
      if (ans.isCorrect) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
      cumulativeTime += ans.timeSpentSeconds || 0;
    }
  }

  const accuracyPercentage =
    completedQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const elapsed = totalTimeSeconds > 0 ? totalTimeSeconds : cumulativeTime;
  const averageTimePerQuestion =
    completedQuestions > 0 ? Math.round(elapsed / completedQuestions) : 0;

  return {
    totalQuestions,
    completedQuestions,
    correctCount,
    incorrectCount,
    accuracyPercentage,
    totalTimeSeconds: elapsed,
    averageTimePerQuestion,
  };
}

/**
 * Provides an estimated TOEFL iBT Reading benchmark based on accuracy.
 */
export function getReadingBandEstimate(correctCount: number, totalQuestions: number = 20) {
  const ratio = correctCount / totalQuestions;
  if (ratio >= 0.9) {
    return {
      band: "Advanced (High Proficiency)",
      toeflScoreRange: "26 – 30 / 30",
      description: "Exceptional mastery of academic sentence structure, syntactic nuances, and conceptual causality.",
      recommendation: "You are test-ready for top-tier university admissions and demanding academic reading sections."
    };
  } else if (ratio >= 0.75) {
    return {
      band: "High Intermediate",
      toeflScoreRange: "22 – 25 / 30",
      description: "Strong comprehension of major ideas and explicit mechanisms, with minor errors on distractor traps.",
      recommendation: "Focus on distinguishing causal mechanisms from background descriptive context."
    };
  } else if (ratio >= 0.55) {
    return {
      band: "Low Intermediate",
      toeflScoreRange: "17 – 21 / 30",
      description: "Moderate comprehension. Frequently picks related sentences that contain relevant keywords but miss the core prompt.",
      recommendation: "Carefully re-read the specific question prompt to ensure the sentence directly satisfies the requested inquiry."
    };
  } else {
    return {
      band: "Basic / Needs Improvement",
      toeflScoreRange: "Below 17 / 30",
      description: "Difficulty pinpointing exact sentence-level propositions within dense academic passages.",
      recommendation: "Practice active sentence deconstruction: identify subject, verb, and causal conjunctions."
    };
  }
}

/**
 * Deterministically shuffles an array of passage IDs.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
