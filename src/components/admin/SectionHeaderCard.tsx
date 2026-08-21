import React, { useState } from 'react';
import { Eye, ExternalLink, Sparkles, HelpCircle } from 'lucide-react';

interface SectionHeaderCardProps {
  sectionNumber: string; // "01", "02", "03", "04", "05"
  sectionName: string; // "HIGHLIGHTS & HERO", "ABOUT ME · PROFILE", "EXPERIENCE", "SELECTED WORK", "GET IN TOUCH"
  tagLabel?: string;
  tagValue: string;
  onTagChange: (val: string) => void;
  tagPlaceholder?: string;
  titleLabel?: string;
  titleValue: string;
  onTitleChange: (val: string) => void;
  titlePlaceholder?: string;
  subLabel?: string;
  subValue: string;
  onSubChange: (val: string) => void;
  subPlaceholder?: string;
  isTextAreaTitle?: boolean;
  onJumpToTab?: () => void;
  isDarkTheme?: boolean;
}

export const SectionHeaderCard: React.FC<SectionHeaderCardProps> = ({
  sectionNumber,
  sectionName,
  tagLabel = '1. 상단 인덱스 태그 (Tag)',
  tagValue,
  onTagChange,
  tagPlaceholder,
  titleLabel = '2. 메인 타이틀 (Title)',
  titleValue,
  onTitleChange,
  titlePlaceholder,
  subLabel = '3. 서브 설명 문구 (Subtitle / Description)',
  subValue,
  onSubChange,
  subPlaceholder,
  isTextAreaTitle = false,
  onJumpToTab,
  isDarkTheme = false,
}) => {
  const [showPreview, setShowPreview] = useState(true);

  // Format tag for preview
  const formatTag = (raw: string) => {
    if (!raw) return `${sectionNumber} // ${sectionName}`;
    if (raw.includes('//')) {
      const parts = raw.split('//');
      const prefix = parts[0].trim();
      const suffix = parts.slice(1).join('//').trim();
      return (
        <>
          {prefix && <span className="text-[#07732C] font-bold">{prefix} //</span>}{' '}
          <span>{suffix}</span>
        </>
      );
    }
    return (
      <>
        <span className="text-[#07732C] font-bold">{sectionNumber} //</span> <span>{raw}</span>
      </>
    );
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-[#DCDAD2] shadow-xs space-y-4 transition-all">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E3DC] pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#07732C] text-white font-mono font-bold text-xs tracking-wider">
            TAB {sectionNumber}
          </span>
          <h4 className="font-extrabold text-sm text-[#111111] tracking-tight">
            {sectionName} — 헤더 3대 항목 설정
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#EFECE6] hover:bg-[#E5E3DC] text-[#555550] text-[11px] font-mono font-bold transition-colors cursor-pointer"
            title="실시간 렌더링 미리보기 토글"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showPreview ? '미리보기 닫기' : '미리보기 열기'}</span>
          </button>
          {onJumpToTab && (
            <button
              type="button"
              onClick={onJumpToTab}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#07732C]/10 text-[#07732C] hover:bg-[#07732C]/20 text-[11px] font-mono font-bold transition-colors cursor-pointer"
            >
              <span>전용 편집탭</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 3 Core Header Inputs */}
      <div className="space-y-3.5">
        {/* 1. Tag */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-mono font-bold text-[#07732C] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#07732C]"></span>
              <span>{tagLabel}</span>
            </label>
            <span className="text-[10px] font-mono text-[#888880]">
              예: {sectionNumber} // {sectionName}
            </span>
          </div>
          <input
            type="text"
            value={tagValue || ''}
            onChange={(e) => onTagChange(e.target.value)}
            placeholder={tagPlaceholder || `${sectionNumber} // ${sectionName}`}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCDAD2] bg-white text-xs font-mono text-[#111111] focus:bg-white focus:border-[#07732C] focus:ring-1 focus:ring-[#07732C] outline-hidden shadow-2xs"
          />
        </div>

        {/* 2. Main Title */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-mono font-bold text-[#111111] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]"></span>
              <span>{titleLabel}</span>
            </label>
            <span className="text-[10px] font-mono text-[#888880]">
              섹션의 핵심 메인 헤드라인
            </span>
          </div>
          {isTextAreaTitle ? (
            <textarea
              rows={2}
              value={titleValue || ''}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder={titlePlaceholder || '섹션 메인 타이틀을 입력하세요'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCDAD2] bg-white text-sm font-bold text-[#111111] focus:bg-white focus:border-[#07732C] focus:ring-1 focus:ring-[#07732C] outline-hidden shadow-2xs leading-snug"
            />
          ) : (
            <input
              type="text"
              value={titleValue || ''}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder={titlePlaceholder || '섹션 메인 타이틀을 입력하세요'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCDAD2] bg-white text-sm font-bold text-[#111111] focus:bg-white focus:border-[#07732C] focus:ring-1 focus:ring-[#07732C] outline-hidden shadow-2xs"
            />
          )}
        </div>

        {/* 3. Subtitle / Description */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-mono font-bold text-[#555550] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#71716A]"></span>
              <span>{subLabel}</span>
            </label>
            <span className="text-[10px] font-mono text-[#888880]">
              방문자에게 안내할 서브 카피
            </span>
          </div>
          <textarea
            rows={2}
            value={subValue || ''}
            onChange={(e) => onSubChange(e.target.value)}
            placeholder={subPlaceholder || '섹션 서브 타이틀 및 안내 설명을 입력하세요'}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCDAD2] bg-white text-xs text-[#333330] focus:bg-white focus:border-[#07732C] focus:ring-1 focus:ring-[#07732C] outline-hidden shadow-2xs leading-relaxed"
          />
        </div>
      </div>

      {/* Live Preview Box */}
      {showPreview && (
        <div
          className={`p-4 rounded-xl border transition-all ${
            isDarkTheme
              ? 'bg-[#111111] border-[#2A2A2A] text-white'
              : 'bg-white border-[#E5E3DC] text-[#111111]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#71716A] uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3 h-3 text-[#07732C]" />
            <span>실제 화면 렌더링 미리보기 (Live Preview)</span>
          </div>

          <div className="space-y-1.5">
            {/* Tag */}
            <div
              className={`text-xs font-mono tracking-wider uppercase ${
                isDarkTheme ? 'text-[#888880]' : 'text-[#71716A]'
              }`}
            >
              {formatTag(tagValue)}
            </div>

            {/* Title */}
            <div
              className={`text-lg sm:text-xl font-extrabold tracking-tight leading-snug whitespace-pre-line ${
                isDarkTheme ? 'text-[#F4F3EF]' : 'text-[#111111]'
              }`}
            >
              {titleValue || '(타이틀을 입력하면 이곳에 실시간으로 표시됩니다)'}
            </div>

            {/* Sub */}
            <div
              className={`text-xs leading-relaxed max-w-2xl ${
                isDarkTheme ? 'text-[#A0A09A]' : 'text-[#555550]'
              }`}
            >
              {subValue || '(서브 타이틀 설명을 입력하면 이곳에 실시간으로 표시됩니다)'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
