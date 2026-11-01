import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { FluidButton } from './FluidButton';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                isDestructive
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-neutral-100 text-neutral-800'
              }`}
            >
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3
              id="modal-title"
              className="text-base font-bold text-neutral-900"
            >
              {title}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-neutral-600 leading-relaxed">{message}</p>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100">
          <FluidButton
            variant="outline"
            size="sm"
            onClick={onCancel}
          >
            {cancelLabel}
          </FluidButton>
          <FluidButton
            variant={isDestructive ? 'danger' : 'primary'}
            size="sm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </FluidButton>
        </div>
      </div>
    </div>
  );
};
