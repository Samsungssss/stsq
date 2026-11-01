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
  wasCorrect,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E3DC] shadow-xs p-5 sm:p-7 space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
          Answer Options (Select One Letter)
        </span>
        {selectedSentenceIndex !== null && !isSubmitted && (
          <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            Active Selection: Option [{indexToLetter(selectedSentenceIndex)}]
          </span>
        )}
      </div>

      {/* Row of ONLY 5 Letter Buttons: A, B, C, D, E */}
      <div
        className="grid grid-cols-5 gap-2.5 sm:gap-4 max-w-lg mx-auto"
        role="radiogroup"
        aria-label="Select sentence letter options A through E"
      >
        {OPTION_LETTERS.map((letter, index) => {
          const isSelected = selectedSentenceIndex === index;
          const isCorrect = index === correctAnswerIndex;

          let buttonClasses =
            'border-[#E5E3DC] bg-white text-slate-900 hover:bg-[#FAF9F5] hover:border-slate-400 active:translate-y-[1px] shadow-2xs';
          let indicator: React.ReactNode = null;

          if (isSubmitted) {
            if (isCorrect) {
              buttonClasses =
                'bg-emerald-700 text-white border-emerald-700 ring-2 ring-emerald-400 shadow-md font-extrabold';
              indicator = (
                <span className="text-[10px] font-mono tracking-widest uppercase flex items-center justify-center gap-0.5 mt-0.5 font-bold">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> CORRECT
                </span>
              );
            } else if (isSelected && !isCorrect) {
              buttonClasses =
                'bg-rose-600 text-white border-rose-600 ring-2 ring-rose-400 shadow-md font-extrabold';
              indicator = (
                <span className="text-[10px] font-mono tracking-widest uppercase flex items-center justify-center gap-0.5 mt-0.5 font-bold">
                  <X className="w-3.5 h-3.5 stroke-[3]" /> YOUR PICK
                </span>
              );
            } else {
              buttonClasses =
                'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-40';
            }
          } else {
            if (isSelected) {
              buttonClasses =
                'bg-[#0F243E] text-white border-[#0F243E] ring-2 ring-slate-950 shadow-md font-bold scale-[1.02]';
              indicator = (
                <span className="text-[9px] font-mono tracking-widest uppercase mt-0.5 opacity-90 font-bold">
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
              className={`h-16 sm:h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${buttonClasses}`}
            >
              <span className="text-xl sm:text-2xl font-mono font-bold tracking-tight">
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
