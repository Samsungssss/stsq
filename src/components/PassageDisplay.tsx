import React from 'react';
import { Check, X, Bookmark } from 'lucide-react';
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
      passage: 'text-[17px] sm:text-[18.5px] leading-[2.0]',
      badge: 'text-xs',
    },
    large: {
      passage: 'text-[19px] sm:text-[21px] leading-[2.25]',
      badge: 'text-sm',
    },
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E3DC] shadow-xs p-6 sm:p-8 md:p-10 transition-all">
      {/* Passage Header / Academic Citation Style */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-100 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <Bookmark className="w-3.5 h-3.5 text-amber-700" />
          <span className="font-bold text-slate-900 tracking-wide uppercase">
            {passage.subject}
          </span>
          <span className="text-slate-300">/</span>
          <span>{passage.topicCategory}</span>
        </div>
        <div className="text-[11px] font-mono text-slate-500">
          Academic Reading Passage • 5 Labeled Sentences [A]–[E]
        </div>
      </div>

      {/* Main Passage with [A] to [E] Labeled Sentences */}
      <div
        className={`font-academic ${fontSizes[fontSize].passage} text-slate-900 text-left sm:text-justify space-y-3 selection:bg-slate-200`}
        tabIndex={0}
        aria-label="Academic passage text"
      >
        <p className="inline">
          {passage.sentences.map((sentence, index) => {
            const letter = indexToLetter(index);
            const isSelected = selectedSentenceIndex === index;
            const isCorrectAnswer = index === passage.correctAnswerIndex;
            const wasUserPick = userAnswer?.selectedSentenceIndex === index;

            let containerClasses =
              'text-slate-800 hover:bg-[#FAF9F5] hover:text-slate-950 cursor-pointer rounded-lg px-2 py-1 transition-all inline';
            let labelClasses =
              'font-mono font-bold text-slate-700 mr-2 px-1.5 py-0.5 rounded bg-slate-100 text-[13px] inline-block tracking-wider border border-slate-200';
            let statusBadge: React.ReactNode = null;

            if (isSubmitted) {
              if (isCorrectAnswer) {
                containerClasses =
                  'bg-emerald-100/80 text-emerald-950 font-medium border-b-2 border-emerald-700 rounded-sm px-1.5 py-0.5 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] inline';
                labelClasses =
                  'font-mono font-bold text-emerald-950 bg-emerald-200 mr-2 px-1.5 py-0.5 rounded text-[13px] inline-block tracking-wider border border-emerald-300';
                statusBadge = (
                  <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded bg-emerald-700 text-white font-sans text-[11px] font-bold tracking-wider uppercase align-baseline shadow-2xs whitespace-nowrap">
                    <Check className="w-3 h-3 stroke-[3]" /> [{letter}] Correct
                  </span>
                );
              } else if (wasUserPick && !isCorrectAnswer) {
                containerClasses =
                  'bg-rose-100/80 text-rose-950 border-b-2 border-rose-700 rounded-sm px-1.5 py-0.5 line-through decoration-rose-700/70 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] inline';
                labelClasses =
                  'font-mono font-bold text-rose-950 bg-rose-200 mr-2 px-1.5 py-0.5 rounded text-[13px] inline-block tracking-wider border border-rose-300';
                statusBadge = (
                  <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded bg-rose-700 text-white font-sans text-[11px] font-bold tracking-wider uppercase align-baseline shadow-2xs whitespace-nowrap">
                    <X className="w-3 h-3 stroke-[3]" /> [{letter}] Your Pick
                  </span>
                );
              } else {
                containerClasses = 'text-slate-400 px-1 py-0.5 inline';
                labelClasses =
                  'font-mono font-medium text-slate-400 mr-2 px-1.5 py-0.5 rounded bg-slate-50 text-[13px] inline-block border border-slate-100';
              }
            } else {
              if (isSelected) {
                containerClasses =
                  'bg-blue-100/70 text-slate-950 font-medium border-b-2 border-[#0F243E] rounded-sm px-1.5 py-0.5 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] inline';
                labelClasses =
                  'font-mono font-bold text-white bg-[#0F243E] mr-2 px-1.5 py-0.5 rounded text-[13px] inline-block tracking-wider';
                statusBadge = (
                  <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded bg-[#0F243E] text-white font-sans text-[10px] font-bold tracking-wider uppercase align-baseline shadow-2xs whitespace-nowrap">
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
                  className={`${containerClasses} focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900`}
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

      {/* Helper caption */}
      {!isSubmitted && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Click a sentence above or select its letter button below.</span>
          {selectedSentenceIndex !== null && (
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Sentence [{indexToLetter(selectedSentenceIndex)}] Selected
            </span>
          )}
        </div>
      )}
    </div>
  );
};
