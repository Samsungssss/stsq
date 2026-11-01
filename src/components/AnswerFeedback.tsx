import React from 'react';
import { Passage, UserAnswer } from '../types/question';
import { indexToLetter } from '../utils/answerValidation';

interface AnswerFeedbackProps {
  passage: Passage;
  userAnswer: UserAnswer;
}

export const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({ passage, userAnswer }) => {
  const selectedIndex = userAnswer.selectedSentenceIndex;
  const selectedLetter = indexToLetter(selectedIndex);
  const correctLetter = indexToLetter(passage.correctAnswerIndex);
  const distractorNote = selectedIndex !== null ? passage.distractorExplanations[selectedIndex] : null;

  return (
    <section className="border-t border-black/15 pt-4 text-sm leading-relaxed" role="status" aria-live="polite">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className={`font-mono text-xs font-bold uppercase tracking-wider ${userAnswer.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
          {userAnswer.isCorrect ? 'Correct' : 'Incorrect'}
        </span>
        <span className="font-mono text-xs">
          {userAnswer.isCorrect ? `Correct answer: ${correctLetter}` : `You chose ${selectedLetter}. Correct answer: ${correctLetter}.`}
        </span>
      </div>
      {!userAnswer.isCorrect && selectedIndex !== null && (
        <p className="mt-2 text-black/75"><strong>Your selection ({selectedLetter}):</strong> {passage.sentences[selectedIndex]}</p>
      )}
      {!userAnswer.isCorrect && distractorNote && <p className="mt-2 text-black/70">{distractorNote}</p>}
      <p className="mt-2 text-black/80"><strong>Why {correctLetter} is correct:</strong> {passage.explanation}</p>
      {!userAnswer.isCorrect && <p className="mt-2 text-black/80"><strong>Correct sentence:</strong> {passage.correctSentence}</p>}
    </section>
  );
};
