import React from 'react';
import { Check, X } from 'lucide-react';
import { OPTION_LETTERS, indexToLetter } from '../utils/answerValidation';

interface LetterOptionGroupProps {
  selectedSentenceIndex: number | null;
  correctAnswerIndex: number;
  onSelectOption: (index: number) => void;
  isSubmitted: boolean;
  wasCorrect?: boolean | null;
}

export const LetterOptionGroup: React.FC<LetterOptionGroupProps> = ({
  selectedSentenceIndex,
  correctAnswerIndex,
  onSelectOption,
  isSubmitted,
}) => {
  return (
    <div className="space-y-2 py-2">
      <div className="flex items-center justify-between text-[11px] font-mono font-extrabold tracking-wider uppercase text-black">
        <span>Answer Options (Select One Letter)</span>
        {selectedSentenceIndex !== null && !isSubmitted && (
          <span className="text-black">
            Selection: [{indexToLetter(selectedSentenceIndex)}]
          </span>
        )}
      </div>

      {/* Row of ONLY 5 Letter Buttons */}
      <div
        className="grid grid-cols-5 gap-2 sm:gap-3 max-w-md mx-auto"
        role="radiogroup"
        aria-label="Select sentence letter options A through E"
      >
        {OPTION_LETTERS.map((letter, index) => {
          const isSelected = selectedSentenceIndex === index;
          const isCorrect = index === correctAnswerIndex;

          let buttonClasses =
            'border-neutral-300 bg-white text-black hover:border-black hover:bg-neutral-100 active:scale-95';
          let indicator: React.ReactNode = null;

          if (isSubmitted) {
            if (isCorrect) {
              buttonClasses =
                'bg-emerald-700 text-white border-emerald-700 font-extrabold shadow-xs';
              indicator = (
                <span className="text-[8px] font-mono tracking-widest uppercase flex items-center justify-center gap-0.5 mt-0.5 font-extrabold">
                  <Check className="w-2.5 h-2.5 stroke-[3]" /> CORRECT
                </span>
              );
            } else if (isSelected && !isCorrect) {
              buttonClasses =
                'bg-rose-700 text-white border-rose-700 font-extrabold shadow-xs';
              indicator = (
                <span className="text-[8px] font-mono tracking-widest uppercase flex items-center justify-center gap-0.5 mt-0.5 font-extrabold">
                  <X className="w-2.5 h-2.5 stroke-[3]" /> YOUR PICK
                </span>
              );
            } else {
              buttonClasses =
                'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed opacity-40';
            }
          } else {
            if (isSelected) {
              buttonClasses =
                'bg-black text-white border-black ring-2 ring-black font-extrabold shadow-xs';
              indicator = (
                <span className="text-[7.5px] font-mono tracking-widest uppercase mt-0.5 opacity-90 font-extrabold">
                  SELECTED
                </span>
              );
            }
          }

          return (
            <button
              key={letter}
              type="button"
              role="radio"
              aria-label={`Option ${letter}`}
              data-testid={`option-${letter}`}
              aria-checked={isSelected}
              disabled={isSubmitted}
              onClick={() => onSelectOption(index)}
              className={`h-10 sm:h-11 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${buttonClasses}`}
            >
              <span className="text-sm sm:text-base font-mono font-extrabold tracking-tight">
                {letter}
              </span>
              {indicator}
            </button>
          );
        })}
      </div>
    </div>
  );
};
