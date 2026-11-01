import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Layers,
  Award,
} from 'lucide-react';
import { Passage, PracticeSession } from '../types/question';
import { MainCTA } from './MainCTA';
import { TextReveal } from './TextReveal';

interface LandingPageProps {
  passages: Passage[];
  savedSession: PracticeSession | null;
  onStartFresh: (isRandom: boolean) => void;
  onResume: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  savedSession,
  onStartFresh,
  onResume,
}) => {
  const [previewSelected, setPreviewSelected] = useState<number>(2); // Default to C

  const hasUnfinishedProgress =
    savedSession &&
    !savedSession.isCompleted &&
    Object.values(savedSession.answers).some((a) => a.isSubmitted);

  const completedQuestionsCount = savedSession
    ? Object.values(savedSession.answers).filter((a) => a.isSubmitted).length
    : 0;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-5 py-6 sm:py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4" aria-label="Hero">
          {/* Small rounded floating announcement bar */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 bg-neutral-100 text-[11px] font-bold text-black shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span>TOEFL iBT® Select the Sentence Practice</span>
          </div>

          <div className="space-y-2.5 max-w-xl mx-auto">
            <TextReveal
              as="h1"
              split="words"
              effect="rise"
              duration={0.5}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight leading-[1.15]"
            >
              Master TOEFL Reading. One Sentence at a Time.
            </TextReveal>

            <TextReveal
              as="p"
              split="words"
              effect="fade"
              duration={0.6}
              delay={0.1}
              className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium"
            >
              Improve your reading comprehension with 20 carefully designed academic passages, authentic sentence-selection practice, and instant educational feedback.
            </TextReveal>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <MainCTA
              variant="primary"
              size="md"
              onClick={() => onStartFresh(false)}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Start Practicing
            </MainCTA>

            {hasUnfinishedProgress ? (
              <MainCTA
                variant="secondary"
                size="md"
                onClick={onResume}
                className="w-full sm:w-auto"
              >
                Resume Progress ({completedQuestionsCount} of 20)
              </MainCTA>
            ) : (
              <MainCTA
                variant="outline"
                size="md"
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto"
              >
                How It Works
              </MainCTA>
            )}
          </div>
        </section>

        {/* Live Demonstration Container */}
        <section
          className="space-y-4 text-left border border-neutral-300 rounded-2xl p-4 sm:p-5 shadow-2xs bg-white"
          aria-label="Interactive Interface Demonstration"
        >
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="text-[11px] font-mono font-extrabold tracking-wider text-black uppercase">
                Interactive Sentence Selection
              </span>
            </div>
            <span className="text-[11px] font-mono text-neutral-600 font-semibold hidden sm:inline">
              Click letter buttons or sentence text to test selection
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono font-extrabold text-neutral-600 uppercase tracking-wider">
              Paragraph 2 Question
            </span>
            <TextReveal
              as="p"
              split="words"
              effect="rise"
              duration={0.4}
              className="text-sm sm:text-base font-extrabold text-black leading-snug"
            >
              In paragraph 2, which sentence explains the exact physical mechanism by which pollen is transferred to the reproductive organ of a recipient flower?
            </TextReveal>
          </div>

          <div className="font-serif text-black text-xs sm:text-sm leading-relaxed py-1 space-y-1.5">
            <span
              onClick={() => setPreviewSelected(0)}
              className={`cursor-pointer transition-colors px-1 py-0.5 rounded-md ${
                previewSelected === 0 ? 'bg-black text-white font-bold' : 'hover:bg-neutral-100'
              }`}
            >
              <span className="font-mono font-extrabold text-[11px] mr-1">[A]</span>
              Many flowering plants depend on insects to transfer pollen between flowers.
            </span>{' '}
            <span
              onClick={() => setPreviewSelected(1)}
              className={`cursor-pointer transition-colors px-1 py-0.5 rounded-md ${
                previewSelected === 1 ? 'bg-black text-white font-bold' : 'hover:bg-neutral-100'
              }`}
            >
              <span className="font-mono font-extrabold text-[11px] mr-1">[B]</span>
              Pollen grains attach to an insect&apos;s body when it visits a flower in search of nectar.
            </span>{' '}
            <span
              onClick={() => setPreviewSelected(2)}
              className={`cursor-pointer transition-colors px-1 py-0.5 rounded-md ${
                previewSelected === 2 ? 'bg-black text-white font-bold' : 'hover:bg-neutral-100'
              }`}
            >
              <span className="font-mono font-extrabold text-[11px] mr-1">[C]</span>
              When the insect visits another flower, some pollen is deposited on its sticky stigma.
            </span>{' '}
            <span
              onClick={() => setPreviewSelected(3)}
              className={`cursor-pointer transition-colors px-1 py-0.5 rounded-md ${
                previewSelected === 3 ? 'bg-black text-white font-bold' : 'hover:bg-neutral-100'
              }`}
            >
              <span className="font-mono font-extrabold text-[11px] mr-1">[D]</span>
              This process enables fertilization and eventually allows plants to produce seeds.
            </span>{' '}
            <span
              onClick={() => setPreviewSelected(4)}
              className={`cursor-pointer transition-colors px-1 py-0.5 rounded-md ${
                previewSelected === 4 ? 'bg-black text-white font-bold' : 'hover:bg-neutral-100'
              }`}
            >
              <span className="font-mono font-extrabold text-[11px] mr-1">[E]</span>
              Environmental conditions can influence the frequency and efficiency of insect visits.
            </span>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-neutral-200">
            <div className="flex items-center justify-between text-[11px] font-mono font-extrabold text-black">
              <span>Answer Options (Letter-Only)</span>
              <span>Selected: Option [{['A', 'B', 'C', 'D', 'E'][previewSelected]}]</span>
            </div>

            <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto sm:mx-0">
              {['A', 'B', 'C', 'D', 'E'].map((letter, idx) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setPreviewSelected(idx)}
                  className={`h-9 rounded-lg font-mono text-xs font-extrabold transition-all cursor-pointer ${
                    previewSelected === idx
                      ? 'bg-black text-white shadow-xs'
                      : 'border border-neutral-300 bg-white text-black hover:bg-neutral-100'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Practice Architecture Grid */}
        <section className="space-y-4" aria-label="Practice Information">
          <div className="text-center space-y-0.5">
            <h2 className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-neutral-600">
              Examination Structure
            </h2>
            <TextReveal
              as="h3"
              split="words"
              effect="rise"
              className="text-xl sm:text-2xl font-extrabold text-black tracking-tight"
            >
              Designed for Authentic Academic Practice
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1 border-l-2 border-black pl-3 py-1.5 rounded-r-xl border border-neutral-300 p-3 bg-white">
              <div className="flex items-center gap-1.5 font-extrabold text-xs sm:text-sm text-black">
                <BookOpen className="w-4 h-4 text-black" />
                <span>20 Academic Reading Passages</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-700 leading-relaxed font-medium">
                Covers topics in Biology, Archaeology, Economics, Astronomy, Psychology, Neuroscience, and related fields.
              </p>
            </div>

            <div className="space-y-1 border-l-2 border-black pl-3 py-1.5 rounded-r-xl border border-neutral-300 p-3 bg-white">
              <div className="flex items-center gap-1.5 font-extrabold text-xs sm:text-sm text-black">
                <Layers className="w-4 h-4 text-black" />
                <span>Letter-Only Choices [A]–[E]</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-700 leading-relaxed font-medium">
                Clickable letter buttons A, B, C, D, E corresponding directly to labeled sentences in the text.
              </p>
            </div>

            <div className="space-y-1 border-l-2 border-black pl-3 py-1.5 rounded-r-xl border border-neutral-300 p-3 bg-white">
              <div className="flex items-center gap-1.5 font-extrabold text-xs sm:text-sm text-black">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Instant Diagnostic Explanations</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-700 leading-relaxed font-medium">
                Local evaluation displays verbatim correct target quotes and educational distractor breakdowns.
              </p>
            </div>

            <div className="space-y-1 border-l-2 border-black pl-3 py-1.5 rounded-r-xl border border-neutral-300 p-3 bg-white">
              <div className="flex items-center gap-1.5 font-extrabold text-xs sm:text-sm text-black">
                <Award className="w-4 h-4 text-black" />
                <span>100% Client-Side Persistence</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-700 leading-relaxed font-medium">
                All 20 questions and progress persistence run locally in your browser. Zero backend dependency.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works (3 Steps) */}
        <section id="how-it-works" className="space-y-4 scroll-mt-10" aria-label="How It Works">
          <div className="text-center space-y-0.5">
            <h2 className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-neutral-600">
              Exam Strategy
            </h2>
            <TextReveal
              as="h3"
              split="words"
              effect="rise"
              className="text-xl sm:text-2xl font-extrabold text-black tracking-tight"
            >
              Three Simple Practice Steps
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2 border border-neutral-300 rounded-xl p-4 shadow-2xs bg-white">
              <div className="w-6 h-6 rounded-full bg-black text-white font-mono font-extrabold text-[11px] flex items-center justify-center">
                1
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-black">Read Passage & Question</h4>
              <p className="text-[11px] sm:text-xs text-neutral-700 leading-relaxed font-medium">
                Identify the claim, physical mechanism, or contrast requested in the paragraph prompt.
              </p>
            </div>

            <div className="space-y-2 border border-neutral-300 rounded-xl p-4 shadow-2xs bg-white">
              <div className="w-6 h-6 rounded-full bg-black text-white font-mono font-extrabold text-[11px] flex items-center justify-center">
                2
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-black">Select Sentence A–E</h4>
              <p className="text-[11px] sm:text-xs text-neutral-700 leading-relaxed font-medium">
                Click directly on the labeled sentence or choose its corresponding letter button.
              </p>
            </div>

            <div className="space-y-2 border border-neutral-300 rounded-xl p-4 shadow-2xs bg-white">
              <div className="w-6 h-6 rounded-full bg-black text-white font-mono font-extrabold text-[11px] flex items-center justify-center">
                3
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-black">Check Rationale</h4>
              <p className="text-[11px] sm:text-xs text-neutral-700 leading-relaxed font-medium">
                Submit for instant feedback. Study why the quote is correct and why other choices are distractors.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="text-center space-y-3 py-6 border border-neutral-300 rounded-2xl p-6 shadow-2xs bg-white"
          aria-label="Final Call to Action"
        >
          <div className="space-y-1.5 max-w-md mx-auto">
            <TextReveal
              as="h3"
              split="words"
              effect="rise"
              className="text-xl sm:text-2xl font-extrabold tracking-tight text-black"
            >
              Ready to Practice Select the Sentence?
            </TextReveal>
            <p className="text-xs text-neutral-700 leading-relaxed font-medium">
              Begin your 20-passage practice session now. Master the interaction and refine your reading speed.
            </p>
          </div>

          <div className="pt-1 flex justify-center">
            <MainCTA
              variant="primary"
              size="md"
              onClick={() => onStartFresh(false)}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Start Practicing Now
            </MainCTA>
          </div>
        </section>
      </main>
    </div>
  );
};
