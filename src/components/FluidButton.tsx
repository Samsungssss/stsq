import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface FluidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const FluidButton: React.FC<FluidButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
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

  // Size styling
  const sizeStyles = {
    sm: 'h-9 px-4 text-xs font-semibold gap-1.5',
    md: 'h-11 px-6 text-sm font-semibold gap-2',
    lg: 'h-13 px-8 text-base font-bold gap-2.5',
  }[size];

  // Colors and fluid overlay styling
  const variantStyles = {
    primary: {
      base: 'bg-neutral-950 text-white border border-neutral-900 shadow-sm shadow-neutral-950/20',
      overlay: 'bg-white',
      firstTextColor: 'text-white',
      secondTextColor: 'text-neutral-950',
      border: 'border-neutral-900',
    },
    secondary: {
      base: 'bg-white text-neutral-900 border border-neutral-300 shadow-2xs hover:border-neutral-900',
      overlay: 'bg-neutral-950',
      firstTextColor: 'text-neutral-900',
      secondTextColor: 'text-white',
      border: 'border-neutral-300',
    },
    outline: {
      base: 'bg-white/80 backdrop-blur-sm text-neutral-800 border border-neutral-300/90 shadow-2xs hover:border-neutral-800',
      overlay: 'bg-neutral-900',
      firstTextColor: 'text-neutral-800',
      secondTextColor: 'text-white',
      border: 'border-neutral-300',
    },
    subtle: {
      base: 'bg-neutral-100/80 text-neutral-700 border border-neutral-200/80 hover:text-neutral-950 hover:border-neutral-300',
      overlay: 'bg-neutral-950',
      firstTextColor: 'text-neutral-700',
      secondTextColor: 'text-white',
      border: 'border-neutral-200',
    },
    accent: {
      base: 'bg-emerald-600 text-white border border-emerald-700 shadow-sm shadow-emerald-900/20',
      overlay: 'bg-neutral-950',
      firstTextColor: 'text-white',
      secondTextColor: 'text-white',
      border: 'border-emerald-700',
    },
    danger: {
      base: 'bg-rose-50 text-rose-700 border border-rose-200 hover:border-rose-300',
      overlay: 'bg-rose-600',
      firstTextColor: 'text-rose-700',
      secondTextColor: 'text-white',
      border: 'border-rose-200',
    },
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
          : { scale: 1.02, transition: { type: 'spring', stiffness: 450, damping: 25 } }
      }
      whileTap={
        isDisabled || shouldReduceMotion
          ? undefined
          : { scale: 0.98, transition: { duration: 0.1 } }
      }
      className={`
        relative inline-flex items-center justify-center select-none overflow-hidden rounded-full
        transition-colors outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2
        ${variantStyles.base}
        ${sizeStyles}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${isDisabled ? 'opacity-40 cursor-not-allowed shadow-none' : 'cursor-pointer'}
        ${className}
      `}
      {...(rest as any)}
    >
      {/* Liquid fluid bubble rising from bottom on hover */}
      {!isDisabled && (
        <motion.span
          aria-hidden="true"
          className={`absolute left-0 right-0 w-full pointer-events-none rounded-[50%_50%_0_0] ${variantStyles.overlay}`}
          initial={{ bottom: '-100%', height: '140%', borderTopLeftRadius: '50%', borderTopRightRadius: '50%' }}
          animate={
            isHovered
              ? {
                  bottom: '0%',
                  height: '100%',
                  borderTopLeftRadius: '0%',
                  borderTopRightRadius: '0%',
                }
              : {
                  bottom: '-120%',
                  height: '140%',
                  borderTopLeftRadius: '50%',
                  borderTopRightRadius: '50%',
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0.15 : 0.35,
            ease: [0.4, 0, 0, 1],
          }}
        />
      )}

      {/* Button Content with smooth text displacement / color transition */}
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none font-medium tracking-tight">
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span
                className={`transition-colors duration-200 ${
                  isHovered && !isDisabled ? variantStyles.secondTextColor : variantStyles.firstTextColor
                }`}
              >
                {icon}
              </span>
            )}

            {/* Rolling or shifting text */}
            <span className="relative overflow-hidden inline-flex flex-col h-[1.25em] leading-[1.25em]">
              <span
                className={`block transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0,1)] ${
                  isHovered && !isDisabled && !shouldReduceMotion ? '-translate-y-full' : 'translate-y-0'
                } ${isHovered && !isDisabled ? variantStyles.secondTextColor : variantStyles.firstTextColor}`}
              >
                {children}
              </span>
              {!shouldReduceMotion && (
                <span
                  aria-hidden="true"
                  className={`absolute top-0 left-0 block transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0,1)] ${
                    isHovered && !isDisabled ? 'translate-y-0' : 'translate-y-full'
                  } ${variantStyles.secondTextColor}`}
                >
                  {children}
                </span>
              )}
            </span>

            {icon && iconPosition === 'right' && (
              <span
                className={`transition-colors duration-200 ${
                  isHovered && !isDisabled ? variantStyles.secondTextColor : variantStyles.firstTextColor
                }`}
              >
                {icon}
              </span>
            )}
          </>
        )}
      </span>
    </motion.button>
  );
};
