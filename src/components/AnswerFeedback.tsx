import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Passage, UserAnswer } from '../types/question';
import { indexToLetter } from '../utils/answerValidation';
import { FluidButton } from './FluidButton';

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
    <div
      className={`rounded-2xl border p-6 sm:p-8 transition-all shadow-sm ${
        isCorrect
          ? 'bg-emerald-50/80 border-emerald-300/80 text-emerald-950'
          : 'bg-white/92 backdrop-blur-md border-neutral-300/90 text-neutral-900'
      }`}
    >
      {/* Status Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-neutral-200/70">
        <div className="flex items-center gap-2.5 flex-wrap">
          {isCorrect ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-mono text-xs font-bold tracking-wider uppercase shadow-xs whitespace-nowrap shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" /> &lt; CORRECT &gt;
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white font-mono text-xs font-bold tracking-wider uppercase shadow-xs whitespace-nowrap shrink-0">
              <XCircle className="w-3.5 h-3.5 stroke-[2.5]" /> &lt; INCORRECT &gt;
            </span>
          )}

          <div className="text-xs sm:text-sm font-semibold text-neutral-800">
            {isCorrect ? (
              <span>
                Correct Answer:{' '}
                <strong className="font-mono text-emerald-800 text-sm sm:text-base font-bold">
                  Option [{correctLetter}]
                </strong>
              </span>
            ) : (
              <span>
                Correct Answer:{' '}
                <strong className="font-mono text-emerald-700 text-sm sm:text-base font-bold">
                  Option [{correctLetter}]
                </strong>{' '}
                (Your Choice:{' '}
                <strong className="font-mono text-rose-700 text-sm sm:text-base font-bold">
                  [{selectedLetter}]
                </strong>
                )
              </span>
            )}
          </div>
        </div>

        {/* Action Controls using FluidButton */}
        <div className="flex items-center gap-2">
          {!isCorrect && (
            <FluidButton
              variant="outline"
              size="sm"
              onClick={onRetry}
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              iconPosition="left"
            >
              Try Again
            </FluidButton>
          )}

          <FluidButton
            variant="primary"
            size="sm"
            onClick={onContinue}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            {isLastQuestion ? 'Finish Practice' : 'Continue'}
          </FluidButton>
        </div>
      </div>

      {/* Breakdown Details */}
      <div className="mt-6 space-y-4 text-sm leading-relaxed">
        {/* Correct sentence quote */}
        <div>
          <span className="text-xs font-bold tracking-wider uppercase font-mono text-neutral-500 block mb-1.5">
            Target Sentence [{correctLetter}]
          </span>
          <div className="p-4 rounded-xl bg-white border border-neutral-200/90 text-neutral-900 font-academic italic text-[16px] border-l-4 border-l-emerald-600 shadow-2xs">
            &ldquo;[{correctLetter}] {passage.correctSentence}&rdquo;
          </div>
        </div>

        {/* Why this is correct */}
        <div>
          <span className="text-xs font-bold tracking-wider uppercase font-mono text-neutral-700 block mb-1">
            Why is this correct?
          </span>
          <p className="text-neutral-700 text-[14px] leading-relaxed">
            {passage.explanation}
          </p>
        </div>

        {/* If incorrect: Distractor explanation */}
        {!isCorrect && selectedIndex !== null && (
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 text-rose-950">
            <span className="text-xs font-bold tracking-wider uppercase font-mono text-rose-800 block mb-1">
              Why option [{selectedLetter}] was not correct:
            </span>
            <div className="font-academic italic text-[14px] text-rose-900/90 mb-1.5">
              &ldquo;[{selectedLetter}] {passage.sentences[selectedIndex]}&rdquo;
            </div>
            <p className="text-xs text-rose-900 leading-normal">
              {distractorNote ||
                'This sentence provides contextual information or a related detail, but does not directly answer the specific question asked in the prompt.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
