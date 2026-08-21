import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  GraduationCap,
  Activity,
  FolderGit2,
  Wrench,
  Mail,
  Phone,
  User,
  FileText,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Award,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { siteConfig, openResumeModal, openProjectModal } = usePortfolio();
  const [imgError, setImgError] = useState(false);

  // Profile photo fallback SVG if local file isn't uploaded yet
  const defaultAvatarSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="100%" height="100%">
      <defs>
        <linearGradient id="avatarBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#111827"/>
          <stop offset="50%" stop-color="#0f291e"/>
          <stop offset="100%" stop-color="#07732C"/>
        </linearGradient>
      </defs>
      <rect width="400" height="480" fill="url(#avatarBg)"/>
      <circle cx="200" cy="180" r="75" fill="#1f2937" stroke="#4ade80" stroke-width="3"/>
      <!-- Stylized silhouette -->
      <circle cx="200" cy="155" r="42" fill="#E5E3DC"/>
      <path d="M120 270 C130 205, 270 205, 280 270 Z" fill="#E5E3DC"/>
      <!-- Sports cap outline -->
      <path d="M158 135 C165 110, 235 110, 242 135 Z" fill="#07732C"/>
      <path d="M150 135 L245 130 C255 130, 260 142, 245 145 Z" fill="#07732C"/>
      <!-- Text badge -->
      <rect x="80" y="320" width="240" height="40" rx="20" fill="#111827" stroke="#07732C" stroke-width="2"/>
      <text x="200" y="346" fill="#4ade80" font-family="'Pretendard', sans-serif" font-weight="800" font-size="16" text-anchor="middle">HONG GIMIN · PROFILE</text>
      <text x="200" y="390" fill="#9ca3af" font-family="'Pretendard', sans-serif" font-size="13" text-anchor="middle">assets/profile-photo.jpg</text>
    </svg>
  `)}`;

  const photoSrc = imgError
    ? defaultAvatarSvg
    : siteConfig.profilePhoto || 'assets/profile-photo.jpg';

  const educationList = siteConfig.educationList || [
    { id: 'edu-1', title: '진광고등학교', desc: '졸업' },
    { id: 'edu-2', title: '한림대학교', desc: '입학 및 재학' },
    { id: 'edu-3', title: '디지털미디어콘텐츠전공', desc: '주전공 (미디어 기획 및 시각화)' },
    { id: 'edu-4', title: '광고홍보학과', desc: '복수전공 (마케팅 커뮤니케이션)' },
    { id: 'edu-5', title: '스포츠마케팅 전문인력 양성과정', desc: '프로스포츠 산업 및 실무 수료' },
  ];

  const activityList = siteConfig.activityList || [
    { id: 'act-1', name: '일간스포츠 필드클럽', role: '1기 공식 크리에이터 (32만 뷰 바이럴 달성)', tag: 'Media' },
    { id: 'act-2', name: '야구공작소', role: '미디어팀 에디토리얼 & 인포그래픽 디자이너 (13편)', tag: 'Editorial' },
    { id: 'act-3', name: 'todaybluewave', role: '스포츠 이슈 & 데이터 분석 1인 미디어 운영', tag: 'Owned SNS' },
    { id: 'act-4', name: 'OLDBOYS', role: '야구 동아리 회장 (70+ 규모 총괄 리더십)', tag: 'Leadership' },
    { id: 'act-5', name: 'ONLIONS KBO', role: '구단 팬페이지 기획 및 실시간 피드 발행', tag: 'Fanpage' },
    { id: 'act-6', name: '원주 DB 프로미', role: 'KBL 프로농구 홈경기 이벤트팀 현장 운영', tag: 'Pro Field' },
  ];

  const projectList = siteConfig.profileProjectList || [
    {
      id: 'pp-1',
      title: '일간스포츠 콘텐츠',
      desc: 'WBC 대표팀 전세기 좌석 배치 카드뉴스 (32.7만 뷰 · 7,181회 자발적 공유)',
      projectId: 'fieldclub',
    },
    {
      id: 'pp-2',
      title: '야구공작소 콘텐츠',
      desc: '13편의 세이버메트릭스 복합 데이터 인포그래픽 시각화 시스템 구축',
      projectId: 'baseball-workshop',
    },
    {
      id: 'pp-3',
      title: 'OLDBOYS 행사 기획',
      desc: '동아리 30명/20명 단체 직관 100% 미션 참여 및 야구장 사진 공모전 운영',
      projectId: 'oldboys',
    },
    {
      id: 'pp-4',
      title: 'adidas 제안서',
      desc: '트레이닝 카테고리 확장 전략 피치덱 (3C 분석 및 온·오프라인 액티베이션, 최종 4위)',
      projectId: 'adidas',
    },
  ];

  const skills = siteConfig.skills || [
    { id: 'skill-1', category: 'Design & Visual', items: ['Photoshop', 'Illustrator', 'Figma', '인포그래픽 설계'] },
    { id: 'skill-2', category: 'Video & Motion', items: ['Premiere Pro', 'After Effects', '숏폼 영상 편집'] },
    { id: 'skill-3', category: 'Office & Data', items: ['Excel', 'PowerPoint', '인스타그램 인사이트 지표 분석'] },
  ];

  return (
    <section id="profile" className="py-20 lg:py-28 bg-[#F4F3EF] border-t border-[#E5E3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#E5E3DC] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#71716A] tracking-wider uppercase mb-2">
              {(() => {
                const rawTag = siteConfig.profileSectionTag || '02 // ABOUT ME · MY PROFILE';
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
                    <span className="text-[#07732C] font-bold">02 //</span>
                    <span>{rawTag}</span>
                  </>
                );
              })()}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight whitespace-pre-line break-keep">
              {siteConfig.profileSectionTitle || '스포츠 콘텐츠 마케터 홍기민 프로필'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#555550] whitespace-pre-line break-keep">
              {siteConfig.profileSectionSub || '학업, 대외활동, 프로젝트 경험, 보유 기술을 한눈에 확인할 수 있는 프로필입니다.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="profile-cv-open-btn"
              onClick={openResumeModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] transition-colors shadow-xs cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{siteConfig.profileCvButtonText || '이력서 (CV) 전문 열람'}</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Profile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Profile Photo & Basic Contact Card (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Photo Card */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E3DC] p-5 shadow-xs overflow-hidden">
              <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-[#111111] border border-[#E5E3DC]">
                <img
                  src={photoSrc}
                  alt={`${siteConfig.name} 프로필 사진`}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
                
                {/* Status Overlay Pill */}
                <div className="absolute top-3 left-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111]/80 backdrop-blur-md text-white text-[11px] font-mono font-bold border border-white/20 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></span>
                    <span>READY TO JOIN 2026</span>
                  </div>
                </div>

                {/* Subtle bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 to-transparent flex items-end p-3.5">
                  <span className="text-[11px] font-mono text-white/95 font-semibold tracking-wide">
                    {siteConfig.name} · {siteConfig.roleTitle || 'SPORTS MARKETER'}
                  </span>
                </div>
              </div>

              {/* Name & Title */}
              <div className="mt-5 pb-4 border-b border-[#E5E3DC]">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-[#111111]">
                    {siteConfig.name}
                  </h3>
                  <span className="text-xs font-mono text-[#71716A]">Hong Gimin</span>
                </div>
                <div className="mt-1 text-xs font-mono font-bold text-[#07732C] tracking-wide uppercase">
                  {siteConfig.roleTitle}
                </div>
              </div>

              {/* Basic Contact Info List */}
              <div className="mt-4 space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-[#FAF9F5] border border-[#E5E3DC]/60">
                  <span className="flex items-center gap-2 text-[#71716A]">
                    <Phone className="w-3.5 h-3.5 text-[#07732C]" />
                    <span>전화번호</span>
                  </span>
                  <span className="font-bold text-[#111111]">{siteConfig.phone || '010-XXXX-XXXX'}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-[#FAF9F5] border border-[#E5E3DC]/60">
                  <span className="flex items-center gap-2 text-[#71716A]">
                    <Mail className="w-3.5 h-3.5 text-[#07732C]" />
                    <span>이메일</span>
                  </span>
                  <span className="font-bold text-[#111111]">{siteConfig.email}</span>
                </div>
              </div>

              {/* Core Strength Quote */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#E8F4EC] border border-[#07732C]/20 text-xs text-[#222220] leading-relaxed">
                <p className="font-semibold italic whitespace-pre-line break-keep">
                  "{siteConfig.aboutPhilosophy}"
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Education, Activity, Project/Experience, Link & Skill (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. EDUCATION */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E3DC] p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E5E3DC]">
                <GraduationCap className="w-4 h-4 text-[#07732C]" />
                <h3 className="text-sm font-mono font-bold text-[#07732C] tracking-wider uppercase">
                  EDUCATION (학업 및 교육)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {educationList.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#07732C] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#111111] text-sm whitespace-pre-line break-keep">{edu.title}</div>
                      <div className="text-[#555550] mt-0.5 whitespace-pre-line break-keep">{edu.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. ACTIVITY */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E3DC] p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E5E3DC]">
                <Activity className="w-4 h-4 text-[#07732C]" />
                <h3 className="text-sm font-mono font-bold text-[#07732C] tracking-wider uppercase">
                  ACTIVITY (대외활동 및 조직 리더십)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {activityList.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] hover:border-[#07732C]/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-sm text-[#111111] whitespace-pre-line break-keep">{act.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F4EC] text-[#07732C] border border-[#07732C]/20 shrink-0">
                          {act.tag}
                        </span>
                      </div>
                      <p className="text-[#555550] text-xs leading-relaxed whitespace-pre-line break-keep">{act.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. PROJECT / EXPERIENCE */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E3DC] p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E5E3DC]">
                <FolderGit2 className="w-4 h-4 text-[#07732C]" />
                <h3 className="text-sm font-mono font-bold text-[#07732C] tracking-wider uppercase">
                  PROJECT / EXPERIENCE (주요 프로젝트 및 성과)
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {projectList.map((proj, idx) => (
                  <div
                    key={proj.id || idx}
                    onClick={() => {
                      if (proj.projectId) {
                        openProjectModal(proj.projectId);
                      }
                    }}
                    className={`p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group ${
                      proj.projectId
                        ? 'hover:border-[#07732C] hover:bg-[#E8F4EC]/30 cursor-pointer'
                        : 'cursor-default'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#07732C]">0{idx + 1}.</span>
                        <span
                          className={`font-bold text-sm text-[#111111] whitespace-pre-line break-keep ${
                            proj.projectId ? 'group-hover:text-[#07732C] transition-colors' : ''
                          }`}
                        >
                          {proj.title}
                        </span>
                      </div>
                      <p className="text-[#555550] mt-1 text-xs leading-relaxed whitespace-pre-line break-keep">
                        {proj.desc}
                      </p>
                    </div>
                    {proj.projectId && (
                      <span className="text-xs font-mono font-bold text-[#07732C] shrink-0 group-hover:underline flex items-center gap-1">
                        상세보기 ↗
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 4. SKILL */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E3DC] p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E5E3DC]">
                <Wrench className="w-4 h-4 text-[#07732C]" />
                <h3 className="text-sm font-mono font-bold text-[#07732C] tracking-wider uppercase">
                  SKILL (실무 역량 및 사용 툴)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {skills.map((skillGroup, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC]">
                    <div className="font-bold text-xs font-mono text-[#07732C] uppercase mb-2">
                      {skillGroup.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="px-2 py-1 rounded bg-white text-[#222220] border border-[#E5E3DC] text-[11px] font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
