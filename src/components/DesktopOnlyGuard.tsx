import React, { useState, useEffect } from 'react';
import { Monitor } from 'lucide-react';

interface DesktopOnlyGuardProps {
  children: React.ReactNode;
}

export const DesktopOnlyGuard: React.FC<DesktopOnlyGuardProps> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    window.addEventListener('orientationchange', checkWidth);

    return () => {
      window.removeEventListener('resize', checkWidth);
      window.removeEventListener('orientationchange', checkWidth);
    };
  }, []);

  return (
    <>
      {/* CSS-only fallback overlay for screens below 1024px */}
      <div className="fixed inset-0 z-50 bg-white text-black flex items-center justify-center p-6 text-center select-none lg:hidden">
        <div className="max-w-md space-y-4">
          <div className="flex justify-center">
            <Monitor className="w-10 h-10 text-black stroke-[1.5]" />
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-neutral-900 font-sans">
            Please use a desktop or laptop computer to access TOEFL SSP. This platform is designed for desktop use to provide the best examination experience.
          </p>
        </div>
      </div>

      {/* JavaScript state check render */}
      <div className={!isDesktop ? 'hidden' : 'w-full min-h-screen flex flex-col'}>
        {children}
      </div>
    </>
  );
};
