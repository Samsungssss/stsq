import test from 'node:test';
import assert from 'node:assert/strict';
import { PASSAGES } from '../data/passages';
import {
  validateAnswer,
  calculateSessionStats,
  getReadingBandEstimate,
  indexToLetter,
  letterToIndex,
  OPTION_LETTERS,
} from './answerValidation';
import { UserAnswer } from '../types/question';

test('dataset contains exactly 20 passages with exactly 5 labeled sentences [A]-[E]', () => {
  assert.equal(PASSAGES.length, 20, 'Must have exactly 20 passages');

  const seenIds = new Set<number>();
  const seenSubjects = new Set<string>();

  PASSAGES.forEach((p, idx) => {
    assert.equal(p.id, idx + 1, `Passage ID must equal ${idx + 1}`);
    assert.ok(!seenIds.has(p.id), `Passage ID ${p.id} must be unique`);
    seenIds.add(p.id);

    assert.ok(p.title && p.title.trim().length > 0, `Passage ${p.id} must have title`);
    assert.ok(p.subject && p.subject.trim().length > 0, `Passage ${p.id} must have subject`);
    seenSubjects.add(p.subject);

    // Each passage must have exactly 5 sentences: A, B, C, D, E
    assert.equal(
      p.sentences.length,
      5,
      `Passage ${p.id} must have exactly 5 sentences, got ${p.sentences.length}`
    );

    // Check total word count
    const totalWords = p.sentences.join(' ').split(/\s+/).filter(Boolean).length;
    assert.ok(
      totalWords >= 80 && totalWords <= 160,
      `Passage ${p.id} word count (${totalWords}) should be within academic range`
    );

    // Validate correct answer index (0 to 4)
    assert.ok(
      p.correctAnswerIndex >= 0 && p.correctAnswerIndex < 5,
      `Passage ${p.id} correctAnswerIndex (${p.correctAnswerIndex}) must be within [0, 4]`
    );

    // Validate correctSentence matches exactly
    assert.equal(
      p.correctSentence,
      p.sentences[p.correctAnswerIndex],
      `Passage ${p.id} correctSentence must match sentences[correctAnswerIndex]`
    );

    // Validate question & explanation
    assert.ok(p.question.endsWith('?'), `Passage ${p.id} question must end with '?'`);
    assert.ok(p.explanation.length > 20, `Passage ${p.id} explanation must be detailed`);

    // Validate distractor explanations for all 4 non-correct indices
    p.sentences.forEach((_, sIdx) => {
      if (sIdx !== p.correctAnswerIndex) {
        assert.ok(
          p.distractorExplanations[sIdx] && p.distractorExplanations[sIdx].length > 10,
          `Passage ${p.id} must have distractor explanation for sentence ${indexToLetter(sIdx)}`
        );
      }
    });
  });

  assert.equal(seenSubjects.size, 20, 'All 20 passages must have distinct academic subjects');
});

test('letter mapping helpers work accurately', () => {
  assert.equal(indexToLetter(0), 'A');
  assert.equal(indexToLetter(1), 'B');
  assert.equal(indexToLetter(2), 'C');
  assert.equal(indexToLetter(3), 'D');
  assert.equal(indexToLetter(4), 'E');
  assert.equal(letterToIndex('A'), 0);
  assert.equal(letterToIndex('C'), 2);
  assert.equal(letterToIndex('E'), 4);
});

test('validateAnswer evaluates selections accurately', () => {
  const p1 = PASSAGES[0];
  assert.equal(validateAnswer(p1, p1.correctAnswerIndex), true);
  assert.equal(validateAnswer(p1, 0), false);
  assert.equal(validateAnswer(p1, null), false);
});

test('calculateSessionStats calculates counts and percentages accurately', () => {
  const sampleAnswers: Record<number, UserAnswer> = {
    1: {
      passageId: 1,
      selectedSentenceIndex: PASSAGES[0].correctAnswerIndex,
      isSubmitted: true,
      isCorrect: true,
      timeSpentSeconds: 45,
      attemptsCount: 1,
    },
    2: {
      passageId: 2,
      selectedSentenceIndex: 0,
      isSubmitted: true,
      isCorrect: false,
      timeSpentSeconds: 30,
      attemptsCount: 1,
    },
  };

  const stats = calculateSessionStats(PASSAGES, sampleAnswers, 75);
  assert.equal(stats.totalQuestions, 20);
  assert.equal(stats.completedQuestions, 2);
  assert.equal(stats.correctCount, 1);
  assert.equal(stats.incorrectCount, 1);
  assert.equal(stats.accuracyPercentage, 5);
});
