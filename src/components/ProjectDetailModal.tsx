import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Share2,
  Heart,
  MessageSquare,
  Sparkles,
  Layers,
  ArrowUpRight,
  Maximize2,
} from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const {
    selectedProject,
    selectedProjectId,
    closeProjectModal,
    openProjectModal,
    projects,
    openLightbox,
  } = usePortfolio();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  if (!selectedProject) return null;

  const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div
      id="project-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex justify-center p-0 sm:p-4 lg:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeProjectModal();
      }}
    >
      <div
        id="project-detail-modal-container"
        className="relative w-full max-w-5xl bg-[#F4F3EF] sm:rounded-2xl shadow-2xl border border-[#DCDAD2] overflow-hidden my-auto min-h-screen sm:min-h-0 sm:max-h-[92vh] flex flex-col"
      >
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-[#F4F3EF]/95 backdrop-blur-md border-b border-[#E5E3DC] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#07732C] text-white font-mono font-bold text-xs shadow-xs">
              {selectedProject.order}
            </span>
            <div>
              <span className="text-xs font-mono font-bold text-[#07732C] uppercase tracking-wider block">
                {selectedProject.category}
              </span>
              <span className="text-xs font-mono text-[#71716A] hidden sm:inline">
                PROJECT CASE STUDY
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next controls */}
            <div className="hidden sm:flex items-center gap-1 mr-2 border-r border-[#E5E3DC] pr-3">
              <button
                disabled={!prevProject}
                onClick={() => prevProject && openProjectModal(prevProject.id)}
                className={`p-1.5 rounded-md text-xs font-mono ${
                  prevProject
                    ? 'hover:bg-[#E5E3DC] text-[#111111]'
                    : 'text-[#AAAAAA] cursor-not-allowed'
                }`}
                title={prevProject ? `이전: ${prevProject.title}` : '첫 번째 프로젝트'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={!nextProject}
                onClick={() => nextProject && openProjectModal(nextProject.id)}
                className={`p-1.5 rounded-md text-xs font-mono ${
                  nextProject
                    ? 'hover:bg-[#E5E3DC] text-[#111111]'
                    : 'text-[#AAAAAA] cursor-not-allowed'
                }`}
                title={nextProject ? `다음: ${nextProject.title}` : '마지막 프로젝트'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              id="close-project-modal-btn"
              onClick={closeProjectModal}
              className="p-2 rounded-full bg-[#E5E3DC] text-[#111111] hover:bg-[#07732C] hover:text-white transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-6 sm:px-10 lg:px-12 py-8 space-y-12 flex-1">
          
          {/* Header Title Section */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-tight whitespace-pre-line break-keep">
              {selectedProject.title}
            </h1>
            <p className="mt-4 text-base sm:text-xl text-[#555550] leading-relaxed max-w-3xl font-normal whitespace-pre-line break-keep">
              {selectedProject.summary}
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-[#E8F4EC] border border-[#07732C]/20 shadow-xs">
            {selectedProject.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col justify-between">
                <div className="font-heading font-black text-2xl sm:text-3xl text-[#07732C] whitespace-pre-line">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs font-mono text-[#444440]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Main Hero Visual in Case Study */}
          <div className="rounded-2xl overflow-hidden border border-[#E5E3DC] bg-[#111111] relative group">
            <img
              src={selectedProject.coverImage}
              alt={selectedProject.title}
              className="w-full max-h-[560px] object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => openLightbox(selectedProject.coverImage, selectedProject.title, selectedProject.summary)}
              className="absolute top-4 right-4 p-2.5 rounded-lg bg-black/70 backdrop-blur-md text-white hover:bg-[#07732C] transition-colors cursor-pointer"
              title="크게 보기"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Unified Project Images Gallery Grid (Placed ABOVE Case Study) */}
          {selectedProject.images && selectedProject.images.length > 0 && (
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E5E3DC]">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111] whitespace-pre-line break-keep">
                    {selectedProject.galleryTitle || '실제 작업물 및 현장 아카이브'}
                  </h2>
                  {selectedProject.gallerySubtitle && selectedProject.gallerySubtitle.trim() && (
                    <p className="text-xs sm:text-sm text-[#71716A] mt-1 whitespace-pre-line break-keep">
                      {selectedProject.gallerySubtitle}
                    </p>
                  )}
                </div>
                {selectedProject.galleryBadge && selectedProject.galleryBadge.trim() && (
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#E8F4EC] border border-[#07732C]/30 text-[#07732C] font-bold self-start sm:self-auto shrink-0">
                    {selectedProject.galleryBadge}
                  </span>
                )}
              </div>

              {/* Grid of gallery images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {selectedProject.images.map((img, idx) => {
                  const isFeatured = img.isFeatured || (idx === 0 && img.span === 'full');
                  const isFullSpan = img.span === 'full';

                  return (
                    <div
                      key={img.id || idx}
                      onClick={() => openLightbox(img.url, img.title, img.caption)}
                      className={`group cursor-pointer rounded-xl border border-[#D8D5CC] bg-[#111111] overflow-hidden hover:border-[#07732C] transition-all flex flex-col ${
                        isFullSpan ? 'sm:col-span-2 lg:col-span-3' : ''
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden bg-[#161b22] ${
                          isFullSpan ? 'aspect-16/9 sm:max-h-[440px]' : 'aspect-4/3'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                        <div className="absolute top-3 left-3">
                          {isFeatured ? (
                            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#07732C] text-white border border-white/20 shadow-xs">
                              대표작
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#07732C] text-white border border-white/20 shadow-xs">
                              #{String(idx + 1).padStart(2, '0')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-4 bg-[#161b22] text-white flex-1 flex flex-col justify-between">
                        <div>
                          {img.subtitle && (
                            <div className="text-[11px] font-mono text-[#58a6ff]">
                              {img.subtitle}
                            </div>
                          )}
                          <h4 className="font-bold text-sm text-white mt-1 group-hover:text-[#58a6ff] transition-colors leading-snug whitespace-pre-line break-keep">
                            {img.title}
                          </h4>
                          {img.caption && (
                            <p className="text-xs text-[#8b949e] mt-1.5 whitespace-pre-line break-keep">
                              {img.caption}
                            </p>
                          )}
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#30363d] flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
                          <span className="group-hover:text-white">CLICK TO ZOOM</span>
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4 Pillars Case Study Breakdown: CONTEXT / ROLE / STRATEGY / RESULT (Placed at the bottom) */}
          <div className="pt-6 border-t border-[#E5E3DC] space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#07732C]"></span>
              <h3 className="text-sm font-mono font-bold tracking-wider text-[#111111] uppercase">
                CASE STUDY & EXECUTION PROCESS (상세 실행 과정)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CONTEXT */}
              <div className="p-6 rounded-xl bg-[#F8F7F3] border border-[#E5E3DC] space-y-3 hover:border-[#07732C]/40 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#07732C]"></span>
                  <h2 className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase">
                    01. CONTEXT (배경과 문제 정의)
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-[#333330] leading-relaxed whitespace-pre-line break-keep">
                  {selectedProject.context}
                </p>
              </div>

              {/* ROLE */}
              <div className="p-6 rounded-xl bg-[#F8F7F3] border border-[#E5E3DC] space-y-3 hover:border-[#07732C]/40 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#07732C]"></span>
                  <h2 className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase">
                    02. ROLE (담당 역할 및 실행)
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-[#333330] leading-relaxed whitespace-pre-line break-keep">
                  {selectedProject.role}
                </p>
              </div>

              {/* STRATEGY */}
              <div className="p-6 rounded-xl bg-[#F8F7F3] border border-[#E5E3DC] space-y-3 hover:border-[#07732C]/40 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#07732C]"></span>
                  <h2 className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase">
                    03. STRATEGY (핵심 기획 판단)
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-[#333330] leading-relaxed whitespace-pre-line break-keep">
                  {selectedProject.strategy}
                </p>
              </div>

              {/* RESULT */}
              <div className="p-6 rounded-xl bg-[#F8F7F3] border border-[#E5E3DC] space-y-3 hover:border-[#07732C]/40 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#07732C]"></span>
                  <h2 className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase">
                    04. RESULT (증명된 성과 및 반응)
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-[#333330] leading-relaxed whitespace-pre-line break-keep">
                  {selectedProject.result}
                </p>
              </div>
            </div>
          </div>

          {/* Takeaway Section */}
          {selectedProject.takeaway && (
            <div className="p-6 rounded-xl bg-[#E8F4EC] border-l-4 border-[#07732C]">
              <h2 className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase mb-2">
                KEY TAKEAWAY & LEARNING
              </h2>
              <p className="text-base text-[#111111] font-semibold leading-relaxed whitespace-pre-line break-keep">
                {selectedProject.takeaway}
              </p>
            </div>
          )}

          {/* Bottom Project Switcher Nav */}
          <div className="pt-8 border-t border-[#E5E3DC] flex items-center justify-between">
            {prevProject ? (
              <button
                onClick={() => openProjectModal(prevProject.id)}
                className="flex items-center gap-2 text-xs font-mono font-bold text-[#111111] hover:text-[#07732C] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREV : {prevProject.title}</span>
              </button>
            ) : (
              <div></div>
            )}

            {nextProject ? (
              <button
                onClick={() => openProjectModal(nextProject.id)}
                className="flex items-center gap-2 text-xs font-mono font-bold text-[#111111] hover:text-[#07732C] transition-colors cursor-pointer"
              >
                <span>NEXT : {nextProject.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div></div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
