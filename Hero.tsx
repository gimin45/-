import React from 'react';
import { DeferredImage } from './DeferredImage';
import { usePortfolio } from '../context/PortfolioContext';
import { DEFAULT_SITE_CONFIG } from '../data/defaultData';
import { ArrowDownRight, Eye, Share2, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const Hero: React.FC = () => {
  const { siteConfig, openProjectModal } = usePortfolio();

  const heroVisuals = {
    main: { ...DEFAULT_SITE_CONFIG.heroVisuals.main, ...(siteConfig.heroVisuals?.main || {}) },
    sub1: { ...DEFAULT_SITE_CONFIG.heroVisuals.sub1, ...(siteConfig.heroVisuals?.sub1 || {}) },
    sub2: { ...DEFAULT_SITE_CONFIG.heroVisuals.sub2, ...(siteConfig.heroVisuals?.sub2 || {}) },
  };

  return (
    <section id="top" className="pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag & Identity */}
        <div className="flex flex-col items-start mb-6">
          <div
            id="hero-role-pill"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F4EC] border border-[#07732C]/30 text-[#07732C] text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#07732C] animate-pulse"></span>
            {siteConfig.roleTitle}
          </div>

          {/* Main Headline */}
          <h1
            id="hero-main-headline"
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] leading-[1.15] tracking-tight max-w-4xl whitespace-pre-line break-keep"
          >
            {siteConfig.heroHeadline}
          </h1>

          {/* Sub Headline */}
          <p
            id="hero-sub-description"
            className="mt-6 text-base sm:text-lg text-[#555550] leading-relaxed max-w-4xl lg:max-w-5xl font-normal whitespace-pre-line break-keep"
          >
            {siteConfig.heroSubHeadline}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              id="hero-cta-work"
              href={siteConfig.heroCtaWorkHref || '#work'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#07732C] text-[#F4F3EF] text-sm font-mono font-bold hover:bg-[#055822] transition-all duration-200 group shadow-md"
            >
              <span>{siteConfig.heroCtaWorkText || 'SELECTED WORK'}</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              id="hero-cta-about"
              href={siteConfig.heroCtaAboutHref || '#profile'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#E5E3DC] text-[#111111] text-sm font-mono font-bold hover:bg-[#D5D3CC] hover:text-[#07732C] transition-all duration-200"
            >
              <span>{siteConfig.heroCtaAboutText || 'ABOUT ME'}</span>
            </a>
          </div>
        </div>

        {/* 3-Image Composition Section */}
        {/* Exact Layout: Left Sub 1 (Workshop 07), Middle Large (WBC Seats), Right/Bottom Sub 2 (Fanpage) */}
        <div id="highlights" className="mt-14 pt-8 border-t border-[#E5E3DC] scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#71716A] tracking-wider uppercase">
              {(() => {
                const rawTag = siteConfig.heroSectionTag || siteConfig.heroCategoryTag || '01 // HIGHLIGHTS · SPORTS CONTENT & CREATIVE STRATEGY';
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
                    <span className="text-[#07732C] font-bold">01 //</span>
                    <span>{rawTag}</span>
                  </>
                );
              })()}
            </div>
            <span className="text-xs font-mono text-[#71716A] hidden sm:inline">
              공식 미디어 · 전문 칼럼 인포그래픽 · 개인 채널
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Sub Image 1: Baseball Workshop #7 (lg:col-span-4) */}
            <div
              id="hero-visual-workshop"
              onClick={() => openProjectModal(heroVisuals.sub1.projectId || 'baseball-workshop')}
              className="lg:col-span-4 group relative cursor-pointer overflow-hidden rounded-xl border border-[#E5E3DC] bg-[#111111] transition-all duration-300 hover:border-[#07732C] hover:shadow-lg flex flex-col"
            >
              <div className="relative aspect-4/3 sm:aspect-1/1 lg:aspect-auto lg:h-[300px] w-full overflow-hidden bg-[#161b22]">
                <DeferredImage
                  src={heroVisuals.sub1.url}
                  alt={heroVisuals.sub1.label}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  optimizeWidth={900}
                  sizes="(min-width: 1024px) 34vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              <div className="p-5 bg-[#161b22] text-[#F4F3EF] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#07732C] text-white">
                      {heroVisuals.sub1.badge || 'EDITORIAL'}
                    </span>
                    <span className="text-xs font-mono text-[#8b949e]">
                      {heroVisuals.sub1.subTag || '야구공작소 #07'}
                    </span>
                  </div>
                  <h2 className="font-bold text-base text-white group-hover:text-[#4ade80] transition-colors leading-snug whitespace-pre-line break-keep">
                    {heroVisuals.sub1.label || '야구공작소 07번 대표작'}
                  </h2>
                  <p className="mt-1 text-xs text-[#8b949e] whitespace-pre-line break-keep">
                    {heroVisuals.sub1.description || '복잡한 세부 지표의 직관적 시각화 원칙'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#30363d] flex items-center justify-between text-xs font-mono text-[#8b949e]">
                  <span className="text-[#4ade80] font-bold">
                    {heroVisuals.sub1.metricBadge || 'CASE STUDY'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#4ade80] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Largest Main Image: WBC Seating Content (lg:col-span-5) */}
            <div
              id="hero-visual-main-wbc"
              onClick={() => openProjectModal(heroVisuals.main.projectId || 'fieldclub')}
              className="lg:col-span-5 group relative cursor-pointer overflow-hidden rounded-xl border-2 border-[#07732C] bg-[#090d16] transition-all duration-300 hover:shadow-2xl flex flex-col"
            >
              <div className="relative aspect-4/3 sm:aspect-1/1 lg:aspect-auto lg:h-[300px] w-full overflow-hidden bg-[#0f172a]">
                <DeferredImage
                  src={heroVisuals.main.url}
                  alt={heroVisuals.main.label}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  optimizeWidth={1100}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
                {/* Overlay badge */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#07732C] text-white text-xs font-mono font-bold shadow-md border border-[#4ade80]/50">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></span>
                    <span>{heroVisuals.main.metricBadge || '327,742 VIEWS'}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              </div>

              <div className="p-5 sm:p-6 bg-[#0f172a] text-[#F4F3EF] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1e3a8a] text-[#93c5fd]">
                      {heroVisuals.main.badge || 'OFFICIAL MEDIA'}
                    </span>
                    <span className="text-xs font-mono text-[#38bdf8]">
                      {heroVisuals.main.subTag || '일간스포츠 필드클럽'}
                    </span>
                  </div>
                  <h2 className="font-extrabold text-lg sm:text-xl text-white group-hover:text-[#38bdf8] transition-colors leading-snug whitespace-pre-line break-keep">
                    {heroVisuals.main.label || '일간스포츠 WBC 좌석 콘텐츠'}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-[#94a3b8] whitespace-pre-line break-keep">
                    {heroVisuals.main.description || '팬이 즉각 선택하고 토론하는 1인칭 참여형 포맷 기획'}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1e293b] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#94a3b8]">
                    <span className="flex items-center gap-1 text-[#38bdf8]">
                      <Eye className="w-3.5 h-3.5" /> {heroVisuals.main.viewsCount || '327K'}
                    </span>
                    <span className="flex items-center gap-1 text-[#4ade80]">
                      <Share2 className="w-3.5 h-3.5" /> {heroVisuals.main.sharesCount || '7.1K'}
                    </span>
                    <span className="flex items-center gap-1 text-[#f43f5e]">
                      <Heart className="w-3.5 h-3.5" /> {heroVisuals.main.likesCount || '6.4K'}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#38bdf8] group-hover:underline flex items-center gap-1">
                    {heroVisuals.main.linkText || 'VIEW DETAILS ↗'}
                  </span>
                </div>
              </div>
            </div>

            {/* Sub Image 2: Fanpage (todaybluewave) (lg:col-span-3) */}
            <div
              id="hero-visual-fanpage"
              onClick={() => openProjectModal(heroVisuals.sub2.projectId || 'fanpage')}
              className="lg:col-span-3 group relative cursor-pointer overflow-hidden rounded-xl border border-[#E5E3DC] bg-[#0b1b3d] transition-all duration-300 hover:border-[#07732C] hover:shadow-lg flex flex-col"
            >
              <div className="relative aspect-4/3 sm:aspect-1/1 lg:aspect-auto lg:h-[300px] w-full overflow-hidden bg-[#0b1b3d]">
                <DeferredImage
                  src={heroVisuals.sub2.url}
                  alt={heroVisuals.sub2.label}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  optimizeWidth={800}
                  sizes="(min-width: 1024px) 25vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              <div className="p-5 bg-[#0b1b3d] text-[#F4F3EF] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1d4ed8] text-white">
                      {heroVisuals.sub2.badge || 'OWNED SNS'}
                    </span>
                    <span className="text-xs font-mono text-[#93c5fd]">
                      {heroVisuals.sub2.subTag || 'todaybluewave'}
                    </span>
                  </div>
                  <h2 className="font-bold text-base text-white group-hover:text-[#60a5fa] transition-colors leading-snug whitespace-pre-line break-keep">
                    {heroVisuals.sub2.label || 'todaybluewave 팬페이지'}
                  </h2>
                  <p className="mt-1 text-xs text-[#93c5fd]/80 whitespace-pre-line break-keep">
                    {heroVisuals.sub2.description || '1인 기획·제작·운영 및 게시물별 데이터 로깅'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#1e40af]/50 flex items-center justify-between text-xs font-mono text-[#93c5fd]">
                  <span>{heroVisuals.sub2.metricBadge || '5,456 MAX VIEWS'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#60a5fa] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
