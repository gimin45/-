import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Phone, FileText, Check, Copy, ArrowUpRight, Shield } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { siteConfig, openResumeModal, openAdminModal, isAdminAuthenticated } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#111111] text-[#F4F3EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag */}
        <div className="mb-10 flex items-center justify-between border-b border-[#2A2A2A] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#888880] tracking-wider uppercase">
            {(() => {
              const rawTag = siteConfig.contactSectionTag || '05 // GET IN TOUCH · CONTACT & ARCHIVE';
              if (rawTag.includes('//')) {
                const parts = rawTag.split('//');
                const prefix = parts[0].trim();
                const suffix = parts.slice(1).join('//').trim();
                return (
                  <>
                    {prefix && <span className="text-[#07732C] font-bold">{prefix} //</span>}
                    <span>{suffix}</span>
                  </>
                );
              }
              return (
                <>
                  <span className="text-[#07732C] font-bold">05 //</span>
                  <span>{rawTag}</span>
                </>
              );
            })()}
          </div>
          <a
            href="#top"
            className="text-xs font-mono text-[#888880] hover:text-[#4ade80] transition-colors flex items-center gap-1"
          >
            <span>{siteConfig.footerBackToTopText || 'BACK TO TOP ↑'}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-[#F4F3EF] tracking-tight leading-tight whitespace-pre-line break-keep">
              {siteConfig.contactHeadline}
            </h2>
            <p className="text-base sm:text-lg text-[#A0A09A] leading-relaxed max-w-xl whitespace-pre-line break-keep">
              {siteConfig.contactSub}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#07732C] text-white font-mono font-bold text-sm hover:bg-[#055822] transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>SEND EMAIL</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-[#222222] text-[#E0E0DA] font-mono text-sm hover:bg-[#333333] transition-colors border border-[#333333] cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#4ade80]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'EMAIL COPIED!' : siteConfig.email}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Direct Channels & Actions */}
          <div className="lg:col-span-5 bg-[#1A1A1A] p-6 sm:p-8 rounded-2xl border border-[#2E2E2E] space-y-4">
            
            <h3 className="text-xs font-mono text-[#888880] tracking-widest uppercase mb-4">
              DIRECT LINKS & MATERIALS
            </h3>

            {/* Email link item */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center justify-between p-4 rounded-xl bg-[#242424] hover:bg-[#2D2D2D] transition-colors border border-[#333333] group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#07732C]/20 text-[#4ade80] border border-[#07732C]/40">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#888880]">EMAIL</div>
                  <div className="font-bold text-sm text-[#F4F3EF]">{siteConfig.email}</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#888880] group-hover:text-[#4ade80] transition-colors" />
            </a>

            {/* Phone link item */}
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-between p-4 rounded-xl bg-[#242424] hover:bg-[#2D2D2D] transition-colors border border-[#333333] group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#333333] text-[#60a5fa]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#888880]">PHONE</div>
                  <div className="font-bold text-sm text-[#F4F3EF]">{siteConfig.phone}</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#888880] group-hover:text-white transition-colors" />
            </a>

            {/* Resume button item */}
            <button
              onClick={openResumeModal}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-[#242424] hover:bg-[#2D2D2D] transition-colors border border-[#333333] group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#333333] text-[#fcd34d]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#888880]">RESUME / CV</div>
                  <div className="font-bold text-sm text-[#F4F3EF]">이력서 상세 보기</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#888880] group-hover:text-white transition-colors" />
            </button>

          </div>

        </div>

        {/* Footer info bar */}
        <div className="mt-16 pt-8 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#666660]">
          <div>
            © 2026 HONG GIMIN. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={openAdminModal}
              className="flex items-center gap-1.5 hover:text-[#4ade80] transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#07732C]" />
              <span>ADMIN CMS</span>
            </button>
            <span>·</span>
            <span>SPORTS CONTENT MARKETER</span>
          </div>
        </div>

      </div>
    </section>
  );
};
