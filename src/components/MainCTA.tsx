import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Loader2 } from 'lucide-react';

export interface MainCTAProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const MainCTA: React.FC<MainCTAProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  isLoading = false,
  fullWidth = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const sizeStyles = {
    sm: 'h-9 px-4 text-xs font-semibold gap-2',
    md: 'h-11 px-6 text-sm font-bold gap-2.5',
    lg: 'h-13 px-8 text-base font-extrabold gap-3',
  }[size];

  const variantStyles = {
    primary: 'bg-white text-black shadow-md hover:bg-neutral-200 border border-white/20 font-bold',
    secondary: 'bg-white/10 text-white border border-white/20 shadow-xs hover:bg-white/20 font-bold',
    outline: 'bg-transparent text-white border border-white/30 shadow-2xs hover:bg-white/10 hover:border-white font-bold',
    subtle: 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/15 font-bold',
    accent: 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/30 hover:bg-emerald-500 border border-emerald-400 font-bold',
    danger: 'bg-rose-600 text-white shadow-sm shadow-rose-900/30 hover:bg-rose-500 border border-rose-400 font-bold',
  }[variant];

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => !isDisabled && setIsHovered(false)}
      onFocus={() => !isDisabled && setIsHovered(true)}
      onBlur={() => !isDisabled && setIsHovered(false)}
      whileHover={
        isDisabled || shouldReduceMotion
          ? undefined
          : { scale: 1.02, y: -1, transition: { type: 'spring', stiffness: 400, damping: 25 } }
      }
      whileTap={
        isDisabled || shouldReduceMotion
          ? undefined
          : { scale: 0.97, y: 0, transition: { duration: 0.08 } }
      }
      className={`
        relative inline-flex items-center justify-center select-none overflow-hidden rounded-full
        transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
        ${variantStyles}
        ${sizeStyles}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${isDisabled ? 'opacity-40 cursor-not-allowed shadow-none' : 'cursor-pointer'}
        ${className}
      `}
      {...(rest as any)}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none font-bold tracking-tight">
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin shrink-0" />
            <span>Loading...</span>
          </span>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="shrink-0 transition-transform duration-200">{icon}</span>
            )}

            <span className="whitespace-nowrap">{children}</span>

            {iconPosition === 'right' && (
              <motion.span
                className="shrink-0 inline-flex items-center"
                animate={isHovered && !isDisabled && !shouldReduceMotion ? { x: 3 } : { x: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {icon || <ArrowRight className="h-4 w-4" />}
              </motion.span>
            )}
          </>
        )}
      </span>
    </motion.button>
  );
};

export const PixelButton = MainCTA;
export const FluidButton = MainCTA;
