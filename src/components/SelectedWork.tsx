import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { ArrowUpRight, BarChart3, Sparkles } from 'lucide-react';

export const SelectedWork: React.FC = () => {
  const { projects, siteConfig, openProjectModal } = usePortfolio();
  const [filter, setFilter] = useState<string>('ALL');

  const visibleProjects = projects.filter((p) => p.visible !== false);

  const categories = ['ALL', 'CONTENT & SOCIAL', 'INFOGRAPHIC & EDITORIAL', 'OWNED MEDIA', 'FAN ENGAGEMENT', 'STRATEGY'];

  const filteredProjects = visibleProjects.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'CONTENT & SOCIAL') return p.category.includes('CONTENT') || p.category.includes('SOCIAL');
    if (filter === 'INFOGRAPHIC & EDITORIAL') return p.category.includes('INFOGRAPHIC') || p.category.includes('EDITORIAL');
    if (filter === 'OWNED MEDIA') return p.category.includes('OWNED');
    if (filter === 'FAN ENGAGEMENT') return p.category.includes('FAN') || p.category.includes('OPERATION');
    if (filter === 'STRATEGY') return p.category.includes('STRATEGY') || p.category.includes('PRESENTATION');
    return true;
  });

  return (
    <section id="work" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E5E3DC]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#71716A] tracking-wider uppercase mb-2">
              {(() => {
                const rawTag = siteConfig.workSectionTag || '04 // SELECTED WORK & CASE STUDIES';
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
                    <span className="text-[#07732C] font-bold">04 //</span>
                    <span>{rawTag}</span>
                  </>
                );
              })()}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight whitespace-pre-line break-keep">
              {siteConfig.workSectionTitle || '실제 성과와 실행 과정으로 증명하는 프로젝트'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#555550] max-w-2xl whitespace-pre-line break-keep">
              {siteConfig.workSectionSub || '예쁜 결과물에 머물지 않고, 기획 의도와 팬들의 반응 지표를 함께 기록한 5가지 핵심 사례입니다.'}
            </p>
          </div>

          {/* Category Filter */}
          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#07732C] text-[#F4F3EF] font-bold shadow-xs'
                    : 'bg-[#E5E3DC] text-[#555550] hover:bg-[#D5D3CC] hover:text-[#07732C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Alternating Project Cards List */}
        <div className="space-y-16 lg:space-y-24">
          {filteredProjects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={project.id}
                id={`project-card-${project.id}`}
                className="group relative bg-[#FBFBFA] rounded-2xl border border-[#E5E3DC] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#07732C]/50 transition-all duration-300"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Visual Preview Side (Col span 7) */}
                  <div
                    onClick={() => openProjectModal(project.id)}
                    className={`lg:col-span-7 relative cursor-pointer overflow-hidden bg-[#111111] min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-40 transition-opacity"></div>

                    {/* Quick View Button Pill on Hover */}
                    <div className="absolute bottom-5 right-5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#07732C] text-[#F4F3EF] text-xs font-mono font-bold shadow-md">
                        <span>OPEN CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Project Number badge on top left */}
                    <div className="absolute top-5 left-5">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-black/70 backdrop-blur-md text-white font-mono font-black text-sm border border-white/20">
                        {project.order}
                      </span>
                    </div>
                  </div>

                  {/* Information & Case Study Copy Side (Col span 5) */}
                  <div
                    className={`lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      {/* Top Category & Order */}
                      <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E5E3DC]">
                        <span className="text-xs font-mono font-bold text-[#07732C] tracking-wider uppercase">
                          {project.category}
                        </span>
                        <span className="text-xs font-mono text-[#71716A]">
                          PROJECT {project.order}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => openProjectModal(project.id)}
                        className="mt-5 text-2xl sm:text-3xl font-extrabold text-[#111111] hover:text-[#07732C] cursor-pointer transition-colors leading-tight whitespace-pre-line break-keep"
                      >
                        {project.title}
                      </h3>

                      {/* Summary */}
                      <p className="mt-4 text-sm sm:text-base text-[#555550] leading-relaxed whitespace-pre-line break-keep">
                        {project.summary}
                      </p>

                      {/* Key Strategy Highlight */}
                      <div className="mt-5 p-3.5 rounded-lg bg-[#E8F4EC] border border-[#07732C]/20 text-xs text-[#222220] leading-relaxed whitespace-pre-line break-keep">
                        <span className="font-bold text-[#07732C] font-mono mr-1.5">[STRATEGY]</span>
                        {project.strategy}
                      </div>

                      {/* Numbers Grid */}
                      <div className="mt-6 grid grid-cols-2 gap-2.5">
                        {project.metrics.slice(0, 4).map((metric, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-[#EFECE6] border border-[#E5E3DC]"
                          >
                            <div className="font-heading font-black text-lg sm:text-xl text-[#111111] leading-none whitespace-pre-line">
                              {metric.value}
                            </div>
                            <div className="mt-1 text-[11px] font-mono text-[#555550] leading-tight truncate">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Action */}
                    <div className="mt-8 pt-5 border-t border-[#E5E3DC] flex items-center justify-between">
                      <button
                        onClick={() => openProjectModal(project.id)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#111111] text-[#F4F3EF] text-xs font-mono font-bold hover:bg-[#07732C] transition-colors group/btn shadow-xs cursor-pointer"
                      >
                        <span>READ FULL CASE STUDY</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
