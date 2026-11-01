import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Award,
} from 'lucide-react';
import { Passage, PracticeSession } from '../types/question';
import { FluidButton } from './FluidButton';

interface LandingPageProps {
  passages: Passage[];
  savedSession: PracticeSession | null;
  onStartFresh: (isRandom: boolean) => void;
  onResume: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  passages,
  savedSession,
  onStartFresh,
  onResume,
}) => {
  // Interactive preview state for the live demonstration widget
  const [previewSelected, setPreviewSelected] = useState<number>(2); // Default to C

  const hasUnfinishedProgress =
    savedSession &&
    !savedSession.isCompleted &&
    Object.values(savedSession.answers).some((a) => a.isSubmitted);

  const completedQuestionsCount = savedSession
    ? Object.values(savedSession.answers).filter((a) => a.isSubmitted).length
    : 0;

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-neutral-200">
      {/* Sleek Minimal Top Navigation */}
      <nav className="w-full border-b border-neutral-200/70 bg-white/75 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-950 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              T
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-neutral-950 block">
                TOEFL iBT® Reading
              </span>
              <span className="text-[11px] font-mono text-neutral-500 block -mt-0.5">
                Select the Sentence
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-neutral-700 font-mono text-xs font-semibold border border-neutral-200/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              100% Offline Practice
            </span>

            {hasUnfinishedProgress && (
              <FluidButton
                variant="primary"
                size="sm"
                onClick={onResume}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                Resume ({completedQuestionsCount}/20)
              </FluidButton>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8" aria-label="Hero">
          {/* Subtle Platform Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200/80 bg-white/85 shadow-2xs text-xs font-semibold text-neutral-700">
            <Sparkles className="w-3.5 h-3.5 text-neutral-600" />
            <span>Official Examination Practice Suite</span>
            <span className="text-neutral-300">•</span>
            <span className="font-mono text-neutral-500">20 Academic Disciplines</span>
          </div>

          {/* Primary Headlines */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight leading-[1.12]">
              Master TOEFL Reading. One Sentence at a Time.
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Improve your reading comprehension with 20 carefully designed academic passages,
              authentic sentence-selection practice, and instant educational feedback.
            </p>
          </div>

          {/* Fluid Button CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <FluidButton
              variant="primary"
              size="lg"
              onClick={() => onStartFresh(false)}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Start Practicing
            </FluidButton>

            {hasUnfinishedProgress ? (
              <FluidButton
                variant="secondary"
                size="lg"
                onClick={onResume}
                className="w-full sm:w-auto"
              >
                Resume Progress ({completedQuestionsCount} of 20)
              </FluidButton>
            ) : (
              <FluidButton
                variant="outline"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto"
              >
                How It Works
              </FluidButton>
            )}
          </div>
        </section>

        {/* Live Examination Experience Preview */}
        <section
          className="bg-white/90 backdrop-blur-md rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 space-y-6 text-left"
          aria-label="Interactive Interface Demonstration"
        >
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase">
                Interactive Examination Demonstration
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
              Try clicking letter buttons below
            </span>
          </div>

          {/* Question Prompt */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
              Paragraph 2 Question
            </span>
            <p className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
              In paragraph 2, which sentence explains the exact physical mechanism by which pollen is transferred to the reproductive organ of a recipient flower?
            </p>
          </div>

          {/* Passage with [A] to [E] */}
          <div className="p-5 sm:p-6 bg-neutral-50/70 rounded-xl border border-neutral-200/80 font-serif text-neutral-800 text-sm sm:text-base leading-relaxed">
            <span
              onClick={() => setPreviewSelected(0)}
              className={`cursor-pointer transition-colors px-1 py-0.5 rounded ${
                previewSelected === 0 ? 'bg-neutral-950 text-white font-semibold' : 'hover:bg-neutral-200/60'
              }`}
            >
              <span className="font-mono font-bold text-xs mr-1 opacity-75">[A]</span>
              Many flowering plants depend on insects to transfer pollen between flowers.
            </span>{' '}
            <span
              onClick={() => setPreviewSelected(1)}
              className={`cursor-pointer transition-colors px-1 py-0.5 rounded ${
                previewSelected === 1 ? 'bg-neutral-950 text-white font-semibold' : 'hover:bg-neutral-200/60'
              }`}
            >
              <span className="font-mono font-bold text-xs mr-1 opacity-75">[B]</span>
              Pollen grains attach to an insect&apos;s body when it visits a flower in search of nectar.
            </span>{' '}
            <span
              onClick={() => setPreviewSelected(2)}
              className={`cursor-pointer transition-colors px-1 py-0.5 rounded ${
                previewSelected === 2 ? 'bg-neutral-950 text-white font-semibold' : 'hover:bg-neutral-200/60'
              }`}
            >
              <span className="font-mono font-bold text-xs mr-1 opacity-75">[C]</span>
              When the insect visits another flower, some pollen is deposited on its sticky stigma.
            </span>{' '}
            <span
              onClick={() => setPreviewSelected(3)}
              className={`cursor-pointer transition-colors px-1 py-0.5 rounded ${
                previewSelected === 3 ? 'bg-neutral-950 text-white font-semibold' : 'hover:bg-neutral-200/60'
              }`}
            >
              <span className="font-mono font-bold text-xs mr-1 opacity-75">[D]</span>
              This process enables fertilization and eventually allows plants to produce seeds.
            </span>{' '}
            <span
              onClick={() => setPreviewSelected(4)}
              className={`cursor-pointer transition-colors px-1 py-0.5 rounded ${
                previewSelected === 4 ? 'bg-neutral-950 text-white font-semibold' : 'hover:bg-neutral-200/60'
              }`}
            >
              <span className="font-mono font-bold text-xs mr-1 opacity-75">[E]</span>
              Environmental conditions can influence the frequency and efficiency of insect visits.
            </span>
          </div>

          {/* Letter Options A, B, C, D, E */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-neutral-500">
              <span>Answer Options (Letter-Only)</span>
              <span>Selected: Option [{['A', 'B', 'C', 'D', 'E'][previewSelected]}]</span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-sm mx-auto sm:mx-0">
              {['A', 'B', 'C', 'D', 'E'].map((letter, idx) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setPreviewSelected(idx)}
                  className={`h-12 rounded-full font-mono text-base font-bold transition-all cursor-pointer ${
                    previewSelected === idx
                      ? 'bg-neutral-950 text-white ring-2 ring-neutral-950 shadow-sm'
                      : 'bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Practice Information in Clean Editorial Layout (Phase 5) */}
        <section className="space-y-6" aria-label="Practice Information">
          <div className="text-center space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
              Examination Structure
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Curated for Genuine Academic Preparation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200/80 p-6 space-y-2">
              <div className="flex items-center gap-2.5 font-bold text-base text-neutral-950">
                <BookOpen className="w-4 h-4 text-neutral-700" />
                <span>20 Academic Passages & Questions</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Authored across 20 distinct university disciplines including Biology, Archaeology,
                Economics, Astronomy, Psychology, and Neuroscience.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200/80 p-6 space-y-2">
              <div className="flex items-center gap-2.5 font-bold text-base text-neutral-950">
                <Layers className="w-4 h-4 text-neutral-700" />
                <span>Five Letter-Based Answer Choices</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Authentic letter-only options [A] through [E]. No redundant sentence text cluttering
                the answer buttons, matching modern examination software.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200/80 p-6 space-y-2">
              <div className="flex items-center gap-2.5 font-bold text-base text-neutral-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instant Answer Checking & Explanations</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Immediate verification against local answer keys, with full verbatim target sentences,
                correct synthesis rationales, and distractor breakdowns.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200/80 p-6 space-y-2">
              <div className="flex items-center gap-2.5 font-bold text-base text-neutral-950">
                <Award className="w-4 h-4 text-neutral-700" />
                <span>Fully Offline & Local Practice</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                All 20 questions, answer keys, and progress persistence run entirely within your
                browser. Zero external API calls, tracking, or connectivity requirements.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works (3 Steps) */}
        <section id="how-it-works" className="space-y-8 scroll-mt-24" aria-label="How It Works">
          <div className="text-center space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
              Exam Strategy
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              How the Question Type Works
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-neutral-200/90 p-6 space-y-3">
              <div className="w-8 h-8 rounded-full bg-neutral-950 text-white font-mono font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-base text-neutral-950">Read the Academic Passage</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Analyze the paragraph structure and locate the specific claim, physical mechanism,
                or contrast requested in the question prompt.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-neutral-200/90 p-6 space-y-3">
              <div className="w-8 h-8 rounded-full bg-neutral-950 text-white font-mono font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-base text-neutral-950">Select Sentence A, B, C, D, or E</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Click directly on the labeled sentence or choose its corresponding letter button.
                Only one option is active at any time.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-neutral-200/90 p-6 space-y-3">
              <div className="w-8 h-8 rounded-full bg-neutral-950 text-white font-mono font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-base text-neutral-950">Check & Understand Rationale</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Submit your choice for instant evaluation. Study the exact quote, why it satisfies
                the prompt, and why other sentences are distractors.
              </p>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section
          className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-md"
          aria-label="Final Call to Action"
        >
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Practice Select the Sentence?
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Begin your 20-passage academic reading session now. Master the interaction, refine
              your pacing, and review comprehensive answer rationales.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <FluidButton
              variant="secondary"
              size="lg"
              onClick={() => onStartFresh(false)}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Start Practicing Now
            </FluidButton>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-neutral-200/70 bg-white/60 backdrop-blur-sm py-6 mt-12 text-center text-xs text-neutral-500 font-mono">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>TOEFL iBT® Select the Sentence Practice Platform</span>
          <span>100% Client-Side • Local Evaluation • 20 Academic Passages</span>
        </div>
      </footer>
    </div>
  );
};
