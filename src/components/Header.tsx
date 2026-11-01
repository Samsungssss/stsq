import React from 'react';
import { RotateCcw, Home, Type } from 'lucide-react';
import { Passage, PracticeSession } from '../types/question';
import { FluidButton } from './FluidButton';

interface HeaderProps {
  passages: Passage[];
  session: PracticeSession;
  currentPassage: Passage;
  onSelectPassage: (index: number) => void;
  onToggleFontSize: () => void;
  onResetSession: () => void;
  onExitToHome: () => void;
  formattedTime: string;
}

export const Header: React.FC<HeaderProps> = ({
  passages,
  session,
  onToggleFontSize,
  onResetSession,
  onExitToHome,
  formattedTime,
}) => {
  const completedCount = Object.values(session.answers).filter(
    (a) => a.isSubmitted
  ).length;
  const progressPercent = Math.round((completedCount / passages.length) * 100);
  const currentNumber = session.currentPassageIndex + 1;

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-neutral-200/80 transition-colors">
      {/* Precision progress line */}
      <div className="w-full h-1 bg-neutral-100 overflow-hidden">
        <div
          className="h-full bg-neutral-950 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Minimal Platform & Home */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitToHome}
            className="flex items-center gap-2 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 rounded-lg p-1 transition-colors cursor-pointer"
            title="Return to Home"
          >
            <div className="w-7 h-7 rounded-full bg-neutral-950 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:bg-neutral-800 transition-colors">
              T
            </div>
            <span className="text-xs font-bold text-neutral-950 tracking-tight hidden sm:inline">
              TOEFL iBT Reading
            </span>
          </button>

          <span className="text-neutral-300 hidden sm:inline">•</span>

          {/* Minimal Question Progress */}
          <span className="text-xs font-mono font-bold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-200/80">
            Question {currentNumber} of {passages.length}
          </span>
        </div>

        {/* Right: Controls & Time */}
        <div className="flex items-center gap-2">
          {/* Active timer */}
          <span className="text-xs font-mono font-medium text-neutral-600 hidden xs:inline px-2 py-0.5">
            {formattedTime}
          </span>

          {/* Font scale toggle */}
          <button
            onClick={onToggleFontSize}
            className="h-8 px-2.5 rounded-full border border-neutral-200 bg-white/90 hover:bg-neutral-100 text-neutral-700 text-xs font-medium inline-flex items-center gap-1 transition-all shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
            title="Adjust reading font size"
            aria-label="Adjust font size"
          >
            <Type className="w-3.5 h-3.5 text-neutral-500" />
            <span className="font-mono text-[11px] uppercase">{session.fontSize}</span>
          </button>

          {/* Restart button with FluidButton */}
          <FluidButton
            variant="subtle"
            size="sm"
            onClick={onResetSession}
            icon={<RotateCcw className="w-3 h-3" />}
            title="Restart Practice"
          >
            Restart
          </FluidButton>

          {/* Return Home button */}
          <FluidButton
            variant="outline"
            size="sm"
            onClick={onExitToHome}
            icon={<Home className="w-3 h-3" />}
            title="Exit to Landing Page"
          >
            Exit
          </FluidButton>
        </div>
      </div>
    </header>
  );
};
