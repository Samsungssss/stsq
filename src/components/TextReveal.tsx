import React, { useMemo } from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';

export interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  split?: 'words' | 'lines' | 'characters';
  effect?: 'rise' | 'blur' | 'fade' | 'mask';
  duration?: number;
  stagger?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  as: Component = 'div',
  split = 'words',
  effect = 'rise',
  duration = 0.5,
  stagger = 0.03,
  delay = 0,
  className = '',
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const rawText = children || '';

  const words = useMemo(() => {
    if (!rawText) return [];
    if (split === 'lines') {
      return rawText.split('\n').filter(Boolean);
    }
    return rawText.split(' ').filter(Boolean);
  }, [rawText, split]);

  if (shouldReduceMotion) {
    return <Component className={className}>{rawText}</Component>;
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    rise: {
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: EASE },
      },
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(6px)' },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration, ease: EASE },
      },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration, ease: EASE },
      },
    },
    mask: {
      hidden: { opacity: 0, y: '100%' },
      visible: {
        opacity: 1,
        y: '0%',
        transition: { duration, ease: EASE },
      },
    },
  }[effect];

  return (
    <Component className={className} aria-label={rawText}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.1 }}
        className="inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.1em]"
      >
        {words.map((word, idx) => (
          <span
            key={idx}
            className={effect === 'mask' ? 'overflow-hidden inline-block' : 'inline-block'}
          >
            <motion.span variants={itemVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
};
