import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Passage, UserAnswer } from '../types/question';
import { indexToLetter } from '../utils/answerValidation';
import { MainCTA } from './MainCTA';

interface AnswerFeedbackProps {
  passage: Passage;
  userAnswer: UserAnswer;
  onContinue: () => void;
  onRetry: () => void;
  isLastQuestion: boolean;
}

export const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({
  passage,
  userAnswer,
  onContinue,
  onRetry,
  isLastQuestion,
}) => {
  const isCorrect = userAnswer.isCorrect;
  const selectedIndex = userAnswer.selectedSentenceIndex;
  const selectedLetter = indexToLetter(selectedIndex);
  const correctLetter = indexToLetter(passage.correctAnswerIndex);

  const distractorNote =
    selectedIndex !== null && selectedIndex !== undefined
      ? passage.distractorExplanations[selectedIndex]
      : null;

  return (
    <div className="py-4 px-4 sm:px-5 bg-neutral-50 border border-neutral-300 rounded-xl space-y-3 font-sans text-black">
      {/* Status Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-neutral-300">
        <div className="flex items-center gap-2 flex-wrap">
          {isCorrect ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white font-mono text-[10px] font-extrabold tracking-wider uppercase shadow-2xs whitespace-nowrap shrink-0">
              <CheckCircle2 className="w-3 h-3 stroke-[2.5]" /> CORRECT
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-700 text-white font-mono text-[10px] font-extrabold tracking-wider uppercase shadow-2xs whitespace-nowrap shrink-0">
              <XCircle className="w-3 h-3 stroke-[2.5]" /> INCORRECT
            </span>
          )}

          <div className="text-xs font-extrabold text-black">
            {isCorrect ? (
              <span>
                Correct Answer:{' '}
                <strong className="font-mono text-emerald-800 font-extrabold">
                  Option [{correctLetter}]
                </strong>
              </span>
            ) : (
              <span>
                Correct Answer:{' '}
                <strong className="font-mono text-emerald-800 font-extrabold">
                  Option [{correctLetter}]
                </strong>{' '}
                (Your Choice:{' '}
                <strong className="font-mono text-rose-800 font-extrabold">
                  [{selectedLetter}]
                </strong>
                )
              </span>
            )}
          </div>
        </div>

        {/* Action Controls using MainCTA */}
        <div className="flex items-center gap-1.5">
          {!isCorrect && (
            <MainCTA
              variant="outline"
              size="sm"
              onClick={onRetry}
              icon={<RotateCcw className="w-3 h-3" />}
              iconPosition="left"
            >
              Try Again
            </MainCTA>
          )}

          <MainCTA
            variant="primary"
            size="sm"
            onClick={onContinue}
            icon={<ArrowRight className="w-3 h-3" />}
            iconPosition="right"
          >
            {isLastQuestion ? 'Finish Practice' : 'Continue'}
          </MainCTA>
        </div>
      </div>

      {/* Breakdown Details */}
      <div className="space-y-2 text-xs leading-relaxed text-neutral-800">
        <div>
          <span className="text-[10px] font-extrabold tracking-wider uppercase font-mono text-neutral-600 block mb-0.5">
            Target Sentence [{correctLetter}]
          </span>
          <div className="pl-3 py-1.5 font-serif italic text-emerald-900 border-l-2 border-emerald-600 text-xs font-medium bg-emerald-50 rounded-r-md">
            &ldquo;[{correctLetter}] {passage.correctSentence}&rdquo;
          </div>
        </div>

        <div>
          <span className="text-[10px] font-extrabold tracking-wider uppercase font-mono text-neutral-600 block mb-0.5">
            Why is this correct?
          </span>
          <p className="text-neutral-800 text-xs leading-relaxed font-medium">
            {passage.explanation}
          </p>
        </div>

        {!isCorrect && selectedIndex !== null && (
          <div className="pl-3 py-1.5 border-l-2 border-rose-600 bg-rose-50 rounded-r-md space-y-0.5 text-rose-900">
            <span className="text-[10px] font-extrabold tracking-wider uppercase font-mono text-rose-700 block">
              Why option [{selectedLetter}] was not correct:
            </span>
            <div className="font-serif italic text-[11px] font-medium text-rose-900">
              &ldquo;[{selectedLetter}] {passage.sentences[selectedIndex]}&rdquo;
            </div>
            <p className="text-[11px] text-rose-900/90 leading-normal font-medium">
              {distractorNote ||
                'This sentence provides contextual information or a related detail, but does not directly answer the specific question asked in the prompt.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
