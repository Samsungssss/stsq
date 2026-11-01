import React from 'react';
import { Passage, UserAnswer } from '../types/question';
import { indexToLetter } from '../utils/answerValidation';

interface AnswerFeedbackProps {
  passage: Passage;
  userAnswer: UserAnswer;
  onContinue: () => void;
  onRetry: () => void;
  isLastQuestion: boolean;
}

export const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({ passage, userAnswer }) => {
  const selectedIndex = userAnswer.selectedSentenceIndex;
  const selectedLetter = indexToLetter(selectedIndex);
  const correctLetter = indexToLetter(passage.correctAnswerIndex);
  const distractorNote = selectedIndex !== null ? passage.distractorExplanations[selectedIndex] : null;

  return (
    <div className="border-t border-black/15 pt-3 text-sm leading-relaxed" role="status" aria-live="polite">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={`font-mono text-xs font-bold uppercase tracking-wider ${userAnswer.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
          {userAnswer.isCorrect ? 'Correct' : 'Incorrect'}
        </span>
        {!userAnswer.isCorrect && <span className="font-mono text-xs">Correct answer: {correctLetter} (you chose {selectedLetter})</span>}
        <span className="text-black/75">{passage.explanation}</span>
      </div>
      {!userAnswer.isCorrect && distractorNote && <p className="mt-1 text-xs text-black/60">{distractorNote}</p>}
    </div>
  );
};
