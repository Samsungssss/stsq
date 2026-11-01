import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export interface SmartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  showArrow?: boolean;
}

export const SmartButton: React.FC<SmartButtonProps> = ({
  children,
  showArrow = true,
  className = '',
  disabled = false,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1f2937] px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#374151] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f2937] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      <span>{children}</span>
      {showArrow && <ArrowRight data-icon="inline-end" aria-hidden="true" />}
    </button>
  );
};
