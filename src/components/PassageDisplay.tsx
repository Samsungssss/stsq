import React from 'react';
import { Passage, UserAnswer } from '../types/question';
import { indexToLetter } from '../utils/answerValidation';
import { TextReveal } from './TextReveal';

interface PassageDisplayProps {
  passage: Passage;
  userAnswer?: UserAnswer;
  selectedSentenceIndex: number | null;
  onSelectSentence: (index: number) => void;
  fontSize: 16 | 18 | 19 | 21 | 23 | 25;
  isSubmitted: boolean;
}

export const PassageDisplay: React.FC<PassageDisplayProps> = ({
  passage,
  userAnswer,
  selectedSentenceIndex,
  onSelectSentence,
  fontSize,
  isSubmitted,
}) => (
  <div className="font-reading text-black">
    <div
      className="grid gap-y-5 leading-[1.7] tracking-[-0.01em] selection:bg-black selection:text-white"
      style={{ fontSize: `${fontSize}px` }}
      aria-label="Academic passage text"
    >
      {passage.sentences.map((sentence, index) => {
        const letter = indexToLetter(index);
        const isSelected = selectedSentenceIndex === index;
        const isCorrect = index === passage.correctAnswerIndex;
        const isUserPick = userAnswer?.selectedSentenceIndex === index;
        const treatment = isSubmitted
          ? isCorrect
            ? 'bg-emerald-50 ring-1 ring-emerald-700/30'
            : isUserPick
              ? 'bg-rose-50 ring-1 ring-rose-700/30'
              : ''
          : isSelected
            ? 'bg-black text-white'
            : 'hover:bg-black/[0.04]';

        return (
          <div key={`${passage.id}-${index}`} className="grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-3">
            <span className="pt-[0.22em] font-mono text-[0.68em] font-bold tracking-wider text-black">{letter}</span>
            <button
              type="button"
              tabIndex={isSubmitted ? -1 : 0}
              disabled={isSubmitted}
              aria-pressed={isSelected}
              aria-label={`Sentence ${letter}: ${sentence}`}
              className={`min-w-0 rounded-sm px-2 py-1 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${treatment} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
              onClick={() => onSelectSentence(index)}
            >
              <TextReveal
                as="span"
                split="words"
                effect="rise"
                duration={0.28}
                stagger={0.012}
                key={`${passage.id}-reveal-${index}`}
                className="inline"
              >
                {sentence}
              </TextReveal>
            </button>
          </div>
        );
      })}
    </div>
  </div>
);
