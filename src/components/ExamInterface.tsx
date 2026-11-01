import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Passage, PracticeSession, UserAnswer } from '../types/question';
import { PassageDisplay } from './PassageDisplay';
import { LetterOptionGroup } from './LetterOptionGroup';
import { AnswerFeedback } from './AnswerFeedback';
import { validateAnswer, indexToLetter } from '../utils/answerValidation';
import { FluidButton } from './FluidButton';

interface ExamInterfaceProps {
  passages: Passage[];
  session: PracticeSession;
  currentPassage: Passage;
  onUpdateAnswer: (answer: UserAnswer) => void;
  onNavigatePassage: (newIndex: number) => void;
  onFinishPractice: () => void;
}

export const ExamInterface: React.FC<ExamInterfaceProps> = ({
  passages,
  session,
  currentPassage,
  onUpdateAnswer,
  onNavigatePassage,
  onFinishPractice,
}) => {
  const currentAnswer = session.answers[currentPassage.id];
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<number | null>(
    currentAnswer?.selectedSentenceIndex ?? null
  );

  // Sync internal selection state when switching passages
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
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Question Prompt Card */}
      <section
        className="bg-white/92 backdrop-blur-md rounded-2xl border border-neutral-200/90 shadow-xs p-5 sm:p-7 space-y-2"
        aria-label="TOEFL Question Section"
      >
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase">
          <span>Question {session.currentPassageIndex + 1} of {passages.length}</span>
          <span className="text-neutral-300">•</span>
          <span>{currentPassage.subject}</span>
          <span className="text-neutral-300">•</span>
          <span className="text-neutral-700">{currentPassage.topicCategory}</span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight leading-snug">
          {currentPassage.question}
        </h2>
      </section>

      {/* Academic Passage with [A] to [E] Labeled Sentences */}
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

      {/* Answer Options: ONLY the five letter buttons A, B, C, D, E */}
      <section aria-label="Answer Options Section">
        <LetterOptionGroup
          selectedSentenceIndex={selectedSentenceIndex}
          correctAnswerIndex={currentPassage.correctAnswerIndex}
          onSelectOption={handleSelectSentence}
          isSubmitted={isSubmitted}
          wasCorrect={currentAnswer?.isCorrect}
        />
      </section>

      {/* Submission Control (when not submitted yet) */}
      {!isSubmitted && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/92 backdrop-blur-md rounded-2xl border border-neutral-200/90 p-4 sm:p-5 shadow-xs">
          <div className="text-xs text-neutral-600 flex items-center gap-2 font-mono">
            <span
              className={`w-2 h-2 rounded-full ${
                selectedSentenceIndex !== null ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-300'
              }`}
            />
            <span>
              {selectedSentenceIndex !== null
                ? `Option [${indexToLetter(selectedSentenceIndex)}] selected. Click Check Answer to evaluate.`
                : 'Select letter A, B, C, D, or E above to submit your selection.'}
            </span>
          </div>

          <FluidButton
            variant="primary"
            size="md"
            onClick={handleCheckAnswer}
            disabled={selectedSentenceIndex === null}
            className="w-full sm:w-auto"
          >
            Check Answer
          </FluidButton>
        </div>
      )}

      {/* Answer Feedback & Explanations (when submitted) */}
      {isSubmitted && currentAnswer && (
        <section aria-label="Answer Feedback">
          <AnswerFeedback
            passage={currentPassage}
            userAnswer={currentAnswer}
            onContinue={handleContinue}
            onRetry={handleRetry}
            isLastQuestion={isLastQuestion}
          />
        </section>
      )}

      {/* Distraction-Free Bottom Navigation Toolbar */}
      <nav
        className="flex items-center justify-between pt-4 border-t border-neutral-200/80 text-sm font-medium"
        aria-label="Question Pagination"
      >
        <FluidButton
          variant="outline"
          size="sm"
          onClick={() => onNavigatePassage(session.currentPassageIndex - 1)}
          disabled={isFirstQuestion}
          icon={<ChevronLeft className="w-4 h-4" />}
          iconPosition="left"
        >
          Previous
        </FluidButton>

        <div className="text-xs font-mono font-medium text-neutral-500">
          Passage {String(session.currentPassageIndex + 1).padStart(2, '0')} / {passages.length}
        </div>

        {isLastQuestion ? (
          <FluidButton
            variant="primary"
            size="sm"
            onClick={onFinishPractice}
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
            data-testid="finish-practice-nav-btn"
          >
            Finish Practice
          </FluidButton>
        ) : (
          <FluidButton
            variant="outline"
            size="sm"
            onClick={() => onNavigatePassage(session.currentPassageIndex + 1)}
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Next
          </FluidButton>
        )}
      </nav>
    </main>
  );
};
