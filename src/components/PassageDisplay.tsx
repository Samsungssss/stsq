import React from 'react';
import { Check, X } from 'lucide-react';
import { Passage, UserAnswer } from '../types/question';
import { indexToLetter } from '../utils/answerValidation';

interface PassageDisplayProps {
  passage: Passage;
  userAnswer?: UserAnswer;
  selectedSentenceIndex: number | null;
  onSelectSentence: (index: number) => void;
  fontSize: 'normal' | 'large';
  isSubmitted: boolean;
}

export const PassageDisplay: React.FC<PassageDisplayProps> = ({
  passage,
  userAnswer,
  selectedSentenceIndex,
  onSelectSentence,
  fontSize,
  isSubmitted,
}) => {
  const fontSizes = {
    normal: {
      passage: 'text-[14px] sm:text-[15.5px] leading-[1.8]',
    },
    large: {
      passage: 'text-[16px] sm:text-[17.5px] leading-[1.9]',
    },
  };

  return (
    <div className="space-y-3 text-black py-2">
      {/* Main Passage Prose */}
      <div
        className={`font-serif ${fontSizes[fontSize].passage} text-black text-left sm:text-justify leading-relaxed selection:bg-black selection:text-white`}
        tabIndex={0}
        aria-label="Academic passage text"
      >
        <p className="inline leading-relaxed">
          {passage.sentences.map((sentence, index) => {
            const letter = indexToLetter(index);
            const isSelected = selectedSentenceIndex === index;
            const isCorrectAnswer = index === passage.correctAnswerIndex;
            const wasUserPick = userAnswer?.selectedSentenceIndex === index;

            let containerClasses =
              'text-black hover:bg-neutral-100 cursor-pointer rounded-md px-1 py-0.5 transition-all inline';
            let labelClasses =
              'font-mono font-extrabold text-black bg-neutral-200 border border-neutral-300 mr-1.5 px-1 py-0.5 rounded text-[11px] inline-block tracking-wider';
            let statusBadge: React.ReactNode = null;

            if (isSubmitted) {
              if (isCorrectAnswer) {
                containerClasses =
                  'bg-emerald-50 text-emerald-900 font-bold border-b-2 border-emerald-600 rounded-md px-1 py-0.5 inline ring-1 ring-emerald-500/40';
                labelClasses =
                  'font-mono font-extrabold text-white bg-emerald-700 mr-1.5 px-1 py-0.5 rounded text-[11px] inline-block tracking-wider';
                statusBadge = (
                  <span className="inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.5 rounded bg-emerald-700 text-white font-sans text-[9px] font-extrabold tracking-wider uppercase align-baseline whitespace-nowrap">
                    <Check className="w-2.5 h-2.5 stroke-[3]" /> [{letter}] Correct
                  </span>
                );
              } else if (wasUserPick && !isCorrectAnswer) {
                containerClasses =
                  'bg-rose-50 text-rose-900 border-b-2 border-rose-600 rounded-md px-1 py-0.5 line-through decoration-rose-600/80 inline ring-1 ring-rose-500/40';
                labelClasses =
                  'font-mono font-extrabold text-white bg-rose-700 mr-1.5 px-1 py-0.5 rounded text-[11px] inline-block tracking-wider';
                statusBadge = (
                  <span className="inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.5 rounded bg-rose-700 text-white font-sans text-[9px] font-extrabold tracking-wider uppercase align-baseline whitespace-nowrap">
                    <X className="w-2.5 h-2.5 stroke-[3]" /> [{letter}] Your Pick
                  </span>
                );
              } else {
                containerClasses = 'text-neutral-500 px-1 py-0.5 inline opacity-50';
                labelClasses =
                  'font-mono font-bold text-neutral-500 mr-1.5 px-1 py-0.5 rounded bg-neutral-100 text-[11px] inline-block border border-neutral-200';
              }
            } else {
              if (isSelected) {
                containerClasses =
                  'bg-black text-white font-bold rounded-md px-1 py-0.5 inline ring-2 ring-black shadow-xs';
                labelClasses =
                  'font-mono font-extrabold text-black bg-white mr-1.5 px-1 py-0.5 rounded text-[11px] inline-block tracking-wider';
                statusBadge = (
                  <span className="inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.5 rounded bg-white text-black font-sans text-[9px] font-extrabold tracking-wider uppercase align-baseline whitespace-nowrap">
                    Selected [{letter}]
                  </span>
                );
              }
            }

            return (
              <React.Fragment key={index}>
                <span
                  role="button"
                  tabIndex={isSubmitted ? -1 : 0}
                  onClick={() => {
                    if (!isSubmitted) {
                      onSelectSentence(index);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (!isSubmitted && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      onSelectSentence(index);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-label={`Sentence [${letter}]: ${sentence}`}
                  className={`${containerClasses} focus:outline-none focus-visible:ring-2 focus-visible:ring-black`}
                >
                  <span className={labelClasses}>[{letter}]</span>
                  {sentence}
                  {statusBadge}
                </span>{' '}
              </React.Fragment>
            );
          })}
        </p>
      </div>

      {/* Helper Caption */}
      {!isSubmitted && (
        <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-600 font-mono font-medium">
          <span>Click any sentence above or choose letter A–E below.</span>
          {selectedSentenceIndex !== null && (
            <span className="font-extrabold text-black font-mono text-[11px]">
              Option [{indexToLetter(selectedSentenceIndex)}] Selected
            </span>
          )}
        </div>
      )}
    </div>
  );
};
