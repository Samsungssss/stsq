import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Home,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Passage, PracticeSession } from '../types/question';
import {
  calculateSessionStats,
  getReadingBandEstimate,
  indexToLetter,
} from '../utils/answerValidation';
import { FluidButton } from './FluidButton';

interface ResultsDashboardProps {
  passages: Passage[];
  session: PracticeSession;
  onRestart: () => void;
  onReturnHome: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  passages,
  session,
  onRestart,
  onReturnHome,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [expandedPassageId, setExpandedPassageId] = useState<number | null>(null);

  const stats = calculateSessionStats(passages, session.answers, session.totalTimeSeconds);
  const bandInfo = getReadingBandEstimate(stats.correctCount, stats.totalQuestions);

  // Filter questions for the review list
  const reviewItems = session.passageOrder
    .map((id, index) => {
      const passage = passages.find((p) => p.id === id);
      const answer = session.answers[id];
      return {
        orderIndex: index,
        passage,
        answer,
      };
    })
    .filter((item) => {
      if (!item.passage) return false;
      if (filter === 'correct') return item.answer?.isCorrect === true;
      if (filter === 'incorrect') return item.answer?.isCorrect === false;
      return true;
    });

  const formatSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  // Circular gauge calculations
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (stats.accuracyPercentage / 100) * circumference;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="text-center space-y-2.5">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/90 text-neutral-800 text-xs font-mono font-bold tracking-wider uppercase border border-neutral-200/80 shadow-2xs">
          Examination Summary • 20 Academic Passages
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight">
          TOEFL Practice Results
        </h1>
        <p className="text-sm text-neutral-600 max-w-lg mx-auto">
          You have completed all 20 academic reading passages in the Select the Sentence module.
        </p>
      </div>

      {/* Main Scorecard */}
      <div className="bg-white/92 backdrop-blur-md rounded-2xl border border-neutral-200/90 shadow-xs p-6 sm:p-9">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Circular Score Gauge */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-neutral-100 pb-6 md:pb-0 md:pr-6">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="text-neutral-100"
                  strokeWidth="9"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="text-neutral-950 transition-all duration-1000 ease-out"
                  strokeWidth="9"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold font-mono text-neutral-950 tracking-tighter">
                  {stats.accuracyPercentage}%
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                  Accuracy
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 font-bold text-xs">
                <span>Estimated Band:</span>
                <span className="font-mono text-sm">{bandInfo.band}</span>
              </div>
              <p className="text-xs text-neutral-500 font-medium">Scaled Score: {bandInfo.toeflScoreRange}</p>
            </div>
          </div>

          {/* Metric Tiles */}
          <div className="md:col-span-7 grid grid-cols-2 gap-3.5">
            <div className="bg-neutral-50/80 rounded-xl p-4 border border-neutral-200/80">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Correct Answers</span>
              </div>
              <div className="text-2xl font-bold text-neutral-950 font-mono">
                {stats.correctCount}
              </div>
              <div className="text-xs text-neutral-500 mt-0.5 font-mono">
                of {passages.length} questions
              </div>
            </div>

            <div className="bg-neutral-50/80 rounded-xl p-4 border border-neutral-200/80">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold mb-1">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Incorrect Answers</span>
              </div>
              <div className="text-2xl font-bold text-neutral-950 font-mono">
                {stats.incorrectCount}
              </div>
              <div className="text-xs text-neutral-500 mt-0.5 font-mono">
                reviewed below
              </div>
            </div>

            <div className="bg-neutral-50/80 rounded-xl p-4 border border-neutral-200/80">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold mb-1">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>Total Time</span>
              </div>
              <div className="text-2xl font-bold text-neutral-950 font-mono">
                {formatSeconds(stats.totalTimeSeconds)}
              </div>
              <div className="text-xs text-neutral-500 mt-0.5 font-mono">
                active practice
              </div>
            </div>

            <div className="bg-neutral-50/80 rounded-xl p-4 border border-neutral-200/80">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold mb-1">
                <Award className="w-3.5 h-3.5 text-neutral-500" />
                <span>Pacing Average</span>
              </div>
              <div className="text-2xl font-bold text-neutral-950 font-mono">
                {stats.averageTimePerQuestion}s
              </div>
              <div className="text-xs text-neutral-500 mt-0.5 font-mono">
                per passage
              </div>
            </div>
          </div>
        </div>

        {/* Pedagogical Strategy Advice Note */}
        <div className="mt-6 pt-6 border-t border-neutral-100 bg-neutral-50/60 rounded-xl p-4 sm:p-5 border border-neutral-200/60">
          <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-800 uppercase mb-1">
            Performance Assessment & Strategy Note
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {bandInfo.description} {bandInfo.recommendation}
          </p>
        </div>

        {/* Primary Action Buttons using FluidButton */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <FluidButton
            variant="primary"
            size="md"
            onClick={onRestart}
            icon={<RotateCcw className="w-4 h-4" />}
            iconPosition="left"
          >
            Practice Again
          </FluidButton>

          <FluidButton
            variant="outline"
            size="md"
            onClick={onReturnHome}
            icon={<Home className="w-4 h-4" />}
            iconPosition="left"
          >
            Return to Home
          </FluidButton>
        </div>
      </div>

      {/* Question Review Section */}
      <section className="space-y-4" aria-label="Question Review">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-neutral-200/80">
          <div>
            <h3 className="text-lg font-bold text-neutral-950">
              Detailed Question Review
            </h3>
            <p className="text-xs text-neutral-500">
              Inspect your sentence selections, the target sentences, and academic rationales.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-white/90 p-1 rounded-full border border-neutral-200 text-xs font-medium shadow-2xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-neutral-950 text-white font-bold shadow-2xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              All ({passages.length})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                filter === 'correct'
                  ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                  : 'text-neutral-600 hover:text-emerald-700'
              }`}
            >
              Correct ({stats.correctCount})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                filter === 'incorrect'
                  ? 'bg-rose-600 text-white font-bold shadow-2xs'
                  : 'text-neutral-600 hover:text-rose-700'
              }`}
            >
              Incorrect ({stats.incorrectCount})
            </button>
          </div>
        </div>

        {/* List of Questions */}
        <div className="space-y-3">
          {reviewItems.map(({ orderIndex, passage, answer }) => {
            if (!passage) return null;
            const isExpanded = expandedPassageId === passage.id;
            const isCorrect = answer?.isCorrect;
            const selectedIdx = answer?.selectedSentenceIndex;
            const targetLetter = indexToLetter(passage.correctAnswerIndex);
            const userLetter =
              selectedIdx !== null && selectedIdx !== undefined ? indexToLetter(selectedIdx) : null;

            return (
              <div
                key={passage.id}
                className="bg-white/92 backdrop-blur-md rounded-2xl border border-neutral-200/90 shadow-xs overflow-hidden transition-all"
              >
                {/* Header Row */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedPassageId(isExpanded ? null : passage.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedPassageId(isExpanded ? null : passage.id);
                    }
                  }}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-neutral-50/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2 font-mono">
                      <span className="text-xs font-bold text-neutral-500">
                        Q{orderIndex + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium uppercase bg-neutral-100 text-neutral-700">
                        {passage.subject}
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct [Option {targetLetter}]
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 text-xs font-bold">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect (Picked [{userLetter}] • Correct was [{targetLetter}])
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-neutral-900">
                      {passage.question}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedPassageId(isExpanded ? null : passage.id);
                    }}
                    className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 cursor-pointer"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Collapsible Details */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-neutral-100 space-y-4 text-xs sm:text-sm bg-neutral-50/40 animate-in fade-in duration-200">
                    {/* Full Passage with Highlights */}
                    <div className="p-4 rounded-xl bg-white border border-neutral-200">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                        Passage Context (Sentences [A]–[E])
                      </span>
                      <p className="font-academic text-neutral-800 leading-relaxed text-[16px]">
                        {passage.sentences.map((s, sIdx) => {
                          const sLetter = indexToLetter(sIdx);
                          const isTarget = sIdx === passage.correctAnswerIndex;
                          const isUserPick = selectedIdx === sIdx;

                          let highlight = '';
                          if (isTarget) {
                            highlight =
                              'bg-emerald-50 text-emerald-950 font-medium px-2 py-0.5 rounded ring-1 ring-emerald-400';
                          } else if (isUserPick) {
                            highlight =
                              'bg-rose-50 text-rose-950 line-through decoration-rose-500/60 px-2 py-0.5 rounded ring-1 ring-rose-300';
                          }

                          return (
                            <span key={sIdx} className={highlight}>
                              <strong className="font-mono text-xs opacity-75">[{sLetter}]</strong> {s}{' '}
                            </span>
                          );
                        })}
                      </p>
                    </div>

                    {/* Target Sentence comparison */}
                    <div className="space-y-2">
                      <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">
                          Target Sentence: Option [{targetLetter}]
                        </span>
                        <div className="font-academic italic text-[15px]">
                          &ldquo;[{targetLetter}] {passage.correctSentence}&rdquo;
                        </div>
                      </div>

                      {!isCorrect && selectedIdx !== null && selectedIdx !== undefined && (
                        <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-950">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-800 block mb-0.5">
                            Your Selection: Option [{userLetter}]
                          </span>
                          <div className="font-academic italic text-[15px]">
                            &ldquo;[{userLetter}] {passage.sentences[selectedIdx]}&rdquo;
                          </div>
                          {passage.distractorExplanations[selectedIdx] && (
                            <p className="mt-1 text-xs text-rose-900">
                              {passage.distractorExplanations[selectedIdx]}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Academic Explanation */}
                    <div className="p-4 rounded-xl bg-white border border-neutral-200">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                        Academic Explanation
                      </span>
                      <p className="text-neutral-700 leading-relaxed text-xs sm:text-sm">
                        {passage.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
