import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceTimeline: React.FC = () => {
  const { experience, siteConfig } = usePortfolio();

  return (
    <section id="experience" className="py-20 bg-[#ECEAE3] border-y border-[#DCDAD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#71716A] tracking-wider uppercase mb-2">
            {(() => {
              const rawTag = siteConfig.experienceSectionTag || '03 // EXPERIENCE & TRACK RECORD';
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
                  <span className="text-[#07732C] font-bold">03 //</span>
                  <span>{rawTag}</span>
                </>
              );
            })()}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight whitespace-pre-line break-keep">
            {siteConfig.experienceSectionTitle || '실무 및 조직 총괄 타임라인'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#555550] max-w-2xl whitespace-pre-line break-keep">
            {siteConfig.experienceSectionSub || '단순한 보조가 아닌, 기획부터 실행·성과 측정까지 주도한 실무 이력입니다.'}
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-4">
          {experience.map((item, idx) => (
            <div
              key={item.id}
              id={`exp-timeline-item-${idx}`}
              className="bg-[#F8F7F3] rounded-xl border border-[#D8D5CC] p-5 sm:p-7 transition-all duration-200 hover:border-[#07732C] hover:shadow-xs group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                
                {/* Left: Period & Title */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#07732C] tracking-wide">
                      {item.period}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F4EC] text-[#07732C] border border-[#07732C]/20">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#111111] tracking-tight group-hover:text-[#07732C] transition-colors whitespace-pre-line break-keep">
                    {item.title}
                  </h3>
                </div>

                {/* Right: Role & Description */}
                <div className="lg:w-2/3 lg:pl-6 lg:border-l border-[#E5E3DC]">
                  <div className="font-bold text-sm sm:text-base text-[#07732C] whitespace-pre-line break-keep">
                    {item.role}
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#555550] leading-relaxed whitespace-pre-line break-keep">
                    {item.description}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
