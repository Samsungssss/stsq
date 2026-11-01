import React, { useState } from 'react';
import { TermsOfUseModal } from './TermsOfUseModal';
import { TrademarkModal } from './TrademarkModal';

export const Footer: React.FC = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isTrademarkOpen, setIsTrademarkOpen] = useState(false);

  return (
    <footer className="w-full border-t border-neutral-200 bg-white py-4 px-4 sm:px-6 text-black font-sans text-xs select-none">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-neutral-600 font-medium text-center sm:text-left">
          &copy; 2026 Sekandar Samadi. All rights reserved.
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsTermsOpen(true)}
            className="text-xs font-semibold text-black hover:underline underline-offset-2 transition-colors cursor-pointer"
          >
            Terms of Use
          </button>
          <span className="text-neutral-300">•</span>
          <button
            onClick={() => setIsTrademarkOpen(true)}
            className="text-xs font-semibold text-black hover:underline underline-offset-2 transition-colors cursor-pointer"
          >
            Trademark Information
          </button>
        </div>
      </div>

      <TermsOfUseModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      <TrademarkModal
        isOpen={isTrademarkOpen}
        onClose={() => setIsTrademarkOpen(false)}
      />
    </footer>
  );
};
