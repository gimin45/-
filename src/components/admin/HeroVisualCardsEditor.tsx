import React, { useState } from 'react';
import { HeroVisual, Project } from '../../types';
import { ExternalLink, Eye, Share2, Heart, Image as ImageIcon, Upload, Link as LinkIcon, Sparkles } from 'lucide-react';

interface HeroVisualCardsEditorProps {
  heroVisuals: {
    main: HeroVisual;
    sub1: HeroVisual;
    sub2: HeroVisual;
  };
  projects: Project[];
  onUpdateVisuals: (updated: { main: HeroVisual; sub1: HeroVisual; sub2: HeroVisual }) => void;
  onFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => void;
  onNavigateToProject?: (projectId: string) => void;
}

export const HeroVisualCardsEditor: React.FC<HeroVisualCardsEditorProps> = ({
  heroVisuals,
  projects,
  onUpdateVisuals,
  onFileUpload,
  onNavigateToProject,
}) => {
  const [selectedCardTab, setSelectedCardTab] = useState<'all' | 'sub1' | 'main' | 'sub2'>('all');

  const updateCard = (key: 'main' | 'sub1' | 'sub2', partial: Partial<HeroVisual>) => {
    onUpdateVisuals({
      ...heroVisuals,
      [key]: {
        ...heroVisuals[key],
        ...partial,
      },
    });
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Header & Sub-Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC]">
        <div>
          <h4 className="text-sm font-extrabold text-[#111111] flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#07732C] text-white text-[11px] font-mono">
              01 VISUALS
            </span>
            <span>HERO 3대 대표 비주얼 카드 상세 관리</span>
          </h4>
          <p className="text-xs text-[#71716A] font-mono mt-0.5">
            ‘야구공작소 #07’, ‘일간스포츠 필드클럽’, ‘todaybluewave’ 출처 태그 및 타이틀, 설명, 배지, 지표, 연결 프로젝트를 편집합니다.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 bg-[#EFECE6] p-1 rounded-xl shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setSelectedCardTab('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedCardTab === 'all'
                ? 'bg-[#07732C] text-white shadow-xs'
                : 'text-[#555550] hover:text-[#111111]'
            }`}
          >
            전체 3개 카드
          </button>
          <button
            type="button"
            onClick={() => setSelectedCardTab('sub1')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedCardTab === 'sub1'
                ? 'bg-[#07732C] text-white shadow-xs'
                : 'text-[#555550] hover:text-[#111111]'
            }`}
          >
            [좌측] {heroVisuals.sub1.subTag || '야구공작소 #07'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCardTab('main')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedCardTab === 'main'
                ? 'bg-[#07732C] text-white shadow-xs'
                : 'text-[#555550] hover:text-[#111111]'
            }`}
          >
            [중앙] {heroVisuals.main.subTag || '일간스포츠 필드클럽'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCardTab('sub2')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedCardTab === 'sub2'
                ? 'bg-[#07732C] text-white shadow-xs'
                : 'text-[#555550] hover:text-[#111111]'
            }`}
          >
            [우측] {heroVisuals.sub2.subTag || 'todaybluewave'}
          </button>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-6">
        
        {/* ======================================================== */}
        {/* CARD 1: SUB 1 (Workshop #07 - Left) */}
        {/* ======================================================== */}
        {(selectedCardTab === 'all' || selectedCardTab === 'sub1') && (
          <div className="p-5 rounded-2xl bg-white border-2 border-[#E5E3DC] hover:border-[#07732C]/50 transition-all shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E3DC]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#111111] text-[#4ade80]">
                  CARD 01 · 좌측 보조 카드
                </span>
                <span className="text-xs font-bold text-[#111111]">
                  {heroVisuals.sub1.subTag || '야구공작소 #07'} — {heroVisuals.sub1.label || '에디토리얼 & 인포그래픽'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#71716A]">
                클릭 시: {projects.find((p) => p.id === heroVisuals.sub1.projectId)?.title || heroVisuals.sub1.projectId}
              </span>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left Column: 출처/브랜드 태그 & 카테고리 배지 */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#07732C] mb-1">
                    ① 출처 / 브랜드 텍스트 (Sub-Tag) ★
                  </label>
                  <input
                    type="text"
                    value={heroVisuals.sub1.subTag || ''}
                    onChange={(e) => updateCard('sub1', { subTag: e.target.value })}
                    placeholder="야구공작소 #07"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono font-bold text-[#111111] focus:bg-white focus:border-[#07732C]"
                  />
                  <p className="text-[10px] text-[#71716A] font-mono mt-1">
                    카드 상단 우측에 노출되는 출처명 (기본값: 야구공작소 #07)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                    ② 카테고리 배지 (Category Badge)
                  </label>
                  <input
                    type="text"
                    value={heroVisuals.sub1.badge || ''}
                    onChange={(e) => updateCard('sub1', { badge: e.target.value })}
                    placeholder="EDITORIAL"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#111111] focus:bg-white focus:border-[#07732C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                    ③ 카드 메인 타이틀 (Card Title)
                  </label>
                  <input
                    type="text"
                    value={heroVisuals.sub1.label || ''}
                    onChange={(e) => updateCard('sub1', { label: e.target.value })}
                    placeholder="야구공작소 07번 대표작"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-bold text-[#111111] focus:bg-white focus:border-[#07732C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                    ④ 서브 설명 문구 (Subtitle Description)
                  </label>
                  <textarea
                    rows={2}
                    value={heroVisuals.sub1.description || ''}
                    onChange={(e) => updateCard('sub1', { description: e.target.value })}
                    placeholder="복잡한 세부 지표의 직관적 시각화 원칙"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs text-[#111111] focus:bg-white focus:border-[#07732C]"
                  />
                </div>
              </div>

              {/* Right Column: 지표 배지, 연결 프로젝트, 이미지 */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                      ⑤ 하단 배지 텍스트
                    </label>
                    <input
                      type="text"
                      value={heroVisuals.sub1.metricBadge || ''}
                      onChange={(e) => updateCard('sub1', { metricBadge: e.target.value })}
                      placeholder="CASE STUDY"
                      className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#111111] focus:bg-white"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-mono font-bold text-[#555550]">
                        ⑥ 클릭 시 연결 프로젝트
                      </label>
                      {onNavigateToProject && (
                        <button
                          type="button"
                          onClick={() => onNavigateToProject(heroVisuals.sub1.projectId)}
                          className="text-[10px] font-mono text-[#07732C] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>상세 내용 편집</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                    <select
                      value={heroVisuals.sub1.projectId || ''}
                      onChange={(e) => updateCard('sub1', { projectId: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#111111] focus:bg-white"
                    >
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({p.category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload & URL */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                    ⑦ 카드 배경 이미지 (Image)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-[#161b22] overflow-hidden border border-[#DCDAD2] shrink-0">
                      <img
                        src={heroVisuals.sub1.url}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          onFileUpload(e, (dataUrl) => updateCard('sub1', { url: dataUrl }))
                        }
                        className="text-xs font-mono w-full"
                      />
                      <input
                        type="text"
                        value={heroVisuals.sub1.url || ''}
                        onChange={(e) => updateCard('sub1', { url: e.target.value })}
                        placeholder="이미지 URL 직접 입력"
                        className="w-full px-2.5 py-1 rounded border border-[#DCDAD2] bg-[#FAF9F5] text-[11px] font-mono text-[#71716A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Mini Card Live Preview */}
                <div className="p-3 rounded-xl bg-[#161b22] text-[#F4F3EF] border border-[#30363d] space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8b949e]">
                    <span className="px-1.5 py-0.5 rounded bg-[#07732C] text-white font-bold">
                      {heroVisuals.sub1.badge || 'EDITORIAL'}
                    </span>
                    <span className="text-[#4ade80] font-bold">
                      {heroVisuals.sub1.subTag || '야구공작소 #07'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white">
                    {heroVisuals.sub1.label || '야구공작소 07번 대표작'}
                  </div>
                  <div className="text-[11px] text-[#8b949e]">
                    {heroVisuals.sub1.description || '복잡한 세부 지표의 직관적 시각화 원칙'}
                  </div>
                  <div className="pt-2 border-t border-[#30363d] flex items-center justify-between text-[10px] font-mono text-[#8b949e]">
                    <span className="text-[#4ade80] font-bold">
                      {heroVisuals.sub1.metricBadge || 'CASE STUDY'}
                    </span>
                    <ExternalLink className="w-3 h-3 text-[#4ade80]" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CARD 2: MAIN (WBC Seating - Center Showcase) */}
        {/* ======================================================== */}
        {(selectedCardTab === 'all' || selectedCardTab === 'main') && (
          <div className="p-5 rounded-2xl bg-white border-2 border-[#07732C] hover:shadow-md transition-all space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E3DC]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#07732C] text-white">
                  CARD 02 · 중앙 메인 쇼케이스
                </span>
                <span className="text-xs font-bold text-[#111111]">
                  {heroVisuals.main.subTag || '일간스포츠 필드클럽'} — {heroVisuals.main.label || 'WBC 좌석 카드뉴스'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#07732C] font-bold">
                ★ 메인 하이라이트 카드
              </span>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left Column: 출처 태그, 배지, 타이틀, 설명 */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#07732C] mb-1">
                    ① 출처 / 브랜드 텍스트 (Sub-Tag) ★
                  </label>
                  <input
                    type="text"
                    value={heroVisuals.main.subTag || ''}
                    onChange={(e) => updateCard('main', { subTag: e.target.value })}
                    placeholder="일간스포츠 필드클럽"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono font-bold text-[#111111] focus:bg-white focus:border-[#07732C]"
                  />
                  <p className="text-[10px] text-[#71716A] font-mono mt-1">
                    카드 상단 우측에 노출되는 출처명 (기본값: 일간스포츠 필드클럽)
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                      ② 카테고리 배지
                    </label>
                    <input
                      type="text"
                      value={heroVisuals.main.badge || ''}
                      onChange={(e) => updateCard('main', { badge: e.target.value })}
                      placeholder="OFFICIAL MEDIA"
                      className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#111111] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                      ③ 상단 펄스 성과 배지
                    </label>
                    <input
                      type="text"
                      value={heroVisuals.main.metricBadge || ''}
                      onChange={(e) => updateCard('main', { metricBadge: e.target.value })}
                      placeholder="327,742 VIEWS"
                      className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#111111] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                    ④ 카드 메인 타이틀 (Card Title)
                  </label>
                  <input
                    type="text"
                    value={heroVisuals.main.label || ''}
                    onChange={(e) => updateCard('main', { label: e.target.value })}
                    placeholder="일간스포츠 WBC 좌석 콘텐츠"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-bold text-[#111111] focus:bg-white focus:border-[#07732C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                    ⑤ 서브 설명 문구 (Subtitle Description)
                  </label>
                  <textarea
                    rows={2}
                    value={heroVisuals.main.description || ''}
                    onChange={(e) => updateCard('main', { description: e.target.value })}
                    placeholder="팬이 즉각 선택하고 토론하는 1인칭 참여형 포맷 기획"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs text-[#111111] focus:bg-white focus:border-[#07732C]"
                  />
                </div>
              </div>

              {/* Right Column: 3대 지표 수치, 연결 프로젝트, 이미지 */}
              <div className="space-y-3">
                {/* 3 Metrics (Views, Shares, Likes) */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                    ⑥ 3대 반응 지표 수치
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="block text-[10px] font-mono text-[#38bdf8] mb-0.5">조회수</span>
                      <input
                        type="text"
                        value={heroVisuals.main.viewsCount || ''}
                        onChange={(e) => updateCard('main', { viewsCount: e.target.value })}
                        placeholder="327K"
                        className="w-full px-2 py-1.5 rounded border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-center"
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-[#4ade80] mb-0.5">공유</span>
                      <input
                        type="text"
                        value={heroVisuals.main.sharesCount || ''}
                        onChange={(e) => updateCard('main', { sharesCount: e.target.value })}
                        placeholder="7.1K"
                        className="w-full px-2 py-1.5 rounded border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-center"
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-[#f43f5e] mb-0.5">좋아요</span>
                      <input
                        type="text"
                        value={heroVisuals.main.likesCount || ''}
                        onChange={(e) => updateCard('main', { likesCount: e.target.value })}
                        placeholder="6.4K"
                        className="w-full px-2 py-1.5 rounded border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-center"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                      ⑦ 하단 링크 텍스트
                    </label>
                    <input
                      type="text"
                      value={heroVisuals.main.linkText || ''}
                      onChange={(e) => updateCard('main', { linkText: e.target.value })}
                      placeholder="VIEW DETAILS ↗"
                      className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#111111] focus:bg-white"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-mono font-bold text-[#555550]">
                        ⑧ 클릭 시 연결 프로젝트
                      </label>
                      {onNavigateToProject && (
                        <button
                          type="button"
                          onClick={() => onNavigateToProject(heroVisuals.main.projectId)}
                          className="text-[10px] font-mono text-[#07732C] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>상세 내용 편집</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                    <select
                      value={heroVisuals.main.projectId || ''}
                      onChange={(e) => updateCard('main', { projectId: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#111111] focus:bg-white"
                    >
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({p.category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload & URL */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                    ⑨ 카드 배경 이미지 (Image)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-[#0f172a] overflow-hidden border border-[#DCDAD2] shrink-0">
                      <img
                        src={heroVisuals.main.url}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          onFileUpload(e, (dataUrl) => updateCard('main', { url: dataUrl }))
                        }
                        className="text-xs font-mono w-full"
                      />
                      <input
                        type="text"
                        value={heroVisuals.main.url || ''}
                        onChange={(e) => updateCard('main', { url: e.target.value })}
                        placeholder="이미지 URL 직접 입력"
                        className="w-full px-2.5 py-1 rounded border border-[#DCDAD2] bg-[#FAF9F5] text-[11px] font-mono text-[#71716A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Mini Card Live Preview */}
                <div className="p-3.5 rounded-xl bg-[#0f172a] text-[#F4F3EF] border border-[#1e293b] space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#94a3b8]">
                    <span className="px-1.5 py-0.5 rounded bg-[#1e3a8a] text-[#93c5fd] font-bold">
                      {heroVisuals.main.badge || 'OFFICIAL MEDIA'}
                    </span>
                    <span className="text-[#38bdf8] font-bold">
                      {heroVisuals.main.subTag || '일간스포츠 필드클럽'}
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-white">
                    {heroVisuals.main.label || '일간스포츠 WBC 좌석 콘텐츠'}
                  </div>
                  <div className="text-[11px] text-[#94a3b8]">
                    {heroVisuals.main.description || '팬이 즉각 선택하고 토론하는 1인칭 참여형 포맷 기획'}
                  </div>
                  <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between text-[10px] font-mono text-[#94a3b8]">
                    <div className="flex items-center gap-3">
                      <span className="text-[#38bdf8] flex items-center gap-0.5">
                        <Eye className="w-3 h-3" /> {heroVisuals.main.viewsCount || '327K'}
                      </span>
                      <span className="text-[#4ade80] flex items-center gap-0.5">
                        <Share2 className="w-3 h-3" /> {heroVisuals.main.sharesCount || '7.1K'}
                      </span>
                      <span className="text-[#f43f5e] flex items-center gap-0.5">
                        <Heart className="w-3 h-3" /> {heroVisuals.main.likesCount || '6.4K'}
                      </span>
                    </div>
                    <span className="text-[#38bdf8] font-bold">
                      {heroVisuals.main.linkText || 'VIEW DETAILS ↗'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CARD 3: SUB 2 (Fanpage - Right) */}
        {/* ======================================================== */}
        {(selectedCardTab === 'all' || selectedCardTab === 'sub2') && (
          <div className="p-5 rounded-2xl bg-white border-2 border-[#E5E3DC] hover:border-[#07732C]/50 transition-all shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E3DC]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#0b1b3d] text-[#93c5fd]">
                  CARD 03 · 우측 보조 카드
                </span>
                <span className="text-xs font-bold text-[#111111]">
                  {heroVisuals.sub2.subTag || 'todaybluewave'} — {heroVisuals.sub2.label || '팬페이지 & SNS 운영'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#71716A]">
                클릭 시: {projects.find((p) => p.id === heroVisuals.sub2.projectId)?.title || heroVisuals.sub2.projectId}
              </span>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left Column: 출처/브랜드 태그 & 카테고리 배지 */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#07732C] mb-1">
                    ① 출처 / 브랜드 텍스트 (Sub-Tag) ★
                  </label>
                  <input
                    type="text"
                    value={heroVisuals.sub2.subTag || ''}
                    onChange={(e) => updateCard('sub2', { subTag: e.target.value })}
                    placeholder="todaybluewave"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono font-bold text-[#111111] focus:bg-white focus:border-[#07732C]"
                  />
                  <p className="text-[10px] text-[#71716A] font-mono mt-1">
                    카드 상단 우측에 노출되는 채널명 (기본값: todaybluewave)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                    ② 카테고리 배지 (Category Badge)
                  </label>
                  <input
                    type="text"
                    value={heroVisuals.sub2.badge || ''}
                    onChange={(e) => updateCard('sub2', { badge: e.target.value })}
                    placeholder="OWNED SNS"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#111111] focus:bg-white focus:border-[#07732C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                    ③ 카드 메인 타이틀 (Card Title)
                  </label>
                  <input
                    type="text"
                    value={heroVisuals.sub2.label || ''}
                    onChange={(e) => updateCard('sub2', { label: e.target.value })}
                    placeholder="todaybluewave 팬페이지"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-bold text-[#111111] focus:bg-white focus:border-[#07732C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                    ④ 서브 설명 문구 (Subtitle Description)
                  </label>
                  <textarea
                    rows={2}
                    value={heroVisuals.sub2.description || ''}
                    onChange={(e) => updateCard('sub2', { description: e.target.value })}
                    placeholder="1인 기획·제작·운영 및 게시물별 데이터 로깅"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs text-[#111111] focus:bg-white focus:border-[#07732C]"
                  />
                </div>
              </div>

              {/* Right Column: 지표 배지, 연결 프로젝트, 이미지 */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                      ⑤ 하단 배지 텍스트
                    </label>
                    <input
                      type="text"
                      value={heroVisuals.sub2.metricBadge || ''}
                      onChange={(e) => updateCard('sub2', { metricBadge: e.target.value })}
                      placeholder="5,456 MAX VIEWS"
                      className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#111111] focus:bg-white"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-mono font-bold text-[#555550]">
                        ⑥ 클릭 시 연결 프로젝트
                      </label>
                      {onNavigateToProject && (
                        <button
                          type="button"
                          onClick={() => onNavigateToProject(heroVisuals.sub2.projectId)}
                          className="text-[10px] font-mono text-[#07732C] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>상세 내용 편집</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                    <select
                      value={heroVisuals.sub2.projectId || ''}
                      onChange={(e) => updateCard('sub2', { projectId: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#111111] focus:bg-white"
                    >
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({p.category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload & URL */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                    ⑦ 카드 배경 이미지 (Image)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-[#0b1b3d] overflow-hidden border border-[#DCDAD2] shrink-0">
                      <img
                        src={heroVisuals.sub2.url}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          onFileUpload(e, (dataUrl) => updateCard('sub2', { url: dataUrl }))
                        }
                        className="text-xs font-mono w-full"
                      />
                      <input
                        type="text"
                        value={heroVisuals.sub2.url || ''}
                        onChange={(e) => updateCard('sub2', { url: e.target.value })}
                        placeholder="이미지 URL 직접 입력"
                        className="w-full px-2.5 py-1 rounded border border-[#DCDAD2] bg-[#FAF9F5] text-[11px] font-mono text-[#71716A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Mini Card Live Preview */}
                <div className="p-3 rounded-xl bg-[#0b1b3d] text-[#F4F3EF] border border-[#1e40af]/50 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#93c5fd]">
                    <span className="px-1.5 py-0.5 rounded bg-[#1d4ed8] text-white font-bold">
                      {heroVisuals.sub2.badge || 'OWNED SNS'}
                    </span>
                    <span className="text-[#60a5fa] font-bold">
                      {heroVisuals.sub2.subTag || 'todaybluewave'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white">
                    {heroVisuals.sub2.label || 'todaybluewave 팬페이지'}
                  </div>
                  <div className="text-[11px] text-[#93c5fd]/80">
                    {heroVisuals.sub2.description || '1인 기획·제작·운영 및 게시물별 데이터 로깅'}
                  </div>
                  <div className="pt-2 border-t border-[#1e40af]/50 flex items-center justify-between text-[10px] font-mono text-[#93c5fd]">
                    <span>{heroVisuals.sub2.metricBadge || '5,456 MAX VIEWS'}</span>
                    <ExternalLink className="w-3 h-3 text-[#60a5fa]" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
