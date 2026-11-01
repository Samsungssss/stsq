export interface Passage {
  id: number;
  subject: string;
  topicCategory: string;
  title: string;
  sentences: string[];
  question: string;
  correctAnswerIndex: number;
  correctSentence: string;
  explanation: string;
  distractorExplanations: Record<number, string>;
}

export interface UserAnswer {
  passageId: number;
  selectedSentenceIndex: number | null;
  isSubmitted: boolean;
  isCorrect: boolean | null;
  timeSpentSeconds: number;
  attemptsCount: number;
}

export interface PracticeSession {
  version: number;
  currentPassageIndex: number; // 0 to 19
  passageOrder: number[]; // Array of passage IDs
  answers: Record<number, UserAnswer>; // keyed by passageId
  isCompleted: boolean;
  isRandomOrder: boolean;
  startedAt: number;
  totalTimeSeconds: number;
  fontSize: 16 | 18 | 19 | 21 | 23 | 25;
  timerEnabled: boolean;
}

export interface SessionStats {
  totalQuestions: number;
  completedQuestions: number;
  correctCount: number;
  incorrectCount: number;
  accuracyPercentage: number;
  totalTimeSeconds: number;
  averageTimePerQuestion: number;
}
