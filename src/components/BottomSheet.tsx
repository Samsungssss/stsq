import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidthClass?: string;
  preventClose?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidthClass = 'max-w-2xl',
  preventClose = false,
}) => {
  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !preventClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, preventClose]);

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end pointer-events-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => !preventClose && onClose()}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs -z-10"
            aria-hidden="true"
          />

          {/* Bottom Sheet Container — Attached directly to bottom edge with top-rounded corners only */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className={`w-full ${maxWidthClass} mx-auto bg-white/95 backdrop-blur-2xl border-t border-neutral-200/90 rounded-t-2xl shadow-2xl flex flex-col max-h-[92dvh] h-auto overflow-hidden text-[#000000]`}
            role="dialog"
            aria-modal="true"
          >
            {/* Drag handle pill */}
            <div className="w-full flex justify-center pt-2.5 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-neutral-300" />
            </div>

            {/* Sheet Header */}
            {title && (
              <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200/80 shrink-0">
                <div className="font-extrabold text-sm sm:text-base text-[#000000] tracking-tight">
                  {title}
                </div>
                {!preventClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1 rounded-full text-neutral-600 hover:text-[#000000] hover:bg-neutral-100 transition-colors cursor-pointer"
                    aria-label="Close bottom sheet"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Scrollable Sheet Content */}
            <div className="p-4 sm:p-5 overflow-y-auto min-h-0 flex-1 space-y-3.5 text-xs sm:text-sm text-[#000000] leading-relaxed font-sans">
              {children}
            </div>

            {/* Optional Sheet Footer */}
            {footer && (
              <div className="p-3 sm:p-4 border-t border-neutral-200/80 bg-neutral-50/80 flex items-center justify-end gap-2 shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
