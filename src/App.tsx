import React, { useState, useEffect } from 'react';
import { PASSAGES } from './data/passages';
import { PracticeSession, UserAnswer } from './types/question';
import { loadSession, saveSession, clearSession, getInitialSession } from './utils/storage';
import { shuffleArray } from './utils/answerValidation';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { ExamInterface } from './components/ExamInterface';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ConfirmationModal } from './components/ConfirmationModal';
import { Footer } from './components/Footer';

export default function App() {
  const allPassageIds = PASSAGES.map((p) => p.id);
  const [session, setSession] = useState<PracticeSession>(() => {
    return loadSession(allPassageIds);
  });

  const [view, setView] = useState<'landing' | 'exam' | 'results'>(() => {
    const loaded = loadSession(allPassageIds);
    if (loaded.isCompleted) {
      return 'results';
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      return 'exam';
    }
    return 'landing';
  });

  // Modal states
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: () => void;
    isDestructive?: boolean;
  }>({
    isOpen: false,
    title: '',
    message: '',
    action: () => {},
  });

  // Timer effect
  useEffect(() => {
    if (view !== 'exam' || session.isCompleted) return;

    const interval = setInterval(() => {
      setSession((prev) => {
        const updated = {
          ...prev,
          totalTimeSeconds: prev.totalTimeSeconds + 1,
        };
        saveSession(updated);
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [view, session.isCompleted]);

  // Current passage
  const currentPassageId = session.passageOrder[session.currentPassageIndex] || 1;
  const currentPassage =
    PASSAGES.find((p) => p.id === currentPassageId) || PASSAGES[0];

  const handleStartFresh = (isRandom: boolean) => {
    const order = isRandom ? shuffleArray(allPassageIds) : [...allPassageIds];
    const newSession = getInitialSession(order, isRandom);
    setSession(newSession);
    saveSession(newSession);
    setView('exam');
  };

  const handleResume = () => {
    setView('exam');
  };

  const handleUpdateAnswer = (newAnswer: UserAnswer) => {
    setSession((prev) => {
      const updatedAnswers = {
        ...prev.answers,
        [newAnswer.passageId]: newAnswer,
      };

      const allSubmitted = prev.passageOrder.every(
        (id) => updatedAnswers[id]?.isSubmitted
      );

      const updatedSession: PracticeSession = {
        ...prev,
        answers: updatedAnswers,
        isCompleted: allSubmitted ? true : prev.isCompleted,
      };

      saveSession(updatedSession);
      return updatedSession;
    });
  };

  const handleNavigatePassage = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < PASSAGES.length) {
      setSession((prev) => {
        const updated = { ...prev, currentPassageIndex: newIndex };
        saveSession(updated);
        return updated;
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinishPractice = () => {
    setSession((prev) => {
      const updated: PracticeSession = {
        ...prev,
        isCompleted: true,
      };
      saveSession(updated);
      return updated;
    });
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFontSize = () => {
    setSession((prev) => {
      const nextSize = prev.fontSize === 'normal' ? 'large' : 'normal';
      const updated = { ...prev, fontSize: nextSize as 'normal' | 'large' };
      saveSession(updated);
      return updated;
    });
  };

  const handlePromptExitHome = () => {
    const hasUnsavedProgress = Object.values(session.answers).some(
      (a) => a.isSubmitted
    );

    if (hasUnsavedProgress && !session.isCompleted) {
      setConfirmModal({
        isOpen: true,
        title: 'Return to Landing Page?',
        message:
          'Your progress is automatically saved in your browser. You can resume at any time.',
        isDestructive: false,
        action: () => {
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
          setView('landing');
        },
      });
    } else {
      setView('landing');
    }
  };

  const formattedTime = (() => {
    const totalSec = session.totalTimeSeconds || 0;
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  })();

  return (
    <div className="relative min-h-screen text-black bg-white selection:bg-black selection:text-white flex flex-col justify-between">
      {/* Slim Announcement Bar — Landing Page Only */}
      {view === 'landing' && <Header />}

      <div className="flex-1 flex flex-col justify-between">
        {view === 'landing' && (
          <LandingPage
            passages={PASSAGES}
            savedSession={session}
            onStartFresh={handleStartFresh}
            onResume={handleResume}
          />
        )}

        {view === 'exam' && (
          <ExamInterface
            passages={PASSAGES}
            session={session}
            currentPassage={currentPassage}
            onUpdateAnswer={handleUpdateAnswer}
            onNavigatePassage={handleNavigatePassage}
            onFinishPractice={handleFinishPractice}
            onToggleFontSize={handleToggleFontSize}
            onResetSession={() => {}}
            onExitToHome={handlePromptExitHome}
            formattedTime={formattedTime}
          />
        )}

        {view === 'results' && (
          <ResultsDashboard
            passages={PASSAGES}
            session={session}
            onRestart={() => handleStartFresh(session.isRandomOrder)}
            onReturnHome={() => setView('landing')}
          />
        )}
      </div>

      {/* Footer — Landing Page Only */}
      {view === 'landing' && <Footer />}

      {/* Confirmation Dialog */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmLabel="Confirm"
        onConfirm={confirmModal.action}
        onCancel={() =>
          setConfirmModal((prev) => ({ ...prev, isOpen: false }))
        }
        isDestructive={confirmModal.isDestructive}
      />
    </div>
  );
}
