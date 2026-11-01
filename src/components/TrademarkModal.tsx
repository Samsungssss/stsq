import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { MainCTA } from './MainCTA';

interface TrademarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrademarkModal: React.FC<TrademarkModalProps> = ({
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
          <ShieldAlert className="w-5 h-5 text-black" />
          <span className="text-black font-extrabold">Trademark Information</span>
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
          <h3 className="font-extrabold text-black text-sm">TOEFL® Trademark Notice</h3>
          <p className="text-neutral-700 font-medium">
            TOEFL® is a registered trademark of Educational Testing Service (ETS) in the United States and other countries.
          </p>
        </section>

        <section className="space-y-1">
          <h3 className="font-extrabold text-black text-sm">Independent Educational Resource</h3>
          <p className="text-neutral-700 font-medium">
            This platform (TOEFL SSP) is an independent educational practice resource developed by Sekandar Samadi. It is not endorsed, sponsored, or approved by ETS.
          </p>
        </section>

        <section className="space-y-1">
          <h3 className="font-extrabold text-black text-sm">Third-Party Rights</h3>
          <p className="text-neutral-700 font-medium">
            All other product names, logos, and brands are property of their respective owners. All use of these names, logos, and brands is for identification purposes only and does not imply endorsement.
          </p>
        </section>

        <section className="space-y-1 pt-3 border-t border-neutral-200">
          <p className="text-neutral-600 text-xs font-semibold">
            &copy; 2026 Sekandar Samadi. All rights reserved.
          </p>
        </section>
      </div>
    </BottomSheet>
  );
};
