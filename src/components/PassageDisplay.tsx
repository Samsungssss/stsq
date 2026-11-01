import React from 'react';
import { Passage, UserAnswer } from '../types/question';
import { indexToLetter } from '../utils/answerValidation';
import { TextReveal } from './TextReveal';

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
  const textClass = fontSize === 'large' ? 'text-[21px]' : 'text-[19px]';

  return (
    <div className="text-black">
      <div
        className={`font-reading ${textClass} leading-[1.7] tracking-[-0.01em] text-left selection:bg-black selection:text-white`}
        tabIndex={0}
        aria-label="Academic passage text"
      >
        {passage.sentences.map((sentence, index) => {
          const letter = indexToLetter(index);
          const isSelected = selectedSentenceIndex === index;
          const isCorrect = index === passage.correctAnswerIndex;
          const isUserPick = userAnswer?.selectedSentenceIndex === index;
          const feedbackClass = isSubmitted
            ? isCorrect
              ? 'border-b-2 border-emerald-700 bg-emerald-50'
              : isUserPick
                ? 'border-b-2 border-rose-700 bg-rose-50'
                : ''
            : isSelected
              ? 'bg-black text-white'
              : 'hover:bg-neutral-100';

          return (
            <span key={`${passage.id}-${index}`} className="mr-[0.28em] inline">
              <span className="mr-[0.45em] inline-block align-baseline font-mono text-[0.62em] font-bold tracking-wider text-black">
                {letter}
              </span>
              <span
                role="button"
                tabIndex={isSubmitted ? -1 : 0}
                aria-pressed={isSelected}
                aria-label={`Sentence ${letter}: ${sentence}`}
                className={`cursor-pointer rounded-sm px-[0.12em] py-[0.04em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${feedbackClass}`}
                onClick={() => !isSubmitted && onSelectSentence(index)}
                onKeyDown={(event) => {
                  if (!isSubmitted && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    onSelectSentence(index);
                  }
                }}
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
              </span>{' '}
            </span>
          );
        })}
      </div>
    </div>
  );
};
