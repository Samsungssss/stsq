import React from 'react';
import { AlertCircle } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { MainCTA } from './MainCTA';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      maxWidthClass="max-w-2xl"
      title={
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-black" />
          <span className="text-black font-extrabold">Exam Disclaimer</span>
        </div>
      }
      footer={
        <MainCTA variant="primary" size="sm" onClick={onClose} iconPosition="left">
          Close
        </MainCTA>
      }
    >
      <div className="space-y-4 text-xs sm:text-sm text-black leading-relaxed font-sans">
        <section className="space-y-1">
          <h3 className="font-extrabold text-black text-sm">Independent Practice Resource</h3>
          <p className="text-neutral-700 font-medium">
            TOEFL SSP is an independent educational practice platform designed to help students improve reading comprehension and sentence selection skills. It is not affiliated with, endorsed by, or connected to Educational Testing Service (ETS).
          </p>
        </section>

        <section className="space-y-1">
          <h3 className="font-extrabold text-black text-sm">No Score Guarantee</h3>
          <p className="text-neutral-700 font-medium">
            While diligent practice with our 20 academic passages helps build reading proficiency, we make no guarantees regarding actual score results on official TOEFL® examinations.
          </p>
        </section>
      </div>
    </BottomSheet>
  );
};
