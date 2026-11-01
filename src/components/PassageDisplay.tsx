import React from 'react';
import { Passage, UserAnswer } from '../types/question';
import { indexToLetter } from '../utils/answerValidation';

interface PassageDisplayProps {
  passage: Passage;
  userAnswer?: UserAnswer;
  selectedSentenceIndex: number | null;
  onSelectSentence: (index: number) => void;
  fontSize: 16 | 18 | 19 | 21 | 23 | 25;
  isSubmitted: boolean;
}

const contextualLead = (passage: Passage) =>
  `Researchers studying ${passage.title.toLowerCase()} examine both the forces that shape the subject and the evidence that makes those forces visible. The topic is best understood as a connected process: each development provides context for the next, while small changes can produce consequences across an entire system.`;

const contextualClose = (passage: Passage) =>
  `Together, these observations show why ${passage.title.toLowerCase()} remains an important area of academic study. Understanding the sequence of causes, mechanisms, and outcomes allows researchers to interpret individual evidence without losing sight of the larger pattern.`;

export const PassageDisplay: React.FC<PassageDisplayProps> = ({
  passage,
  userAnswer,
  selectedSentenceIndex,
  onSelectSentence,
  fontSize,
  isSubmitted,
}) => (
  <div className="font-reading text-black">
    <p
      className="leading-[1.75] tracking-[-0.01em] selection:bg-black selection:text-white"
      style={{ fontSize: `${fontSize}px` }}
      aria-label="Complete academic passage"
    >
      {contextualLead(passage)}{' '}
      {passage.sentences.map((sentence, index) => {
        const letter = indexToLetter(index);
        const isSelected = selectedSentenceIndex === index;
        const isCorrect = index === passage.correctAnswerIndex;
        const isUserPick = userAnswer?.selectedSentenceIndex === index;
        const treatment = isSubmitted
          ? isCorrect
            ? 'bg-emerald-100 ring-1 ring-emerald-700/40'
            : isUserPick
              ? 'bg-rose-100 ring-1 ring-rose-700/40'
              : ''
          : isSelected
            ? 'bg-black text-white'
            : 'hover:bg-black/[0.05]';
        const [firstWord, ...remainingWords] = sentence.split(' ');

        return (
          <React.Fragment key={`${passage.id}-${index}`}>
            <button
              type="button"
              tabIndex={isSubmitted ? -1 : 0}
              disabled={isSubmitted}
              aria-pressed={isSelected}
              aria-label={`Sentence ${letter}: ${sentence}`}
              className={`inline rounded-sm px-1 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${treatment} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
              onClick={() => onSelectSentence(index)}
            >
              <span className="whitespace-nowrap font-mono text-[0.68em] font-bold tracking-wider">[{letter}] {firstWord}</span>
              {remainingWords.length > 0 ? ` ${remainingWords.join(' ')}` : ''}
            </button>{' '}
          </React.Fragment>
        );
      })}
      {contextualClose(passage)}
    </p>
  </div>
);
