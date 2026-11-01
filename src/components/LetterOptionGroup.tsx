import React from 'react';
import { OPTION_LETTERS } from '../utils/answerValidation';

interface LetterOptionGroupProps {
  selectedSentenceIndex: number | null;
  correctAnswerIndex: number;
  onSelectOption: (index: number) => void;
  isSubmitted: boolean;
}

export const LetterOptionGroup: React.FC<LetterOptionGroupProps> = ({
  selectedSentenceIndex,
  onSelectOption,
  isSubmitted,
}) => (
  <fieldset className="mt-8" aria-label="Answer options">
    <legend className="sr-only">Select the sentence that answers the question</legend>
    <div className="flex justify-center gap-3" role="radiogroup" aria-label="Select sentence letter options A through E">
      {OPTION_LETTERS.map((letter, index) => {
        const selected = selectedSentenceIndex === index;
        return (
          <button
            key={letter}
            type="button"
            role="radio"
            aria-label={`Option ${letter}`}
            aria-checked={selected}
            data-testid={`option-${letter}`}
            disabled={isSubmitted}
            onClick={() => onSelectOption(index)}
            className={`grid size-12 place-items-center rounded-full border font-mono text-base font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
              selected ? 'border-black bg-black text-white' : 'border-black/30 bg-white text-black hover:border-black hover:bg-black/5'
            } ${isSubmitted ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  </fieldset>
);
