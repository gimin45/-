import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ResumeData,
  ResumeCompetencyItem,
  ResumeExperienceItem,
  ResumeProjectItem,
  ResumeEducationItem,
  ResumeAwardItem,
  ResumeSkillCategory,
} from '../types';
import { DEFAULT_RESUME_DATA } from '../data/defaultData';
import {
  FileText,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Eye,
  RotateCcw,
  Sparkles,
  GraduationCap,
  Award,
  Wrench,
  Briefcase,
  Layers,
  Link as LinkIcon,
  CheckCircle2,
  HelpCircle,
  Copy,
} from 'lucide-react';

interface AdminResumeTabProps {
  showToast: (msg: string) => void;
}

export const AdminResumeTab: React.FC<AdminResumeTabProps> = ({ showToast }) => {
  const { resumeData, updateResumeData, openResumeModal, siteConfig, experience, projects } = usePortfolio();

  const [activeSection, setActiveSection] = useState<
    'general' | 'summary' | 'experience' | 'projects' | 'competencies' | 'education' | 'awards' | 'skills' | 'footer'
  >('general');
  const [resetConfirm, setResetConfirm] = useState(false);

  const curData: ResumeData = resumeData || DEFAULT_RESUME_DATA;

  // Custom Links handlers
  const handleAddLink = () => {
    const newLinks = [
      ...(curData.customLinks || []),
      { id: `link-${Date.now()}`, label: '새 링크', url: 'https://' },
    ];
    updateResumeData({ customLinks: newLinks });
    showToast('새 링크가 추가되었습니다.');
  };

  const handleUpdateLink = (id: string, field: 'label' | 'url', val: string) => {
    const newLinks = (curData.customLinks || []).map((lnk) =>
      lnk.id === id ? { ...lnk, [field]: val } : lnk
    );
    updateResumeData({ customLinks: newLinks });
  };

  const handleDeleteLink = (id: string) => {
    const newLinks = (curData.customLinks || []).filter((lnk) => lnk.id !== id);
    updateResumeData({ customLinks: newLinks });
    showToast('링크가 삭제되었습니다.');
  };

  // Custom Experience handlers
  const handleAddCustomExp = () => {
    const newExp: ResumeExperienceItem = {
      id: `exp-${Date.now()}`,
      title: '새 활동 / 기업명',
      role: '직책 / 역할',
      period: '2026.01 — 2026.06',
      badge: '활동',
      description: '담당 업무 및 세부 성과 내용을 기술하세요.',
    };
    const list = [...(curData.customExperience || []), newExp];
    updateResumeData({ customExperience: list, useCustomExperience: true });
    showToast('새 경력 항목이 추가되었습니다.');
  };

  const handleUpdateCustomExp = (id: string, patch: Partial<ResumeExperienceItem>) => {
    const list = (curData.customExperience || []).map((item) =>
      item.id === id ? { ...item, ...patch } : item
    );
    updateResumeData({ customExperience: list });
  };

  const handleDeleteCustomExp = (id: string) => {
    const list = (curData.customExperience || []).filter((item) => item.id !== id);
    updateResumeData({ customExperience: list });
    showToast('경력 항목이 삭제되었습니다.');
  };

  const handleMoveCustomExp = (index: number, direction: 'up' | 'down') => {
    const list = [...(curData.customExperience || [])];
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === list.length - 1)
    )
      return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updateResumeData({ customExperience: list });
  };

  const handleImportFromPortfolioExp = () => {
    const converted: ResumeExperienceItem[] = experience.map((e) => ({
      id: e.id,
      title: e.title,
      role: e.role,
      period: e.period,
      badge: e.badge,
      description: e.description,
    }));
    updateResumeData({ customExperience: converted, useCustomExperience: true });
    showToast('포트폴리오 경력 데이터 4건을 이력서로 복사했습니다.');
  };

  // Custom Projects handlers
  const handleAddCustomProj = () => {
    const nextOrder = String((curData.customProjects || []).length + 1).padStart(2, '0');
    const newProj: ResumeProjectItem = {
      id: `proj-${Date.now()}`,
      order: nextOrder,
      title: '새 대표 프로젝트명',
      category: 'CONTENT & SOCIAL',
      summary: '프로젝트 핵심 기획 내용 및 접근 방식 요약입니다.',
      result: '정량적 성과 지표 (예: 조회수 10만 회, 전환율 30% 상승)',
    };
    const list = [...(curData.customProjects || []), newProj];
    updateResumeData({ customProjects: list, useCustomProjects: true });
    showToast('새 프로젝트 성과 항목이 추가되었습니다.');
  };

  const handleUpdateCustomProj = (id: string, patch: Partial<ResumeProjectItem>) => {
    const list = (curData.customProjects || []).map((item) =>
      item.id === id ? { ...item, ...patch } : item
    );
    updateResumeData({ customProjects: list });
  };

  const handleDeleteCustomProj = (id: string) => {
    const list = (curData.customProjects || []).filter((item) => item.id !== id);
    updateResumeData({ customProjects: list });
    showToast('프로젝트 성과 항목이 삭제되었습니다.');
  };

  const handleMoveCustomProj = (index: number, direction: 'up' | 'down') => {
    const list = [...(curData.customProjects || [])];
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === list.length - 1)
    )
      return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updateResumeData({ customProjects: list });
  };

  const handleImportFromPortfolioProj = () => {
    const converted: ResumeProjectItem[] = projects.map((p) => ({
      id: p.id,
      order: p.order,
      title: p.title,
      category: p.category,
      summary: p.summary,
      result: p.result,
    }));
    updateResumeData({ customProjects: converted, useCustomProjects: true });
    showToast('포트폴리오 프로젝트 데이터를 이력서로 복사했습니다.');
  };

  // Competencies handlers
  const handleAddCompetency = () => {
    const newComp: ResumeCompetencyItem = {
      id: `comp-${Date.now()}`,
      title: '새 핵심 역량',
      desc: '역량 세부 설명 및 적용 사례를 입력하세요.',
    };
    const list = [...(curData.competencies || []), newComp];
    updateResumeData({ competencies: list });
    showToast('핵심 역량이 추가되었습니다.');
  };

  const handleUpdateCompetency = (id: string, patch: Partial<ResumeCompetencyItem>) => {
    const list = (curData.competencies || []).map((item) =>
      item.id === id ? { ...item, ...patch } : item
    );
    updateResumeData({ competencies: list });
  };

  const handleDeleteCompetency = (id: string) => {
    const list = (curData.competencies || []).filter((item) => item.id !== id);
    updateResumeData({ competencies: list });
    showToast('핵심 역량이 삭제되었습니다.');
  };

  // Education handlers
  const handleAddEducation = () => {
    const newEdu: ResumeEducationItem = {
      id: `edu-${Date.now()}`,
      school: '대학교명',
      major: '전공명',
      period: '2020.03 — 2026.02',
      status: '졸업예정',
      description: '주요 이수 과목 또는 활동 사항',
    };
    const list = [...(curData.educationList || []), newEdu];
    updateResumeData({ educationList: list });
    showToast('학력 항목이 추가되었습니다.');
  };

  const handleUpdateEducation = (id: string, patch: Partial<ResumeEducationItem>) => {
    const list = (curData.educationList || []).map((item) =>
      item.id === id ? { ...item, ...patch } : item
    );
    updateResumeData({ educationList: list });
  };

  const handleDeleteEducation = (id: string) => {
    const list = (curData.educationList || []).filter((item) => item.id !== id);
    updateResumeData({ educationList: list });
    showToast('학력 항목이 삭제되었습니다.');
  };

  // Awards handlers
  const handleAddAward = () => {
    const newAward: ResumeAwardItem = {
      id: `award-${Date.now()}`,
      title: '수상 / 자격증명',
      issuer: '주최 / 발급 기관명',
      date: '2025.10',
      description: '수상 내역 또는 자격 설명',
    };
    const list = [...(curData.awardsList || []), newAward];
    updateResumeData({ awardsList: list });
    showToast('수상 및 자격 항목이 추가되었습니다.');
  };

  const handleUpdateAward = (id: string, patch: Partial<ResumeAwardItem>) => {
    const list = (curData.awardsList || []).map((item) =>
      item.id === id ? { ...item, ...patch } : item
    );
    updateResumeData({ awardsList: list });
  };

  const handleDeleteAward = (id: string) => {
    const list = (curData.awardsList || []).filter((item) => item.id !== id);
    updateResumeData({ awardsList: list });
    showToast('수상 및 자격 항목이 삭제되었습니다.');
  };

  // Skills Category handlers
  const handleAddSkillCat = () => {
    const newSkill: ResumeSkillCategory = {
      id: `skill-${Date.now()}`,
      name: '새 스킬 카테고리',
      skills: '도구1, 도구2, 스킬3',
    };
    const list = [...(curData.skillsList || []), newSkill];
    updateResumeData({ skillsList: list });
    showToast('스킬 카테고리가 추가되었습니다.');
  };

  const handleUpdateSkillCat = (id: string, patch: Partial<ResumeSkillCategory>) => {
    const list = (curData.skillsList || []).map((item) =>
      item.id === id ? { ...item, ...patch } : item
    );
    updateResumeData({ skillsList: list });
  };

  const handleDeleteSkillCat = (id: string) => {
    const list = (curData.skillsList || []).filter((item) => item.id !== id);
    updateResumeData({ skillsList: list });
    showToast('스킬 카테고리가 삭제되었습니다.');
  };

  return (
    <div className="space-y-8">
      {/* Header Banner with Live Preview Action */}
      <div className="p-5 rounded-2xl bg-linear-to-r from-[#111111] to-[#222222] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#333333] shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#07732C] text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold tracking-tight flex items-center gap-2">
              <span>이력서 (CV) 전문 에디터</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#07732C] text-white">
                LIVE SYNC
              </span>
            </h3>
            <p className="text-xs text-[#AAAAAA] mt-0.5">
              프로필 탭과 컨택 탭의 ‘이력서 CV 전문 열람’ 팝업에 출력되는 모든 텍스트, 경력, 성과, 학력, 자격증을 자유롭게 편집합니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={openResumeModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#07732C] hover:bg-[#055822] text-white font-mono font-bold text-xs transition-colors shadow-xs cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>이력서 실시간 미리보기</span>
          </button>
          {resetConfirm ? (
            <div className="flex items-center gap-1 bg-[#2A2A2A] px-2 py-1 rounded-xl">
              <span className="text-[11px] text-[#FFAA00] font-mono font-bold">복원할까요?</span>
              <button
                onClick={() => {
                  updateResumeData(DEFAULT_RESUME_DATA);
                  setResetConfirm(false);
                  showToast('이력서 데이터가 기본값으로 복원되었습니다.');
                }}
                className="px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
              >
                예
              </button>
              <button
                onClick={() => setResetConfirm(false)}
                className="px-2 py-1 rounded bg-[#444] hover:bg-[#555] text-white font-mono text-xs cursor-pointer"
              >
                취소
              </button>
            </div>
          ) : (
            <button
              onClick={() => setResetConfirm(true)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#2A2A2A] hover:bg-[#383838] text-[#CCCCCC] font-mono text-xs transition-colors cursor-pointer"
              title="기본값으로 복원"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>기본값 복원</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub Section Navigation Pills */}
      <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-[#EFECE6] border border-[#DCDAD2]">
        {[
          { id: 'general', label: '01. 기본 & 헤더' },
          { id: 'summary', label: '02. 전문 요약문' },
          { id: 'experience', label: '03. 경력 및 활동' },
          { id: 'projects', label: '04. 대표 프로젝트' },
          { id: 'competencies', label: '05. 핵심 역량' },
          { id: 'education', label: '06. 학력 사항' },
          { id: 'awards', label: '07. 수상 및 자격' },
          { id: 'skills', label: '08. 스킬 및 툴' },
          { id: 'footer', label: '09. 푸터 문구' },
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeSection === sec.id
                ? 'bg-[#07732C] text-white shadow-xs'
                : 'text-[#555550] hover:bg-[#E5E3DC] hover:text-[#111111]'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* ======================================================== */}
      {/* 1. GENERAL & HEADER */}
      {/* ======================================================== */}
      {activeSection === 'general' && (
        <div className="p-6 rounded-2xl bg-[#F8F7F3] border border-[#DCDAD2] space-y-6">
          <div className="border-b border-[#E5E3DC] pb-3">
            <h4 className="font-mono font-bold text-sm text-[#111111]">
              01. 이력서 상단 헤더 및 기본 인적 정보
            </h4>
            <p className="text-xs text-[#71716A] mt-0.5">
              이력서 상단에 표시되는 성명, 영문명, 타이틀, 슬로건 및 연락처를 설정합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                이력서 모달 상단 윈도우 바 제목
              </label>
              <input
                type="text"
                value={curData.modalTitle || ''}
                onChange={(e) => updateResumeData({ modalTitle: e.target.value })}
                placeholder="홍기민 | 스포츠 콘텐츠 마케터 이력서 (CV)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                직무 타이틀 (Role Title)
              </label>
              <input
                type="text"
                value={curData.roleTitle || ''}
                onChange={(e) => updateResumeData({ roleTitle: e.target.value })}
                placeholder="SPORTS CONTENT CREATOR & STRATEGIST"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono font-bold text-[#07732C]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                성명 (한글)
              </label>
              <input
                type="text"
                value={curData.name || ''}
                onChange={(e) => updateResumeData({ name: e.target.value })}
                placeholder="홍기민"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                성명 (영문)
              </label>
              <input
                type="text"
                value={curData.englishName || ''}
                onChange={(e) => updateResumeData({ englishName: e.target.value })}
                placeholder="Hong Gimin"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
              한 줄 소개 / 슬로건 (Tagline)
            </label>
            <textarea
              rows={2}
              value={curData.tagline || ''}
              onChange={(e) => updateResumeData({ tagline: e.target.value })}
              placeholder="디지털 콘텐츠 기획 · 인포그래픽 디자인 · SNS 팬페이지 운영 · 프로스포츠 현장 실행을 유기적으로 연결하는 마케터"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                전화번호 (Phone)
              </label>
              <input
                type="text"
                value={curData.phone || ''}
                onChange={(e) => updateResumeData({ phone: e.target.value })}
                placeholder="010-XXXX-XXXX"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                이메일 (Email)
              </label>
              <input
                type="text"
                value={curData.email || ''}
                onChange={(e) => updateResumeData({ email: e.target.value })}
                placeholder="rlals4033@naver.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                포트폴리오 주소 (URL)
              </label>
              <input
                type="text"
                value={curData.portfolioUrl || ''}
                onChange={(e) => updateResumeData({ portfolioUrl: e.target.value })}
                placeholder="https://honggimin.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                거주 / 활동 지역 (Location)
              </label>
              <input
                type="text"
                value={curData.location || ''}
                onChange={(e) => updateResumeData({ location: e.target.value })}
                placeholder="Seoul, South Korea"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs"
              />
            </div>
          </div>

          {/* Custom Links */}
          <div className="pt-4 border-t border-[#E5E3DC] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#111111] flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-[#07732C]" />
                <span>추가 링크 목록 (GitHub, 블로그, 링크드인 등)</span>
              </span>
              <button
                onClick={handleAddLink}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>링크 추가</span>
              </button>
            </div>

            {(!curData.customLinks || curData.customLinks.length === 0) ? (
              <p className="text-xs text-[#888880] font-mono py-2">등록된 추가 링크가 없습니다.</p>
            ) : (
              <div className="space-y-2">
                {curData.customLinks.map((lnk) => (
                  <div
                    key={lnk.id}
                    className="p-3 rounded-xl bg-white border border-[#DCDAD2] flex flex-col sm:flex-row items-center gap-2"
                  >
                    <input
                      type="text"
                      value={lnk.label}
                      onChange={(e) => handleUpdateLink(lnk.id, 'label', e.target.value)}
                      placeholder="링크 명칭 (예: Notion, Blog)"
                      className="w-full sm:w-40 px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={lnk.url}
                      onChange={(e) => handleUpdateLink(lnk.id, 'url', e.target.value)}
                      placeholder="URL (https://...)"
                      className="w-full flex-1 px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#07732C]"
                    />
                    <button
                      onClick={() => handleDeleteLink(lnk.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PROFESSIONAL SUMMARY */}
      {/* ======================================================== */}
      {activeSection === 'summary' && (
        <div className="p-6 rounded-2xl bg-[#F8F7F3] border border-[#DCDAD2] space-y-6">
          <div className="border-b border-[#E5E3DC] pb-3">
            <h4 className="font-mono font-bold text-sm text-[#111111]">
              02. 전문 요약문 (PROFESSIONAL SUMMARY)
            </h4>
            <p className="text-xs text-[#71716A] mt-0.5">
              이력서의 최상단 요약 소개 단락으로, 본인의 차별화된 핵심 강점과 대표 성과를 요약합니다.
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
              섹션 제목 (Section Title)
            </label>
            <input
              type="text"
              value={curData.summarySectionTitle || '01. PROFESSIONAL SUMMARY'}
              onChange={(e) => updateResumeData({ summarySectionTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono font-bold text-[#07732C]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
              전문 요약문 본문 (줄바꿈 지원)
            </label>
            <textarea
              rows={6}
              value={curData.summaryText || ''}
              onChange={(e) => updateResumeData({ summaryText: e.target.value })}
              placeholder="스포츠 미디어와 팬덤의 상호작용을 깊이 이해하고..."
              className="w-full px-3.5 py-3 rounded-lg border border-[#DCDAD2] bg-white text-xs leading-relaxed font-sans"
            />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. EXPERIENCE & ACTIVITIES */}
      {/* ======================================================== */}
      {activeSection === 'experience' && (
        <div className="p-6 rounded-2xl bg-[#F8F7F3] border border-[#DCDAD2] space-y-6">
          <div className="border-b border-[#E5E3DC] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-mono font-bold text-sm text-[#111111]">
                03. 주요 경력 및 대외활동 (EXPERIENCE & ACTIVITIES)
              </h4>
              <p className="text-xs text-[#71716A] mt-0.5">
                포트폴리오의 경력 데이터를 그대로 가져오거나, 이력서에 최적화된 맞춤 경력으로 독립 편집할 수 있습니다.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleImportFromPortfolioExp}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#333333] text-white text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-[#4ade80]" />
                <span>포트폴리오 경력 4건 불러오기</span>
              </button>
              <button
                onClick={handleAddCustomExp}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>새 경력 추가</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                섹션 제목 (Section Title)
              </label>
              <input
                type="text"
                value={curData.experienceSectionTitle || '02. EXPERIENCE & ACTIVITIES'}
                onChange={(e) => updateResumeData({ experienceSectionTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono font-bold text-[#07732C]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                데이터 연동 방식 설정
              </label>
              <select
                value={curData.useCustomExperience ? 'custom' : 'portfolio'}
                onChange={(e) =>
                  updateResumeData({ useCustomExperience: e.target.value === 'custom' })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono font-bold"
              >
                <option value="custom">이력서 전용 독립 데이터 사용 (권장: 자유롭게 수정)</option>
                <option value="portfolio">포트폴리오 04. 경력 탭 데이터와 자동 실시간 연동</option>
              </select>
            </div>
          </div>

          {/* List of Experiences */}
          <div className="space-y-4 pt-2">
            {(curData.customExperience || []).map((exp, idx) => (
              <div
                key={exp.id}
                className="p-4 rounded-xl bg-white border border-[#DCDAD2] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#EFECE6] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#07732C] text-white flex items-center justify-center text-[10px] font-mono font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-[#111111]">
                      {exp.title || '경력 항목'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveCustomExp(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 text-[#71716A] hover:text-[#111111] disabled:opacity-30 cursor-pointer"
                      title="위로 이동"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveCustomExp(idx, 'down')}
                      disabled={idx === (curData.customExperience || []).length - 1}
                      className="p-1 text-[#71716A] hover:text-[#111111] disabled:opacity-30 cursor-pointer"
                      title="아래로 이동"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCustomExp(exp.id)}
                      className="p-1 text-red-500 hover:text-red-700 rounded transition-colors cursor-pointer ml-1"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                      회사 / 조직명
                    </label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => handleUpdateCustomExp(exp.id, { title: e.target.value })}
                      placeholder="일간스포츠 필드클럽"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                      직책 / 역할 (Role)
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleUpdateCustomExp(exp.id, { role: e.target.value })}
                      placeholder="콘텐츠 크리에이터"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-bold text-[#07732C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                      활동 기간 (Period) & 뱃지
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => handleUpdateCustomExp(exp.id, { period: e.target.value })}
                        placeholder="2026.01 — 현재"
                        className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono"
                      />
                      <input
                        type="text"
                        value={exp.badge || ''}
                        onChange={(e) => handleUpdateCustomExp(exp.id, { badge: e.target.value })}
                        placeholder="뱃지"
                        className="w-20 px-2 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                    상세 활동 및 성과 설명 (줄바꿈 지원)
                  </label>
                  <textarea
                    rows={2}
                    value={exp.description}
                    onChange={(e) => handleUpdateCustomExp(exp.id, { description: e.target.value })}
                    placeholder="담당 주요 업무 및 성과 내용을 기술하세요."
                    className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. KEY PROJECTS & PROVEN IMPACT */}
      {/* ======================================================== */}
      {activeSection === 'projects' && (
        <div className="p-6 rounded-2xl bg-[#F8F7F3] border border-[#DCDAD2] space-y-6">
          <div className="border-b border-[#E5E3DC] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-mono font-bold text-sm text-[#111111]">
                04. 대표 프로젝트 성과 (KEY PROJECTS & PROVEN IMPACT)
              </h4>
              <p className="text-xs text-[#71716A] mt-0.5">
                이력서에 들어가는 대표 프로젝트 요약과 핵심 수치(성과)를 자유롭게 수정합니다.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleImportFromPortfolioProj}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#333333] text-white text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-[#4ade80]" />
                <span>포트폴리오 프로젝트 불러오기</span>
              </button>
              <button
                onClick={handleAddCustomProj}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>프로젝트 추가</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                섹션 제목 (Section Title)
              </label>
              <input
                type="text"
                value={curData.projectsSectionTitle || '03. KEY PROJECTS & PROVEN IMPACT'}
                onChange={(e) => updateResumeData({ projectsSectionTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono font-bold text-[#07732C]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                데이터 연동 방식
              </label>
              <select
                value={curData.useCustomProjects ? 'custom' : 'portfolio'}
                onChange={(e) =>
                  updateResumeData({ useCustomProjects: e.target.value === 'custom' })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono font-bold"
              >
                <option value="custom">이력서 전용 독립 데이터 사용 (권장)</option>
                <option value="portfolio">포트폴리오 05. 프로젝트 탭 데이터와 자동 실시간 연동</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {(curData.customProjects || []).map((proj, idx) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-white border border-[#DCDAD2] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#EFECE6] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#E8F4EC] text-[#07732C] font-mono text-[10px] font-bold">
                      {proj.order || String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-bold text-xs text-[#111111]">
                      {proj.title || '프로젝트'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveCustomProj(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 text-[#71716A] hover:text-[#111111] disabled:opacity-30 cursor-pointer"
                      title="위로 이동"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveCustomProj(idx, 'down')}
                      disabled={idx === (curData.customProjects || []).length - 1}
                      className="p-1 text-[#71716A] hover:text-[#111111] disabled:opacity-30 cursor-pointer"
                      title="아래로 이동"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCustomProj(proj.id)}
                      className="p-1 text-red-500 hover:text-red-700 rounded transition-colors cursor-pointer ml-1"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                      순번 (Order)
                    </label>
                    <input
                      type="text"
                      value={proj.order}
                      onChange={(e) => handleUpdateCustomProj(proj.id, { order: e.target.value })}
                      placeholder="01"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                      프로젝트명
                    </label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => handleUpdateCustomProj(proj.id, { title: e.target.value })}
                      placeholder="일간스포츠 필드클럽 SNS 콘텐츠 기획"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                    카테고리 / 분야 태그
                  </label>
                  <input
                    type="text"
                    value={proj.category}
                    onChange={(e) => handleUpdateCustomProj(proj.id, { category: e.target.value })}
                    placeholder="CONTENT & SOCIAL"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono font-bold text-[#07732C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                    프로젝트 요약 설명 (Summary)
                  </label>
                  <textarea
                    rows={2}
                    value={proj.summary}
                    onChange={(e) => handleUpdateCustomProj(proj.id, { summary: e.target.value })}
                    placeholder="기획 의도 및 진행 내용 요약"
                    className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                    핵심 정량/정성 성과 (Result)
                  </label>
                  <input
                    type="text"
                    value={proj.result}
                    onChange={(e) => handleUpdateCustomProj(proj.id, { result: e.target.value })}
                    placeholder="단일 릴스 32.7만 회 조회수 및 7,200회 자발적 공유 기록"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-bold text-[#07732C]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. CORE COMPETENCIES */}
      {/* ======================================================== */}
      {activeSection === 'competencies' && (
        <div className="p-6 rounded-2xl bg-[#F8F7F3] border border-[#DCDAD2] space-y-6">
          <div className="border-b border-[#E5E3DC] pb-3 flex items-center justify-between">
            <div>
              <h4 className="font-mono font-bold text-sm text-[#111111]">
                05. 핵심 역량 (CORE COMPETENCIES)
              </h4>
              <p className="text-xs text-[#71716A] mt-0.5">
                이력서의 3단 그리드 핵심 역량 박스를 설정합니다.
              </p>
            </div>

            <button
              onClick={handleAddCompetency}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>역량 카드 추가</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
              섹션 제목 (Section Title)
            </label>
            <input
              type="text"
              value={curData.competenciesSectionTitle || '04. CORE COMPETENCIES'}
              onChange={(e) => updateResumeData({ competenciesSectionTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono font-bold text-[#07732C]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {(curData.competencies || []).map((comp) => (
              <div
                key={comp.id}
                className="p-4 rounded-xl bg-white border border-[#DCDAD2] shadow-xs space-y-2 relative"
              >
                <button
                  onClick={() => handleDeleteCompetency(comp.id)}
                  className="absolute top-3 right-3 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                  title="삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                    역량 타이틀
                  </label>
                  <input
                    type="text"
                    value={comp.title}
                    onChange={(e) => handleUpdateCompetency(comp.id, { title: e.target.value })}
                    placeholder="Content Strategy"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-bold text-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                    세부 설명 (Description)
                  </label>
                  <textarea
                    rows={3}
                    value={comp.desc}
                    onChange={(e) => handleUpdateCompetency(comp.id, { desc: e.target.value })}
                    placeholder="역량 상세 설명"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. EDUCATION & ACADEMIC BACKGROUND */}
      {/* ======================================================== */}
      {activeSection === 'education' && (
        <div className="p-6 rounded-2xl bg-[#F8F7F3] border border-[#DCDAD2] space-y-6">
          <div className="border-b border-[#E5E3DC] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#07732C]" />
              <div>
                <h4 className="font-mono font-bold text-sm text-[#111111]">
                  06. 학력 사항 (EDUCATION & ACADEMIC BACKGROUND)
                </h4>
                <p className="text-xs text-[#71716A] mt-0.5">
                  대학교, 전공, 학적 상태, 이수 기간 등을 관리합니다.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={curData.showEducation !== false}
                  onChange={(e) => updateResumeData({ showEducation: e.target.checked })}
                  className="rounded text-[#07732C] focus:ring-[#07732C]"
                />
                <span className="text-xs font-mono font-bold text-[#111111]">이력서에 표시</span>
              </label>
              <button
                onClick={handleAddEducation}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>학력 추가</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
              섹션 제목 (Section Title)
            </label>
            <input
              type="text"
              value={curData.educationSectionTitle || '05. EDUCATION & ACADEMIC BACKGROUND'}
              onChange={(e) => updateResumeData({ educationSectionTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono font-bold text-[#07732C]"
            />
          </div>

          <div className="space-y-3 pt-2">
            {(curData.educationList || []).map((edu) => (
              <div
                key={edu.id}
                className="p-4 rounded-xl bg-white border border-[#DCDAD2] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#EFECE6] pb-2">
                  <span className="font-bold text-xs text-[#111111]">{edu.school || '학력'}</span>
                  <button
                    onClick={() => handleDeleteEducation(edu.id)}
                    className="p-1 text-red-500 hover:text-red-700 rounded transition-colors cursor-pointer"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                      학교명
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => handleUpdateEducation(edu.id, { school: e.target.value })}
                      placeholder="한국대학교"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                      전공 (Major)
                    </label>
                    <input
                      type="text"
                      value={edu.major}
                      onChange={(e) => handleUpdateEducation(edu.id, { major: e.target.value })}
                      placeholder="스포츠산업학 / 미디어커뮤니케이션"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                      재학 기간 (Period)
                    </label>
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) => handleUpdateEducation(edu.id, { period: e.target.value })}
                      placeholder="2020.03 — 2026.02"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                      상태 (Status)
                    </label>
                    <input
                      type="text"
                      value={edu.status || ''}
                      onChange={(e) => handleUpdateEducation(edu.id, { status: e.target.value })}
                      placeholder="졸업예정 / 졸업 / 재학"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#07732C] font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                    비고 / 세부 학업 및 활동 설명 (선택사항)
                  </label>
                  <input
                    type="text"
                    value={edu.description || ''}
                    onChange={(e) => handleUpdateEducation(edu.id, { description: e.target.value })}
                    placeholder="스포츠마케팅 및 뉴미디어 콘텐츠 심화 전공 이수"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. AWARDS & CERTIFICATIONS */}
      {/* ======================================================== */}
      {activeSection === 'awards' && (
        <div className="p-6 rounded-2xl bg-[#F8F7F3] border border-[#DCDAD2] space-y-6">
          <div className="border-b border-[#E5E3DC] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#07732C]" />
              <div>
                <h4 className="font-mono font-bold text-sm text-[#111111]">
                  07. 수상 및 자격 (AWARDS & CERTIFICATIONS)
                </h4>
                <p className="text-xs text-[#71716A] mt-0.5">
                  공모전 수상, 자격증, 수료증 등을 입력합니다.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={curData.showAwards !== false}
                  onChange={(e) => updateResumeData({ showAwards: e.target.checked })}
                  className="rounded text-[#07732C] focus:ring-[#07732C]"
                />
                <span className="text-xs font-mono font-bold text-[#111111]">이력서에 표시</span>
              </label>
              <button
                onClick={handleAddAward}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>수상/자격 추가</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
              섹션 제목 (Section Title)
            </label>
            <input
              type="text"
              value={curData.awardsSectionTitle || '06. AWARDS & CERTIFICATIONS'}
              onChange={(e) => updateResumeData({ awardsSectionTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono font-bold text-[#07732C]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {(curData.awardsList || []).map((award) => (
              <div
                key={award.id}
                className="p-4 rounded-xl bg-white border border-[#DCDAD2] shadow-xs space-y-2 relative"
              >
                <button
                  onClick={() => handleDeleteAward(award.id)}
                  className="absolute top-3 right-3 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                  title="삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                      수상 / 자격명
                    </label>
                    <input
                      type="text"
                      value={award.title}
                      onChange={(e) => handleUpdateAward(award.id, { title: e.target.value })}
                      placeholder="스포츠 마케팅 공모전 대상"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                      취득/수상 일자
                    </label>
                    <input
                      type="text"
                      value={award.date}
                      onChange={(e) => handleUpdateAward(award.id, { date: e.target.value })}
                      placeholder="2025.10"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                    발급 / 주최 기관
                  </label>
                  <input
                    type="text"
                    value={award.issuer}
                    onChange={(e) => handleUpdateAward(award.id, { issuer: e.target.value })}
                    placeholder="한국스포츠산업협회"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs text-[#07732C] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                    세부 내용 (선택사항)
                  </label>
                  <input
                    type="text"
                    value={award.description || ''}
                    onChange={(e) => handleUpdateAward(award.id, { description: e.target.value })}
                    placeholder="팬 인터랙션 기획안 우수작 선정"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. SKILLS & TOOLS */}
      {/* ======================================================== */}
      {activeSection === 'skills' && (
        <div className="p-6 rounded-2xl bg-[#F8F7F3] border border-[#DCDAD2] space-y-6">
          <div className="border-b border-[#E5E3DC] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#07732C]" />
              <div>
                <h4 className="font-mono font-bold text-sm text-[#111111]">
                  08. 보유 스킬 및 도구 (SKILLS & TOOLS)
                </h4>
                <p className="text-xs text-[#71716A] mt-0.5">
                  디자인 툴, 분석 도구, 콘텐츠 기획 스킬 등을 카테고리별로 관리합니다.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={curData.showSkills !== false}
                  onChange={(e) => updateResumeData({ showSkills: e.target.checked })}
                  className="rounded text-[#07732C] focus:ring-[#07732C]"
                />
                <span className="text-xs font-mono font-bold text-[#111111]">이력서에 표시</span>
              </label>
              <button
                onClick={handleAddSkillCat}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>스킬 분류 추가</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
              섹션 제목 (Section Title)
            </label>
            <input
              type="text"
              value={curData.skillsSectionTitle || '07. SKILLS & TOOLS'}
              onChange={(e) => updateResumeData({ skillsSectionTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono font-bold text-[#07732C]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {(curData.skillsList || []).map((sk) => (
              <div
                key={sk.id}
                className="p-4 rounded-xl bg-white border border-[#DCDAD2] shadow-xs space-y-2 relative"
              >
                <button
                  onClick={() => handleDeleteSkillCat(sk.id)}
                  className="absolute top-3 right-3 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                  title="삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                    카테고리명
                  </label>
                  <input
                    type="text"
                    value={sk.name}
                    onChange={(e) => handleUpdateSkillCat(sk.id, { name: e.target.value })}
                    placeholder="Design & Media"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#555550] mb-1">
                    도구 및 스킬 목록 (콤마 구분)
                  </label>
                  <input
                    type="text"
                    value={sk.skills}
                    onChange={(e) => handleUpdateSkillCat(sk.id, { skills: e.target.value })}
                    placeholder="Photoshop, Illustrator, Premiere Pro, Figma"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 9. FOOTER NOTE */}
      {/* ======================================================== */}
      {activeSection === 'footer' && (
        <div className="p-6 rounded-2xl bg-[#F8F7F3] border border-[#DCDAD2] space-y-6">
          <div className="border-b border-[#E5E3DC] pb-3">
            <h4 className="font-mono font-bold text-sm text-[#111111]">
              09. 이력서 푸터 확인 문구 (Footer Note)
            </h4>
            <p className="text-xs text-[#71716A] mt-0.5">
              이력서 최하단에 작게 기재되는 안내 문구 또는 확인 문구를 설정합니다.
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
              푸터 확인 문구
            </label>
            <input
              type="text"
              value={curData.footerNote || ''}
              onChange={(e) => updateResumeData({ footerNote: e.target.value })}
              placeholder="위 기재 사항은 사실과 다름없음을 확인합니다."
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-white text-xs font-mono text-[#555550]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
