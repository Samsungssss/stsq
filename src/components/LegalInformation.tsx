import React from 'react';
import { SmartButton } from './SmartButton';

interface LegalInformationProps {
  onBack: () => void;
}

export const LegalInformation: React.FC<LegalInformationProps> = ({ onBack }) => (
  <main className="min-h-screen bg-white px-8 py-12 text-black lg:px-16">
    <article className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-[820px] flex-col font-reading">
      <div className="flex-1">
        <h1 className="mb-10 text-3xl font-semibold tracking-tight">Legal Information</h1>

        <section className="flex flex-col gap-8 text-[16px] leading-8">
          <div>
            <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.16em]">Terms of Use</h2>
            <p>TOEFL SSP is provided for individual educational practice. By using this platform, you agree to use its materials lawfully and not to reproduce, distribute, sell, or misrepresent the service or its content without permission.</p>
          </div>
          <div>
            <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.16em]">Disclaimer</h2>
            <p>This platform is provided for practice and educational purposes only. Scores, explanations, and exercises are not official TOEFL results and do not guarantee performance on any examination.</p>
          </div>
          <div>
            <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.16em]">ETS Trademark Information</h2>
            <p>TOEFL® is a registered trademark of Educational Testing Service (ETS). TOEFL SSP is an independent educational practice resource and is not affiliated with, endorsed by, sponsored by, or approved by ETS.</p>
          </div>
          <div>
            <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.16em]">Independent Platform Affiliation Statement</h2>
            <p>TOEFL SSP is independently developed and operated. No relationship with ETS should be inferred beyond the trademark identification stated above.</p>
          </div>
          <div>
            <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.16em]">Intellectual Property and Rights of Use</h2>
            <p>All platform design, original text, explanations, software, and other materials are protected by applicable intellectual property laws. You may access the materials for personal, non-commercial study only.</p>
          </div>
          <div>
            <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.16em]">Copyright and Ownership</h2>
            <p>© 2026 Sekandar Samadi. All rights reserved. Unauthorized copying, adaptation, public display, or commercial use of platform materials is prohibited.</p>
          </div>
        </section>
      </div>

      <div className="flex justify-center pt-12">
        <SmartButton type="button" onClick={onBack} showArrow={false}>Back</SmartButton>
      </div>
    </article>
  </main>
);
