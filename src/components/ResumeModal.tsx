import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Printer,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Wrench,
  Layers,
} from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const { isResumeModalOpen, closeResumeModal, siteConfig, experience, projects, resumeData } = usePortfolio();

  if (!isResumeModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const name = resumeData?.name || siteConfig.name;
  const englishName = resumeData?.englishName || siteConfig.englishName || 'Hong Gimin';
  const roleTitle = resumeData?.roleTitle || siteConfig.roleTitle;
  const tagline = resumeData?.tagline || '디지털 콘텐츠 기획 · 인포그래픽 디자인 · SNS 팬페이지 운영 · 프로스포츠 현장 실행을 유기적으로 연결하는 마케터';
  const phone = resumeData?.phone || siteConfig.phone || '010-XXXX-XXXX';
  const email = resumeData?.email || siteConfig.email;
  const portfolioUrl = resumeData?.portfolioUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  const modalTitle = resumeData?.modalTitle || `${name} | 스포츠 콘텐츠 마케터 이력서 (CV)`;

  const expList = resumeData?.useCustomExperience && resumeData.customExperience?.length
    ? resumeData.customExperience
    : experience;

  const projList = resumeData?.useCustomProjects && resumeData.customProjects?.length
    ? resumeData.customProjects
    : projects.map((p) => ({
        id: p.id,
        order: p.order,
        title: p.title,
        category: p.category,
        summary: p.summary,
        result: p.result,
      }));

  return (
    <div
      id="resume-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex justify-center p-2 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeResumeModal();
      }}
    >
      <div
        id="resume-modal-container"
        className="relative w-full max-w-4xl bg-[#F8F7F3] rounded-2xl shadow-2xl border border-[#DCDAD2] overflow-hidden my-auto flex flex-col max-h-[94vh]"
      >
        {/* Top Control Bar */}
        <div className="bg-[#111111] text-[#F4F3EF] px-6 py-4 flex items-center justify-between border-b border-[#333333] shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#4ade80]" />
            <span className="font-mono font-bold text-sm truncate max-w-[280px] sm:max-w-md">
              {modalTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>인쇄 / PDF 저장</span>
            </button>
            <button
              onClick={closeResumeModal}
              className="p-1 rounded-full bg-[#222222] hover:bg-[#333333] text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document */}
        <div className="overflow-y-auto p-6 sm:p-12 space-y-10 bg-white text-[#111111] print:p-0 print:m-0">
          
          {/* Header */}
          <div className="border-b-2 border-[#111111] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                {name} {englishName && <span className="text-xl sm:text-2xl font-bold text-[#555550]">({englishName})</span>}
              </h1>
              <div className="text-sm font-mono font-bold text-[#07732C] mt-1 tracking-wider uppercase">
                {roleTitle}
              </div>
              <p className="text-xs sm:text-sm text-[#555550] mt-2 max-w-xl leading-relaxed">
                {tagline}
              </p>
            </div>

            <div className="text-xs font-mono text-[#555550] space-y-1 sm:text-right shrink-0">
              <div>Phone : {phone}</div>
              <div>Email : {email}</div>
              {portfolioUrl && <div>Portfolio : {portfolioUrl}</div>}
              {resumeData?.location && <div>Location : {resumeData.location}</div>}
              {resumeData?.customLinks && resumeData.customLinks.length > 0 && (
                <div className="flex flex-wrap gap-2 sm:justify-end pt-1">
                  {resumeData.customLinks.map((lnk) => (
                    <a
                      key={lnk.id}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#07732C] underline hover:text-[#055822] text-[11px]"
                    >
                      {lnk.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section: 핵심 요약 (Summary) */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase pb-1 border-b border-[#E5E3DC] flex items-center justify-between">
              <span>{resumeData?.summarySectionTitle || '01. PROFESSIONAL SUMMARY'}</span>
            </h2>
            <div className="text-sm text-[#333330] leading-relaxed whitespace-pre-line">
              {resumeData?.summaryText || (
                <>
                  스포츠 미디어와 팬덤의 상호작용을 깊이 이해하고, 단순 디자인에 그치지 않고 팬이 능동적으로 참여하는 질문 구조와 포맷을 기획합니다. 
                  일간스포츠 필드클럽에서 단일 콘텐츠 <strong>32만 7천 회 조회 및 7천여 건 자발적 공유</strong>를 창출하였으며, 세이버메트릭스 전문 칼럼을 직관적으로 재구성하는 13편의 인포그래픽 디자인 시스템을 구축했습니다.
                </>
              )}
            </div>
          </div>

          {/* Section: 주요 경력 및 활동 (Experience) */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase pb-1 border-b border-[#E5E3DC]">
              {resumeData?.experienceSectionTitle || '02. EXPERIENCE & ACTIVITIES'}
            </h2>
            
            <div className="space-y-6">
              {expList.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-bold text-[#111111]">
                    <div className="flex items-center gap-2">
                      <span>{exp.title}</span>
                      {exp.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E8F4EC] text-[#07732C] font-bold border border-[#07732C]/20">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-[#71716A]">{exp.period}</span>
                  </div>
                  <div className="text-xs font-bold text-[#07732C]">{exp.role}</div>
                  <p className="text-xs sm:text-sm text-[#555550] leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: 대표 프로젝트 성과 (Key Projects) */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase pb-1 border-b border-[#E5E3DC]">
              {resumeData?.projectsSectionTitle || '03. KEY PROJECTS & PROVEN IMPACT'}
            </h2>
            
            <div className="space-y-4">
              {projList.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-[#F8F7F3] border border-[#E5E3DC] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#111111]">
                      {proj.order}. {proj.title}
                    </span>
                    <span className="text-xs font-mono text-[#07732C] font-bold">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#555550] leading-relaxed whitespace-pre-line">
                    {proj.summary}
                  </p>
                  {proj.result && (
                    <div className="text-xs text-[#333330] pt-1">
                      <strong className="text-[#07732C]">성과 : </strong>
                      {proj.result}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section: 핵심 역량 (Core Competencies) */}
          {resumeData?.competencies && resumeData.competencies.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase pb-1 border-b border-[#E5E3DC]">
                {resumeData?.competenciesSectionTitle || '04. CORE COMPETENCIES'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {resumeData.competencies.map((comp) => (
                  <div key={comp.id} className="p-3.5 rounded-lg bg-[#FAF9F5] border border-[#E5E3DC] space-y-1">
                    <div className="font-bold text-[#111111]">{comp.title}</div>
                    <p className="text-[#555550] leading-relaxed whitespace-pre-line">{comp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: 학력 사항 (Education) */}
          {resumeData?.showEducation !== false && resumeData?.educationList && resumeData.educationList.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase pb-1 border-b border-[#E5E3DC] flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{resumeData?.educationSectionTitle || '05. EDUCATION & ACADEMIC BACKGROUND'}</span>
              </h2>
              <div className="space-y-3">
                {resumeData.educationList.map((edu) => (
                  <div key={edu.id} className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E5E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-bold text-sm text-[#111111] flex items-center gap-2">
                        <span>{edu.school}</span>
                        {edu.status && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E8F4EC] text-[#07732C] font-bold border border-[#07732C]/20">
                            {edu.status}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#555550] mt-0.5">{edu.major}</div>
                      {edu.description && (
                        <div className="text-[11px] text-[#71716A] mt-1">{edu.description}</div>
                      )}
                    </div>
                    <div className="font-mono text-xs text-[#71716A] shrink-0">
                      {edu.period}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: 수상 및 자격 (Awards & Certifications) */}
          {resumeData?.showAwards !== false && resumeData?.awardsList && resumeData.awardsList.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase pb-1 border-b border-[#E5E3DC] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>{resumeData?.awardsSectionTitle || '06. AWARDS & CERTIFICATIONS'}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {resumeData.awardsList.map((award) => (
                  <div key={award.id} className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E5E3DC] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#111111]">{award.title}</span>
                      <span className="font-mono text-[10px] text-[#71716A]">{award.date}</span>
                    </div>
                    <div className="text-xs text-[#07732C] font-bold">{award.issuer}</div>
                    {award.description && (
                      <p className="text-[11px] text-[#555550] leading-relaxed">{award.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: 스킬 및 툴 (Skills & Tools) */}
          {resumeData?.showSkills !== false && resumeData?.skillsList && resumeData.skillsList.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase pb-1 border-b border-[#E5E3DC] flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>{resumeData?.skillsSectionTitle || '07. SKILLS & TOOLS'}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {resumeData.skillsList.map((sk) => (
                  <div key={sk.id} className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E5E3DC] space-y-1">
                    <div className="font-bold text-xs text-[#111111]">{sk.name}</div>
                    <p className="text-xs font-mono text-[#555550]">{sk.skills}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Note */}
          {resumeData?.footerNote && (
            <div className="pt-6 border-t border-[#E5E3DC] text-center">
              <p className="text-xs text-[#888880] font-mono">
                {resumeData.footerNote}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

