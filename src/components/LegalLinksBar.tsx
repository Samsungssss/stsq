import React, { useState } from 'react';
import { TermsOfUseModal } from './TermsOfUseModal';
import { TrademarkModal } from './TrademarkModal';
import { DisclaimerModal } from './DisclaimerModal';

export const LegalLinksBar: React.FC = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isTrademarkOpen, setIsTrademarkOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  return (
    <div className="py-4 flex items-center gap-3 text-[11px] font-mono text-neutral-500">
      <button
        onClick={() => setIsTermsOpen(true)}
        className="hover:text-black transition-colors cursor-pointer underline underline-offset-2"
      >
        Terms of Use
      </button>
      <span>•</span>
      <button
        onClick={() => setIsTrademarkOpen(true)}
        className="hover:text-black transition-colors cursor-pointer underline underline-offset-2"
      >
        Trademark Information
      </button>
      <span>•</span>
      <button
        onClick={() => setIsDisclaimerOpen(true)}
        className="hover:text-black transition-colors cursor-pointer underline underline-offset-2"
      >
        Disclaimer
      </button>

      <TermsOfUseModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
      <TrademarkModal
        isOpen={isTrademarkOpen}
        onClose={() => setIsTrademarkOpen(false)}
      />
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />
    </div>
  );
};
