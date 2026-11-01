import React from 'react';
import { AlertCircle } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { MainCTA } from './MainCTA';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false,
}) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onCancel}
      maxWidthClass="max-w-lg"
      title={
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              isDestructive
                ? 'bg-rose-100 text-rose-700 border border-rose-300'
                : 'bg-neutral-100 text-[#000000] border border-neutral-300'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
          </div>
          <span className="text-[#000000] font-extrabold">{title}</span>
        </div>
      }
      footer={
        <div className="flex items-center gap-2.5">
          <MainCTA variant="outline" size="sm" onClick={onCancel} iconPosition="left">
            {cancelLabel}
          </MainCTA>
          <MainCTA
            variant={isDestructive ? 'danger' : 'primary'}
            size="sm"
            onClick={onConfirm}
            iconPosition="right"
          >
            {confirmLabel}
          </MainCTA>
        </div>
      }
    >
      <p className="text-xs sm:text-sm text-[#000000] leading-relaxed font-sans font-medium">
        {message}
      </p>
    </BottomSheet>
  );
};
