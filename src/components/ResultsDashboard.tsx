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
import { MainCTA } from './MainCTA';
import { TextReveal } from './TextReveal';

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

  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 bg-white text-black min-h-screen">
      {/* Top Header */}
      <div className="text-center space-y-1.5">
        <span className="inline-block px-3 py-0.5 rounded-full border border-neutral-300 bg-neutral-100 text-black text-[11px] font-mono font-extrabold tracking-wider uppercase shadow-2xs">
          Examination Summary • 20 Academic Passages
        </span>
        <TextReveal
          as="h1"
          split="words"
          effect="rise"
          className="text-xl sm:text-2xl md:text-3xl font-extrabold text-black tracking-tight"
        >
          TOEFL Practice Results
        </TextReveal>
        <p className="text-xs text-neutral-600 font-medium max-w-md mx-auto">
          You have completed all 20 academic reading passages in the Select the Sentence module.
        </p>
      </div>

      {/* Main Score & Metrics Container */}
      <div className="border border-neutral-300 rounded-xl p-4 sm:p-5 shadow-2xs space-y-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Circular Score Gauge */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-neutral-200 pb-4 md:pb-0 md:pr-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r={radius - 6}
                  className="text-neutral-200"
                  strokeWidth="7"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={radius - 6}
                  className="text-black transition-all duration-1000 ease-out"
                  strokeWidth="7"
                  strokeDasharray={2 * Math.PI * (radius - 6)}
                  strokeDashoffset={2 * Math.PI * (radius - 6) - (stats.accuracyPercentage / 100) * 2 * Math.PI * (radius - 6)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold font-mono text-black tracking-tighter">
                  {stats.accuracyPercentage}%
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-600 font-extrabold">
                  Accuracy
                </span>
              </div>
            </div>

            <div className="mt-2 space-y-0.5">
              <div className="inline-flex items-center gap-1.5 font-extrabold text-xs text-black">
                <span>Estimated Band:</span>
                <span className="font-mono text-xs text-emerald-700">{bandInfo.band}</span>
              </div>
              <p className="text-[10px] text-neutral-600 font-bold">Scaled Score: {bandInfo.toeflScoreRange}</p>
            </div>
          </div>

          {/* Metric Tiles */}
          <div className="md:col-span-7 grid grid-cols-2 gap-3">
            <div className="border-l-2 border-emerald-600 pl-2.5 py-1 rounded-r-lg p-2.5 border border-neutral-200 bg-neutral-50">
              <div className="flex items-center gap-1 text-[11px] text-neutral-700 font-extrabold mb-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Correct</span>
              </div>
              <div className="text-xl font-extrabold text-black font-mono">
                {stats.correctCount}
              </div>
              <div className="text-[10px] text-neutral-500 font-mono font-medium">
                of {passages.length} questions
              </div>
            </div>

            <div className="border-l-2 border-rose-600 pl-2.5 py-1 rounded-r-lg p-2.5 border border-neutral-200 bg-neutral-50">
              <div className="flex items-center gap-1 text-[11px] text-neutral-700 font-extrabold mb-0.5">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Incorrect</span>
              </div>
              <div className="text-xl font-extrabold text-black font-mono">
                {stats.incorrectCount}
              </div>
              <div className="text-[10px] text-neutral-500 font-mono font-medium">
                reviewed below
              </div>
            </div>

            <div className="border-l-2 border-black pl-2.5 py-1 rounded-r-lg p-2.5 border border-neutral-200 bg-neutral-50">
              <div className="flex items-center gap-1 text-[11px] text-neutral-700 font-extrabold mb-0.5">
                <Clock className="w-3.5 h-3.5 text-black" />
                <span>Total Time</span>
              </div>
              <div className="text-xl font-extrabold text-black font-mono">
                {formatSeconds(stats.totalTimeSeconds)}
              </div>
              <div className="text-[10px] text-neutral-500 font-mono font-medium">
                active practice
              </div>
            </div>

            <div className="border-l-2 border-black pl-2.5 py-1 rounded-r-lg p-2.5 border border-neutral-200 bg-neutral-50">
              <div className="flex items-center gap-1 text-[11px] text-neutral-700 font-extrabold mb-0.5">
                <Award className="w-3.5 h-3.5 text-black" />
                <span>Pacing Avg</span>
              </div>
              <div className="text-xl font-extrabold text-black font-mono">
                {stats.averageTimePerQuestion}s
              </div>
              <div className="text-[10px] text-neutral-500 font-mono font-medium">
                per passage
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Note */}
        <div className="border-t border-neutral-200 pt-3">
          <h4 className="text-[10px] font-mono font-extrabold tracking-wider text-black uppercase mb-0.5">
            Performance Assessment & Strategy Note
          </h4>
          <p className="text-xs text-neutral-700 leading-relaxed font-medium">
            {bandInfo.description} {bandInfo.recommendation}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <MainCTA
            variant="primary"
            size="sm"
            onClick={onRestart}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            Practice Again
          </MainCTA>

          <MainCTA
            variant="outline"
            size="sm"
            onClick={onReturnHome}
            icon={<Home className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            Return to Home
          </MainCTA>
        </div>
      </div>

      {/* Question Review Section */}
      <section className="space-y-3 border border-neutral-300 rounded-xl p-4 sm:p-5 shadow-2xs bg-white" aria-label="Question Review">
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-neutral-200">
          <div>
            <h3 className="text-base font-extrabold text-black">
              Detailed Question Review
            </h3>
            <p className="text-[11px] text-neutral-600 font-medium">
              Inspect your sentence selections, the target sentences, and academic rationales.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-neutral-100 p-0.5 border border-neutral-300 rounded-full text-[11px] font-bold">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-black text-white font-extrabold shadow-2xs'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              All ({passages.length})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                filter === 'correct'
                  ? 'bg-emerald-700 text-white font-extrabold shadow-2xs'
                  : 'text-neutral-700 hover:text-emerald-700'
              }`}
            >
              Correct ({stats.correctCount})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                filter === 'incorrect'
                  ? 'bg-rose-700 text-white font-extrabold shadow-2xs'
                  : 'text-neutral-700 hover:text-rose-700'
              }`}
            >
              Incorrect ({stats.incorrectCount})
            </button>
          </div>
        </div>

        {/* List of Questions */}
        <div className="space-y-2.5">
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
                className="border-b border-neutral-200 pb-2.5 transition-all text-black"
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
                  className="flex items-start justify-between gap-2.5 cursor-pointer hover:bg-neutral-50 rounded-lg p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 font-mono">
                      <span className="text-[11px] font-extrabold text-black">
                        Q{orderIndex + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border border-neutral-300 bg-neutral-100 text-black">
                        {passage.subject}
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 text-[11px] font-extrabold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct [Option {targetLetter}]
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 text-[11px] font-extrabold">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect (Picked [{userLetter}] • Correct was [{targetLetter}])
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-extrabold text-black">
                      {passage.question}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedPassageId(isExpanded ? null : passage.id);
                    }}
                    className="p-1 rounded-full text-neutral-600 hover:text-black hover:bg-neutral-100 cursor-pointer"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Collapsible Details */}
                {isExpanded && (
                  <div className="mt-1.5 pl-3 border-l-2 border-black space-y-2.5 text-xs animate-in fade-in duration-200 py-2 bg-neutral-50 rounded-r-xl p-3 border border-neutral-200">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-neutral-600 block">
                        Passage Context (Sentences [A]–[E])
                      </span>
                      <p className="font-serif text-neutral-800 leading-relaxed text-xs font-medium">
                        {passage.sentences.map((s, sIdx) => {
                          const sLetter = indexToLetter(sIdx);
                          const isTarget = sIdx === passage.correctAnswerIndex;
                          const isUserPick = selectedIdx === sIdx;

                          let highlight = '';
                          if (isTarget) {
                            highlight =
                              'bg-emerald-100 text-emerald-900 font-bold px-1 py-0.5 rounded ring-1 ring-emerald-500';
                          } else if (isUserPick) {
                            highlight =
                              'bg-rose-100 text-rose-900 font-bold line-through decoration-rose-600 px-1 py-0.5 rounded ring-1 ring-rose-500';
                          }

                          return (
                            <span key={sIdx} className={highlight}>
                              <strong className="font-mono text-[10px] font-extrabold">[{sLetter}]</strong> {s}{' '}
                            </span>
                          );
                        })}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="pl-2.5 py-1 border-l-2 border-emerald-600 bg-emerald-50 rounded-r-md text-emerald-900">
                        <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-emerald-700 block mb-0.5">
                          Target Sentence: Option [{targetLetter}]
                        </span>
                        <div className="font-serif italic text-xs font-medium">
                          &ldquo;[{targetLetter}] {passage.correctSentence}&rdquo;
                        </div>
                      </div>

                      {!isCorrect && selectedIdx !== null && selectedIdx !== undefined && (
                        <div className="pl-2.5 py-1 border-l-2 border-rose-600 bg-rose-50 rounded-r-md text-rose-900">
                          <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-rose-700 block mb-0.5">
                            Your Selection: Option [{userLetter}]
                          </span>
                          <div className="font-serif italic text-xs font-medium">
                            &ldquo;[{userLetter}] {passage.sentences[selectedIdx]}&rdquo;
                          </div>
                          {passage.distractorExplanations[selectedIdx] && (
                            <p className="mt-0.5 text-[10px] text-rose-800 font-medium">
                              {passage.distractorExplanations[selectedIdx]}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-neutral-600 block">
                        Academic Explanation
                      </span>
                      <p className="text-neutral-800 leading-relaxed text-xs font-medium">
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
