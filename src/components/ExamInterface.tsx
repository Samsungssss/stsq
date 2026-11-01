import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Type } from 'lucide-react';
import { Passage, PracticeSession, UserAnswer } from '../types/question';
import { PassageDisplay } from './PassageDisplay';
import { LetterOptionGroup } from './LetterOptionGroup';
import { AnswerFeedback } from './AnswerFeedback';
import { validateAnswer } from '../utils/answerValidation';
import { MainCTA } from './MainCTA';
import { TextReveal } from './TextReveal';

interface ExamInterfaceProps {
  passages: Passage[];
  session: PracticeSession;
  currentPassage: Passage;
  onUpdateAnswer: (answer: UserAnswer) => void;
  onNavigatePassage: (newIndex: number) => void;
  onFinishPractice: () => void;
  onToggleFontSize: () => void;
  onResetSession: () => void;
  onExitToHome: () => void;
  formattedTime: string;
}

export const ExamInterface: React.FC<ExamInterfaceProps> = ({
  passages,
  session,
  currentPassage,
  onUpdateAnswer,
  onNavigatePassage,
  onFinishPractice,
  onToggleFontSize,
  onExitToHome,
  formattedTime,
}) => {
  const currentAnswer = session.answers[currentPassage.id];
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<number | null>(
    currentAnswer?.selectedSentenceIndex ?? null
  );

  useEffect(() => {
    setSelectedSentenceIndex(currentAnswer?.selectedSentenceIndex ?? null);
  }, [currentPassage.id, currentAnswer?.selectedSentenceIndex]);

  const isSubmitted = Boolean(currentAnswer?.isSubmitted);
  const isLastQuestion = session.currentPassageIndex === passages.length - 1;
  const isFirstQuestion = session.currentPassageIndex === 0;

  const handleSelectSentence = (index: number) => {
    if (isSubmitted) return;
    setSelectedSentenceIndex(index);
  };

  const handleCheckAnswer = () => {
    if (selectedSentenceIndex === null || isSubmitted) return;

    const isCorrect = validateAnswer(currentPassage, selectedSentenceIndex);
    const newAnswer: UserAnswer = {
      passageId: currentPassage.id,
      selectedSentenceIndex,
      isSubmitted: true,
      isCorrect,
      timeSpentSeconds: (currentAnswer?.timeSpentSeconds || 0) + 15,
      attemptsCount: (currentAnswer?.attemptsCount || 0) + 1,
    };

    onUpdateAnswer(newAnswer);
  };

  const handleRetry = () => {
    const newAnswer: UserAnswer = {
      passageId: currentPassage.id,
      selectedSentenceIndex: null,
      isSubmitted: false,
      isCorrect: null,
      timeSpentSeconds: currentAnswer?.timeSpentSeconds || 0,
      attemptsCount: (currentAnswer?.attemptsCount || 0) + 1,
    };
    setSelectedSentenceIndex(null);
    onUpdateAnswer(newAnswer);
  };

  const handleContinue = () => {
    if (isLastQuestion) {
      onFinishPractice();
    } else {
      onNavigatePassage(session.currentPassageIndex + 1);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 bg-white text-black min-h-screen">
      {/* Single Minimal Status Header Line */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5 font-mono text-xs text-black">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse shrink-0" />
          <span className="font-extrabold text-black">
            Question {session.currentPassageIndex + 1} of {passages.length}
          </span>
          <span className="text-neutral-400">•</span>
          <span className="font-semibold text-neutral-700">{currentPassage.subject}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-neutral-600 font-semibold">{formattedTime}</span>
        </div>
      </div>

      {/* Question Prompt */}
      <section aria-label="TOEFL Question Section" className="space-y-1 py-1">
        <TextReveal
          as="h2"
          split="words"
          effect="rise"
          duration={0.4}
          key={currentPassage.id}
          className="text-base sm:text-lg font-extrabold text-black tracking-tight leading-snug"
        >
          {currentPassage.question}
        </TextReveal>
      </section>

      {/* Academic Passage with Labeled Sentences */}
      <section aria-label="Reading Passage Section">
        <PassageDisplay
          passage={currentPassage}
          userAnswer={currentAnswer}
          selectedSentenceIndex={selectedSentenceIndex}
          onSelectSentence={handleSelectSentence}
          fontSize={session.fontSize}
          isSubmitted={isSubmitted}
        />
      </section>

      {/* Answer Options: Letter Buttons A, B, C, D, E */}
      <section aria-label="Answer Options Section">
        <LetterOptionGroup
          selectedSentenceIndex={selectedSentenceIndex}
          correctAnswerIndex={currentPassage.correctAnswerIndex}
          onSelectOption={handleSelectSentence}
          isSubmitted={isSubmitted}
          wasCorrect={currentAnswer?.isCorrect}
        />
      </section>

      {/* Unified Action & Navigation Control Bar Directly Below Answer Options */}
      <nav
        className="pt-3 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3"
        aria-label="Exam Action Controls"
      >
        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <MainCTA
            variant="outline"
            size="sm"
            onClick={() => onNavigatePassage(session.currentPassageIndex - 1)}
            disabled={isFirstQuestion}
            icon={<ChevronLeft className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            Previous
          </MainCTA>

          <MainCTA
            variant="outline"
            size="sm"
            onClick={() => onNavigatePassage(session.currentPassageIndex + 1)}
            disabled={isLastQuestion}
            icon={<ChevronRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Next
          </MainCTA>
        </div>

        {/* Primary Evaluation Action */}
        {!isSubmitted && (
          <MainCTA
            variant="primary"
            size="sm"
            onClick={handleCheckAnswer}
            disabled={selectedSentenceIndex === null}
            className="w-full sm:w-auto"
          >
            Check Answer
          </MainCTA>
        )}

        {/* Secondary Utility Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFontSize}
            className="h-9 px-3 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 text-black text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer"
            title="Toggle text size"
            aria-label="Toggle text size"
          >
            <Type className="w-3.5 h-3.5 text-neutral-600" />
            <span className="uppercase">{session.fontSize}</span>
          </button>

          <MainCTA
            variant="outline"
            size="sm"
            onClick={onExitToHome}
            icon={<Home className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            Home
          </MainCTA>
        </div>
      </nav>

      {/* Answer Feedback & Explanations (Appears when submitted) */}
      {isSubmitted && currentAnswer && (
        <section aria-label="Answer Feedback" className="pt-2">
          <AnswerFeedback
            passage={currentPassage}
            userAnswer={currentAnswer}
            onContinue={handleContinue}
            onRetry={handleRetry}
            isLastQuestion={isLastQuestion}
          />
        </section>
      )}
    </main>
  );
};
