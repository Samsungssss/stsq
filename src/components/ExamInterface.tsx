import React, { useEffect, useState } from 'react';
import { Passage, PracticeSession, UserAnswer } from '../types/question';
import { PassageDisplay } from './PassageDisplay';
import { AnswerFeedback } from './AnswerFeedback';
import { validateAnswer } from '../utils/answerValidation';
import { TextReveal } from './TextReveal';
import { SmartButton } from './SmartButton';

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
    currentAnswer?.selectedSentenceIndex ?? null,
  );
  const isSubmitted = Boolean(currentAnswer?.isSubmitted);
  const isLastQuestion = session.currentPassageIndex === passages.length - 1;

  useEffect(() => {
    setSelectedSentenceIndex(currentAnswer?.selectedSentenceIndex ?? null);
  }, [currentPassage.id, currentAnswer?.selectedSentenceIndex]);

  const handleSelectSentence = (index: number) => {
    if (!isSubmitted) setSelectedSentenceIndex(index);
  };

  const handleCheckAnswer = () => {
    if (selectedSentenceIndex === null || isSubmitted) return;
    onUpdateAnswer({
      passageId: currentPassage.id,
      selectedSentenceIndex,
      isSubmitted: true,
      isCorrect: validateAnswer(currentPassage, selectedSentenceIndex),
      timeSpentSeconds: (currentAnswer?.timeSpentSeconds || 0) + 15,
      attemptsCount: (currentAnswer?.attemptsCount || 0) + 1,
    });
  };

  const handleContinue = () => {
    if (isLastQuestion) onFinishPractice();
    else onNavigatePassage(session.currentPassageIndex + 1);
  };

  return (
    <main className="min-h-screen bg-white px-8 py-8 text-black lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1440px] flex-col justify-center">
        <header className="mb-8 flex items-center justify-between border-b border-black/15 pb-3 font-mono text-xs">
          <span className="font-bold tracking-wide">QUESTION {session.currentPassageIndex + 1} / {passages.length}</span>
          <span>{currentPassage.subject} · {formattedTime}</span>
        </header>

        <section aria-label="TOEFL question" className="mx-auto mb-7 w-full max-w-[1180px]">
          <TextReveal as="h1" split="words" effect="fade" duration={0.35} key={currentPassage.id} className="text-lg font-semibold leading-snug">
            {currentPassage.question}
          </TextReveal>
        </section>

        <section aria-label="Reading passage" className="mx-auto w-full max-w-[1180px]">
          <PassageDisplay
            passage={currentPassage}
            userAnswer={currentAnswer}
            selectedSentenceIndex={selectedSentenceIndex}
            onSelectSentence={handleSelectSentence}
            fontSize={session.fontSize}
            isSubmitted={isSubmitted}
          />
        </section>

        <nav aria-label="Exam controls" className="mx-auto mt-10 flex w-full max-w-[1180px] items-center justify-center gap-3">
          <SmartButton
            type="button"
            onClick={isSubmitted ? handleContinue : handleCheckAnswer}
            disabled={!isSubmitted && selectedSentenceIndex === null}
          >
            {isSubmitted ? (isLastQuestion ? 'Finish' : 'Continue') : 'Check Answer'}
          </SmartButton>
          <SmartButton type="button" onClick={onExitToHome} showArrow={false}>
            Restart
          </SmartButton>
          <SmartButton type="button" onClick={onToggleFontSize} showArrow={false} aria-label="Toggle font size">
            Font Size: {session.fontSize === 'normal' ? '19px' : '21px'}
          </SmartButton>
        </nav>

        <div className="mx-auto mt-6 min-h-[112px] w-full max-w-[1180px]">
          {isSubmitted && currentAnswer && (
            <AnswerFeedback
              passage={currentPassage}
              userAnswer={currentAnswer}
              onContinue={handleContinue}
              onRetry={() => {}}
              isLastQuestion={isLastQuestion}
            />
          )}
        </div>
      </div>
    </main>
  );
};
