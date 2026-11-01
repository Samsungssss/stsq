import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { MainCTA } from './MainCTA';

interface TermsOfUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfUseModal: React.FC<TermsOfUseModalProps> = ({
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
          <ShieldCheck className="w-5 h-5 text-black" />
          <span className="text-black font-extrabold">Terms of Use & Legal Notices</span>
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
          <h3 className="font-extrabold text-black text-sm">1. Educational Practice Purposes</h3>
          <p className="text-neutral-700 font-medium">
            This website is provided exclusively as a free, independent practice resource for study and academic preparation.
          </p>
        </section>

        <section className="space-y-1">
          <h3 className="font-extrabold text-black text-sm">2. Non-Affiliation Disclaimer</h3>
          <p className="text-neutral-700 font-medium">
            TOEFL® is a registered trademark of Educational Testing Service (ETS). This website is an independent educational practice resource developed by Sekandar Samadi and is not endorsed or approved by ETS.
          </p>
        </section>

        <section className="space-y-1">
          <h3 className="font-extrabold text-black text-sm">3. Intellectual Property & Original Content</h3>
          <p className="text-neutral-700 font-medium">
            All original website design, code, written academic reading passages, practice questions, and educational explanations created for this platform are protected by applicable intellectual property laws.
          </p>
        </section>

        <section className="space-y-1">
          <h3 className="font-extrabold text-black text-sm">4. Third-Party Trademarks & Assets</h3>
          <p className="text-neutral-700 font-medium">
            All third-party trademarks and product names referenced herein remain the property of their respective owners. No claim of ownership is made over third-party trademarks or external libraries.
          </p>
        </section>

        <section className="space-y-1">
          <h3 className="font-extrabold text-black text-sm">5. No Guarantee of Exam Outcomes</h3>
          <p className="text-neutral-700 font-medium">
            No representation or guarantee is made regarding actual score performance on official TOEFL® examinations.
          </p>
        </section>

        <section className="space-y-1 pt-3 border-t border-neutral-200">
          <p className="text-neutral-600 text-xs font-semibold">
            Created and maintained by <strong>Sekandar Samadi</strong>. &copy; 2026 Sekandar Samadi. All rights reserved.
          </p>
        </section>
      </div>
    </BottomSheet>
  );
};
