import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { AdminResumeTab } from './AdminResumeTab';
import { SectionHeaderCard } from './admin/SectionHeaderCard';
import { HeroVisualCardsEditor } from './admin/HeroVisualCardsEditor';
import { ProfileProjectEditor } from './admin/ProfileProjectEditor';
import {
  Project,
  ExperienceItem,
  WorkshopGraphic,
  NavigationItem,
  ProfileEducationItem,
  ProfileActivityItem,
  ProfileProjectItem,
  SkillGroup,
  MetricItem,
  ProjectImage,
} from '../types';
import {
  X,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Download,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  MoveUp,
  MoveDown,
  Layers,
  FileText,
  Activity,
  Sliders,
  User,
  Layout,
  Briefcase,
  FolderPlus,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  Tag,
  BarChart3,
  Phone,
  Mail,
  Instagram,
  Settings,
  HelpCircle,
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    isAdminModalOpen,
    closeAdminModal,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    siteConfig,
    updateSiteConfig,
    projects,
    updateProject,
    addProject,
    deleteProject,
    reorderProjects,
    experience,
    updateExperience,
    addExperience,
    deleteExperience,
    updateWorkshopGraphic,
    addWorkshopGraphic,
    deleteWorkshopGraphic,
    moveWorkshopGraphic,
    setWorkshopGraphics,
    reorderWorkshopOrder,
    resetToDefaultData,
    exportDataJson,
    importDataJson,
  } = usePortfolio();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'general' | 'hero' | 'profile' | 'experience' | 'projects' | 'contact' | 'resume' | 'backup'
  >('dashboard');
  const [selectedEditProjectId, setSelectedEditProjectId] = useState<string>(projects[0]?.id || '');
  const [projectSubTab, setProjectSubTab] = useState<'basic' | 'content' | 'metrics' | 'images'>('basic');
  const [headerHubTab, setHeaderHubTab] = useState<'all' | '01' | '02' | '03' | '04' | '05'>('all');
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [deleteConfirmProjectId, setDeleteConfirmProjectId] = useState<string | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  if (!isAdminModalOpen) return null;

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 2500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setAuthError('');
      setPasswordInput('');
      showToast('관리자 인증 완료');
    } else {
      setAuthError('비밀번호가 올바르지 않습니다.');
    }
  };

  // Helper for image upload (converting file to base64 with automatic client-side optimization)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value so re-selecting same file triggers change handler
    const targetInput = e.target;

    // If SVG or GIF or small file (<80KB), load directly
    if (file.type === 'image/svg+xml' || file.type === 'image/gif' || file.size < 80 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onSuccess(reader.result);
          showToast('이미지가 성공적으로 업로드되었습니다.');
          targetInput.value = '';
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    // For larger raster images, downscale to max 1600px width/height and compress
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result;
      if (typeof rawDataUrl !== 'string') {
        targetInput.value = '';
        return;
      }

      const img = new Image();
      img.onload = () => {
        const MAX_DIMENSION = 1600;
        let { width, height } = img;

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          let optimizedDataUrl = '';
          try {
            optimizedDataUrl = canvas.toDataURL('image/webp', 0.85);
          } catch {
            optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          }
          onSuccess(optimizedDataUrl || rawDataUrl);
        } else {
          onSuccess(rawDataUrl);
        }
        showToast('이미지가 최적화되어 성공적으로 업로드되었습니다.');
        targetInput.value = '';
      };
      img.onerror = () => {
        onSuccess(rawDataUrl);
        showToast('이미지가 업로드되었습니다.');
        targetInput.value = '';
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const selectedEditProject = projects.find((p) => p.id === selectedEditProjectId) || projects[0];

  // Projects CRUD helpers
  const handleCreateNewProject = () => {
    const newId = `project-${Date.now()}`;
    const nextOrderNum = String(projects.length + 1).padStart(2, '0');
    const newProj: Project = {
      id: newId,
      order: nextOrderNum,
      title: '새 프로젝트 제목',
      englishTitle: 'NEW PROJECT TITLE',
      category: 'CONTENT & SOCIAL',
      coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      summary: '새 프로젝트의 1줄 핵심 요약 문구입니다.',
      headline: '팬의 참여를 이끌어낸 콘텐츠 기획 및 실행',
      subHeadline: '기획 의도와 정량적 성과를 기록한 케이스 스터디입니다.',
      period: '2026.01 — 2026.06',
      visible: true,
      role: '콘텐츠 기획 · 카피라이팅 · 비주얼 디자인',
      context: '기획 배경 및 해결하고자 한 과제 내용입니다.',
      strategy: '실행 전략 및 디자인/채널 운영 방식입니다.',
      result: '정량적 반응 지표 및 팬 피드백 성과입니다.',
      takeaway: '프로젝트를 통해 얻은 핵심 역량과 인사이트입니다.',
      metrics: [
        { value: '100K+', label: '조회수', description: '총 조회수' },
        { value: '5,000+', label: '인게이지먼트', description: '좋아요 및 공유' },
      ],
      images: [
        {
          id: 'img-1',
          url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
          title: '대표 작업물 이미지',
          caption: '상세 설명 캡션',
          span: 'full',
          isFeatured: true,
        },
      ],
    };
    addProject(newProj);
    setSelectedEditProjectId(newId);
    showToast('새 프로젝트가 추가되었습니다.');
  };

  const handleCloneProject = (projToClone: Project) => {
    const newId = `${projToClone.id}-copy-${Date.now()}`;
    const clonedProj: Project = {
      ...projToClone,
      id: newId,
      title: `${projToClone.title} (사본)`,
      order: String(projects.length + 1).padStart(2, '0'),
    };
    addProject(clonedProj);
    setSelectedEditProjectId(newId);
    showToast('프로젝트가 복제되었습니다.');
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === projects.length - 1)) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;
    reorderProjects(newProjects);
    showToast('프로젝트 순서가 변경되었습니다.');
  };

  const handleDeleteProject = (projectId: string) => {
    const currentIdx = projects.findIndex((p) => p.id === projectId);
    const remaining = projects.filter((p) => p.id !== projectId);
    deleteProject(projectId);
    setDeleteConfirmProjectId(null);

    if (remaining.length > 0) {
      const nextIdx = Math.max(0, Math.min(currentIdx, remaining.length - 1));
      setSelectedEditProjectId(remaining[nextIdx].id);
    } else {
      setSelectedEditProjectId('');
    }
    showToast('프로젝트가 정상적으로 삭제되었습니다.');
  };

  return (
    <div
      id="admin-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center p-2 sm:p-4 lg:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAdminModal();
      }}
    >
      <div
        id="admin-modal-container"
        className="relative w-full max-w-6xl bg-[#F8F7F3] rounded-2xl shadow-2xl border border-[#DCDAD2] overflow-hidden my-auto flex flex-col min-h-[600px] max-h-[94vh]"
      >
        {/* Toast Notification */}
        {saveToast && (
          <div className="absolute top-4 right-16 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold shadow-lg animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Modal Top Bar */}
        <div className="bg-[#111111] text-[#F4F3EF] px-6 py-4 flex items-center justify-between border-b border-[#2A2A2A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#07732C] text-white">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono font-bold text-sm flex items-center gap-2">
                <span>PORTFOLIO ADMIN CMS</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#222222] text-[#4ade80] border border-[#333333]">
                  v3.0 COMPLETE
                </span>
              </div>
              <p className="text-xs text-[#888880] font-mono">
                {isAdminAuthenticated
                  ? '모든 텍스트, 이미지, 순서 및 프로젝트 실시간 수정'
                  : '관리자 인증 필요'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdminAuthenticated && (
              <button
                onClick={() => {
                  logoutAdmin();
                  showToast('관리자 로그아웃 되었습니다.');
                }}
                className="text-xs font-mono text-[#888880] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <Unlock className="w-3.5 h-3.5 text-[#4ade80]" />
                <span>로그아웃</span>
              </button>
            )}
            <button
              onClick={closeAdminModal}
              className="p-1.5 rounded-full bg-[#222222] hover:bg-[#333333] text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {!isAdminAuthenticated ? (
          /* Login View */
          <div className="p-8 sm:p-16 flex flex-col items-center justify-center flex-1 max-w-md mx-auto text-center">
            <div className="p-4 rounded-2xl bg-[#E8F4EC] border border-[#07732C]/30 text-[#07732C] mb-6">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight mb-2">
              관리자 모드 접속
            </h2>
            <p className="text-xs font-mono text-[#71716A] mb-6">
              포트폴리오의 모든 텍스트, 이미지, 프로젝트, 이력을 관리자 화면에서 실시간으로 편집할 수 있습니다.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCDAD2] bg-white text-[#111111] text-center font-mono text-lg tracking-widest focus:outline-hidden focus:border-[#07732C] shadow-xs"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-red-600 font-mono mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {authError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#07732C] text-white font-mono font-bold text-sm hover:bg-[#055822] transition-colors shadow-md cursor-pointer"
              >
                관리자 CMS 로그인
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-60 bg-[#EFECE6] border-b md:border-b-0 md:border-r border-[#DCDAD2] p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
              <div className="hidden md:block px-3 py-2 text-[11px] font-mono font-bold text-[#71716A] uppercase tracking-wider">
                CONTENT CMS TABS
              </div>

              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-[#07732C] text-white shadow-xs'
                    : 'text-[#555550] hover:bg-[#E5E3DC] hover:text-[#111111]'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>00. 대시보드</span>
              </button>

              <button
                onClick={() => setActiveTab('general')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'general'
                    ? 'bg-[#07732C] text-white shadow-xs'
                    : 'text-[#555550] hover:bg-[#E5E3DC] hover:text-[#111111]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>01. 기본 & 네비</span>
              </button>

              <button
                onClick={() => setActiveTab('hero')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'hero'
                    ? 'bg-[#07732C] text-white shadow-xs'
                    : 'text-[#555550] hover:bg-[#E5E3DC] hover:text-[#111111]'
                }`}
              >
                <Layout className="w-4 h-4" />
                <span>02. HERO 첫화면</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-[#07732C] text-white shadow-xs'
                    : 'text-[#555550] hover:bg-[#E5E3DC] hover:text-[#111111]'
                }`}
              >
                <User className="w-4 h-4" />
                <span>03. 프로필 (About)</span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'experience'
                    ? 'bg-[#07732C] text-white shadow-xs'
                    : 'text-[#555550] hover:bg-[#E5E3DC] hover:text-[#111111]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>04. 경력 타임라인</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-[#07732C] text-white shadow-xs'
                    : 'text-[#555550] hover:bg-[#E5E3DC] hover:text-[#111111]'
                }`}
              >
                <FolderPlus className="w-4 h-4" />
                <span>05. 프로젝트 관리</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'contact'
                    ? 'bg-[#07732C] text-white shadow-xs'
                    : 'text-[#555550] hover:bg-[#E5E3DC] hover:text-[#111111]'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>06. 연락처 & 푸터</span>
              </button>

              <button
                onClick={() => setActiveTab('resume')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'resume'
                    ? 'bg-[#07732C] text-white shadow-xs'
                    : 'text-[#555550] hover:bg-[#E5E3DC] hover:text-[#111111]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>07. 이력서 (CV) 관리</span>
              </button>

              <div className="my-2 border-t border-[#DCDAD2] hidden md:block"></div>

              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'backup'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#555550] hover:bg-[#E5E3DC] hover:text-[#111111]'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>08. 백업 & 복구</span>
              </button>
            </div>

            {/* Main Tab Panel Content */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-white">
              
              {/* ======================================================== */}
              {/* TAB 00: DASHBOARD */}
              {/* ======================================================== */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#111111] tracking-tight">
                      콘텐츠 관리 대시보드
                    </h3>
                    <p className="text-xs text-[#71716A] font-mono mt-1">
                      포트폴리오의 모든 구성 요소를 실시간으로 편집할 수 있습니다. 변경 사항은 즉시 로컬에 자동 저장됩니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC]">
                      <div className="text-xs font-mono text-[#71716A]">등록된 프로젝트</div>
                      <div className="text-2xl font-black text-[#07732C] mt-1">
                        {projects.length}개
                      </div>
                      <div className="text-[11px] text-[#888880] mt-1">
                        공개: {projects.filter((p) => p.visible !== false).length}개
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC]">
                      <div className="text-xs font-mono text-[#71716A]">경력 / 활동 이력</div>
                      <div className="text-2xl font-black text-[#111111] mt-1">
                        {experience.length}건
                      </div>
                      <div className="text-[11px] text-[#888880] mt-1">
                        타임라인 섹션 등록됨
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC]">
                      <div className="text-xs font-mono text-[#71716A]">야구공작소 인포그래픽</div>
                      <div className="text-2xl font-black text-[#111111] mt-1">
                        13편
                      </div>
                      <div className="text-[11px] text-[#888880] mt-1">
                        순서 및 그래픽 관리 가능
                      </div>
                    </div>
                  </div>

                  {/* Quick Shortcut Buttons */}
                  <div className="p-5 rounded-2xl bg-[#E8F4EC] border border-[#07732C]/20 space-y-3">
                    <h4 className="text-xs font-mono font-bold text-[#07732C] uppercase tracking-wider">
                      ⚡ 빠른 바로가기
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      <button
                        onClick={() => {
                          setHeaderHubTab('all');
                          setActiveTab('general');
                        }}
                        className="px-3 py-2 rounded-lg bg-[#07732C] text-white hover:bg-[#055822] font-bold cursor-pointer shadow-xs"
                      >
                        🎯 01~05 탭 타이틀·서브타이틀 통합 수정 (Hub) →
                      </button>
                      <button
                        onClick={() => setActiveTab('resume')}
                        className="px-3 py-2 rounded-lg bg-white text-[#07732C] border border-[#07732C] font-bold cursor-pointer"
                      >
                        📄 이력서(CV) 전문 열람 관리 →
                      </button>
                      <button
                        onClick={() => setActiveTab('hero')}
                        className="px-3 py-2 rounded-lg bg-white text-[#111111] border border-[#07732C]/30 hover:border-[#07732C] font-bold cursor-pointer"
                      >
                        01. Hero 문구 및 비주얼 카드 →
                      </button>
                      <button
                        onClick={() => setActiveTab('profile')}
                        className="px-3 py-2 rounded-lg bg-white text-[#111111] border border-[#07732C]/30 hover:border-[#07732C] font-bold cursor-pointer"
                      >
                        02. 프로필 & 학업/활동 수정 →
                      </button>
                      <button
                        onClick={() => setActiveTab('experience')}
                        className="px-3 py-2 rounded-lg bg-white text-[#111111] border border-[#07732C]/30 hover:border-[#07732C] font-bold cursor-pointer"
                      >
                        03. 경력 타임라인 관리 →
                      </button>
                      <button
                        onClick={() => setActiveTab('projects')}
                        className="px-3 py-2 rounded-lg bg-white text-[#111111] border border-[#07732C]/30 hover:border-[#07732C] font-bold cursor-pointer"
                      >
                        04. 프로젝트 추가 / KPI 수정 →
                      </button>
                      <button
                        onClick={() => setActiveTab('contact')}
                        className="px-3 py-2 rounded-lg bg-white text-[#111111] border border-[#07732C]/30 hover:border-[#07732C] font-bold cursor-pointer"
                      >
                        05. 연락처 & 푸터 문구 →
                      </button>
                      <button
                        onClick={() => setActiveTab('backup')}
                        className="px-3 py-2 rounded-lg bg-[#111111] text-white font-bold cursor-pointer"
                      >
                        전체 JSON 백업 내보내기 💾
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 01: GENERAL & NAVIGATION */}
              {/* ======================================================== */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#111111] tracking-tight">
                      사이트 기본 정보 & 네비게이션
                    </h3>
                    <p className="text-xs text-[#71716A] font-mono mt-1">
                      헤더 로고, 직무 타이틀, 상태 배지 및 상단 메뉴 링크를 관리합니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                        이름 (국문)
                      </label>
                      <input
                        type="text"
                        value={siteConfig.name}
                        onChange={(e) => updateSiteConfig({ name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono font-bold text-[#111111] focus:bg-white focus:border-[#07732C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                        영문 이름
                      </label>
                      <input
                        type="text"
                        value={siteConfig.englishName || 'Hong Gimin'}
                        onChange={(e) => updateSiteConfig({ englishName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#111111] focus:bg-white focus:border-[#07732C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                        직무명 (Role Title)
                      </label>
                      <input
                        type="text"
                        value={siteConfig.roleTitle}
                        onChange={(e) => updateSiteConfig({ roleTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono font-bold text-[#07732C] focus:bg-white focus:border-[#07732C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                        상태 배지 문구
                      </label>
                      <input
                        type="text"
                        value={siteConfig.statusBadge}
                        onChange={(e) => updateSiteConfig({ statusBadge: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#111111] focus:bg-white focus:border-[#07732C]"
                      />
                    </div>
                  </div>

                  {/* Section 1-5 Header & Title Management Hub */}
                  <div className="pt-5 border-t border-[#E5E3DC] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-extrabold text-[#111111] flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#07732C] text-white text-[11px] font-mono">
                            HUB
                          </span>
                          <span>01~05 탭별 타이틀 · 서브타이틀 통합 관리</span>
                        </h4>
                        <p className="text-xs text-[#71716A] font-mono mt-0.5">
                          1, 2, 3, 4, 5번 모든 탭의 3대 항목(상단 태그, 메인 타이틀, 서브 설명문구)을 한곳에서 일괄 비교하고 수정합니다.
                        </p>
                      </div>

                      {/* Filter Sub-Tabs */}
                      <div className="flex items-center gap-1 bg-[#EFECE6] p-1 rounded-xl shrink-0 overflow-x-auto">
                        {(['all', '01', '02', '03', '04', '05'] as const).map((tabKey) => (
                          <button
                            key={tabKey}
                            type="button"
                            onClick={() => setHeaderHubTab(tabKey)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                              headerHubTab === tabKey
                                ? 'bg-[#07732C] text-white shadow-xs'
                                : 'text-[#555550] hover:text-[#111111]'
                            }`}
                          >
                            {tabKey === 'all' ? '전체 보기' : `0${tabKey.replace('0', '')} 탭`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 pt-1">
                      {/* TAB 01 (Hero/Highlights) */}
                      {(headerHubTab === 'all' || headerHubTab === '01') && (
                        <SectionHeaderCard
                          sectionNumber="01"
                          sectionName="HIGHLIGHTS & HERO"
                          tagValue={siteConfig.heroCategoryTag || siteConfig.heroSectionTag || '01 // HIGHLIGHTS · SPORTS CONTENT & CREATIVE STRATEGY'}
                          onTagChange={(val) =>
                            updateSiteConfig({ heroCategoryTag: val, heroSectionTag: val })
                          }
                          tagPlaceholder="01 // HIGHLIGHTS · SPORTS CONTENT & CREATIVE STRATEGY"
                          titleValue={siteConfig.heroHeadline}
                          onTitleChange={(val) => updateSiteConfig({ heroHeadline: val })}
                          titlePlaceholder="팬이 무엇을 보고, 왜 반응하고, 어떻게 참여하는지까지."
                          subValue={siteConfig.heroSubHeadline}
                          onSubChange={(val) => updateSiteConfig({ heroSubHeadline: val })}
                          subPlaceholder="디지털 콘텐츠 기획 · 디자인 · SNS 운영 · 현장 실행을 연결합니다..."
                          isTextAreaTitle={true}
                          onJumpToTab={() => setActiveTab('hero')}
                        />
                      )}

                      {/* TAB 02 (Profile / About Me) */}
                      {(headerHubTab === 'all' || headerHubTab === '02') && (
                        <SectionHeaderCard
                          sectionNumber="02"
                          sectionName="ABOUT ME · MY PROFILE"
                          tagValue={siteConfig.profileSectionTag || '02 // ABOUT ME · MY PROFILE'}
                          onTagChange={(val) => updateSiteConfig({ profileSectionTag: val })}
                          tagPlaceholder="02 // ABOUT ME · MY PROFILE"
                          titleValue={siteConfig.profileSectionTitle || '스포츠 콘텐츠 마케터 홍기민 프로필'}
                          onTitleChange={(val) => updateSiteConfig({ profileSectionTitle: val })}
                          titlePlaceholder="스포츠 콘텐츠 마케터 홍기민 프로필"
                          subValue={siteConfig.profileSectionSub || '학업, 대외활동, 프로젝트 경험, 보유 기술을 한눈에 확인할 수 있는 프로필입니다.'}
                          onSubChange={(val) => updateSiteConfig({ profileSectionSub: val })}
                          subPlaceholder="학업, 대외활동, 프로젝트 경험, 보유 기술을 한눈에 확인할 수 있는 프로필입니다."
                          onJumpToTab={() => setActiveTab('profile')}
                        />
                      )}

                      {/* TAB 03 (Experience) */}
                      {(headerHubTab === 'all' || headerHubTab === '03') && (
                        <SectionHeaderCard
                          sectionNumber="03"
                          sectionName="EXPERIENCE & TRACK RECORD"
                          tagValue={siteConfig.experienceSectionTag || '03 // EXPERIENCE & TRACK RECORD'}
                          onTagChange={(val) => updateSiteConfig({ experienceSectionTag: val })}
                          tagPlaceholder="03 // EXPERIENCE & TRACK RECORD"
                          titleValue={siteConfig.experienceSectionTitle || '실무 및 조직 총괄 타임라인'}
                          onTitleChange={(val) => updateSiteConfig({ experienceSectionTitle: val })}
                          titlePlaceholder="실무 및 조직 총괄 타임라인"
                          subValue={siteConfig.experienceSectionSub || '단순한 보조가 아닌, 기획부터 실행·성과 측정까지 주도한 실무 이력입니다.'}
                          onSubChange={(val) => updateSiteConfig({ experienceSectionSub: val })}
                          subPlaceholder="단순한 보조가 아닌, 기획부터 실행·성과 측정까지 주도한 실무 이력입니다."
                          onJumpToTab={() => setActiveTab('experience')}
                        />
                      )}

                      {/* TAB 04 (Selected Work) */}
                      {(headerHubTab === 'all' || headerHubTab === '04') && (
                        <SectionHeaderCard
                          sectionNumber="04"
                          sectionName="SELECTED WORK & CASE STUDIES"
                          tagValue={siteConfig.workSectionTag || '04 // SELECTED WORK & CASE STUDIES'}
                          onTagChange={(val) => updateSiteConfig({ workSectionTag: val })}
                          tagPlaceholder="04 // SELECTED WORK & CASE STUDIES"
                          titleValue={siteConfig.workSectionTitle || '실제 성과와 실행 과정으로 증명하는 프로젝트'}
                          onTitleChange={(val) => updateSiteConfig({ workSectionTitle: val })}
                          titlePlaceholder="실제 성과와 실행 과정으로 증명하는 프로젝트"
                          subValue={siteConfig.workSectionSub || '예쁜 결과물에 머물지 않고, 기획 의도와 팬들의 반응 지표를 함께 기록한 5가지 핵심 사례입니다.'}
                          onSubChange={(val) => updateSiteConfig({ workSectionSub: val })}
                          subPlaceholder="예쁜 결과물에 머물지 않고, 기획 의도와 팬들의 반응 지표를 함께 기록한 5가지 핵심 사례입니다."
                          onJumpToTab={() => setActiveTab('projects')}
                        />
                      )}

                      {/* TAB 05 (Contact & Footer) */}
                      {(headerHubTab === 'all' || headerHubTab === '05') && (
                        <SectionHeaderCard
                          sectionNumber="05"
                          sectionName="GET IN TOUCH · CONTACT & ARCHIVE"
                          tagValue={siteConfig.contactSectionTag || '05 // GET IN TOUCH · CONTACT & ARCHIVE'}
                          onTagChange={(val) => updateSiteConfig({ contactSectionTag: val })}
                          tagPlaceholder="05 // GET IN TOUCH · CONTACT & ARCHIVE"
                          titleValue={siteConfig.contactHeadline || '콘텐츠가 팬에게 닿는 순간까지.'}
                          onTitleChange={(val) => updateSiteConfig({ contactHeadline: val })}
                          titlePlaceholder="콘텐츠가 팬에게 닿는 순간까지."
                          subValue={siteConfig.contactSub || '기획하고, 직접 만들고, 현장에서 확인하는 스포츠 콘텐츠 마케터 홍기민입니다.'}
                          onSubChange={(val) => updateSiteConfig({ contactSub: val })}
                          subPlaceholder="기획하고, 직접 만들고, 현장에서 확인하는 스포츠 콘텐츠 마케터 홍기민입니다."
                          isDarkTheme={true}
                          onJumpToTab={() => setActiveTab('contact')}
                        />
                      )}
                    </div>
                  </div>

                  {/* Navigation Links List */}
                  <div className="pt-4 border-t border-[#E5E3DC]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-mono font-bold text-[#07732C] uppercase tracking-wider">
                        상단 네비게이션 메뉴 목록
                      </h4>
                      <button
                        onClick={() => {
                          const currentNav = siteConfig.navigation || [];
                          const newNavItem: NavigationItem = {
                            id: `nav-${Date.now()}`,
                            label: 'NEW MENU',
                            href: '#top',
                            num: `0${currentNav.length + 1}`,
                            visible: true,
                          };
                          updateSiteConfig({ navigation: [...currentNav, newNavItem] });
                          showToast('새 메뉴가 추가되었습니다.');
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>메뉴 추가</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(siteConfig.navigation || []).map((nav, idx) => (
                        <div
                          key={nav.id || idx}
                          className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] flex flex-col sm:flex-row items-center gap-2 text-xs font-mono"
                        >
                          <input
                            type="text"
                            value={nav.num}
                            onChange={(e) => {
                              const updated = [...(siteConfig.navigation || [])];
                              updated[idx].num = e.target.value;
                              updateSiteConfig({ navigation: updated });
                            }}
                            className="w-16 px-2 py-1.5 rounded border border-[#DCDAD2] bg-white text-center font-bold text-[#07732C]"
                            placeholder="번호"
                          />
                          <input
                            type="text"
                            value={nav.label}
                            onChange={(e) => {
                              const updated = [...(siteConfig.navigation || [])];
                              updated[idx].label = e.target.value;
                              updateSiteConfig({ navigation: updated });
                            }}
                            className="w-32 px-2 py-1.5 rounded border border-[#DCDAD2] bg-white font-bold"
                            placeholder="메뉴명"
                          />
                          <input
                            type="text"
                            value={nav.href}
                            onChange={(e) => {
                              const updated = [...(siteConfig.navigation || [])];
                              updated[idx].href = e.target.value;
                              updateSiteConfig({ navigation: updated });
                            }}
                            className="flex-1 px-2 py-1.5 rounded border border-[#DCDAD2] bg-white"
                            placeholder="이동 앵커 (예: #profile, #work)"
                          />
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                const updated = [...(siteConfig.navigation || [])];
                                updated[idx].visible = nav.visible === false ? true : false;
                                updateSiteConfig({ navigation: updated });
                              }}
                              className={`p-1.5 rounded ${
                                nav.visible !== false ? 'bg-[#E8F4EC] text-[#07732C]' : 'bg-[#E5E3DC] text-[#888880]'
                              }`}
                              title="메뉴 표시 / 숨김"
                            >
                              {nav.visible !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => {
                                const updated = (siteConfig.navigation || []).filter((_, i) => i !== idx);
                                updateSiteConfig({ navigation: updated });
                                showToast('메뉴가 삭제되었습니다.');
                              }}
                              className="p-1.5 rounded bg-red-100 text-red-600 hover:bg-red-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 02: HERO SECTION */}
              {/* ======================================================== */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#111111] tracking-tight">
                      01. HERO 첫 화면 콘텐츠 & 이미지
                    </h3>
                    <p className="text-xs text-[#71716A] font-mono mt-1">
                      메인 헤드라인, 서브 설명문구, 2개 CTA 버튼 및 3개 대표 비주얼 카드를 수정합니다.
                    </p>
                  </div>

                  {/* Section 01 Header & Title Editor */}
                  <SectionHeaderCard
                    sectionNumber="01"
                    sectionName="HIGHLIGHTS & HERO"
                    tagValue={siteConfig.heroCategoryTag || siteConfig.heroSectionTag || '01 // HIGHLIGHTS · SPORTS CONTENT & CREATIVE STRATEGY'}
                    onTagChange={(val) =>
                      updateSiteConfig({ heroCategoryTag: val, heroSectionTag: val })
                    }
                    tagPlaceholder="01 // HIGHLIGHTS · SPORTS CONTENT & CREATIVE STRATEGY"
                    titleValue={siteConfig.heroHeadline}
                    onTitleChange={(val) => updateSiteConfig({ heroHeadline: val })}
                    titlePlaceholder="팬이 무엇을 보고, 왜 반응하고, 어떻게 참여하는지까지."
                    subValue={siteConfig.heroSubHeadline}
                    onSubChange={(val) => updateSiteConfig({ heroSubHeadline: val })}
                    subPlaceholder="디지털 콘텐츠 기획 · 디자인 · SNS 운영 · 현장 실행을 연결합니다..."
                    isTextAreaTitle={true}
                  />

                  <div className="space-y-4">
                    {/* Hero Buttons Config */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC]">
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#07732C] mb-1">
                          버튼 1 텍스트 (기본: SELECTED WORK)
                        </label>
                        <input
                          type="text"
                          value={siteConfig.heroCtaWorkText || 'SELECTED WORK'}
                          onChange={(e) => updateSiteConfig({ heroCtaWorkText: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white text-xs font-mono font-bold"
                        />
                        <input
                          type="text"
                          value={siteConfig.heroCtaWorkHref || '#work'}
                          onChange={(e) => updateSiteConfig({ heroCtaWorkHref: e.target.value })}
                          placeholder="이동 링크 (예: #work)"
                          className="w-full px-3 py-1.5 rounded border border-[#DCDAD2] bg-white text-xs font-mono mt-1.5"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                          버튼 2 텍스트 (기본: ABOUT ME)
                        </label>
                        <input
                          type="text"
                          value={siteConfig.heroCtaAboutText || 'ABOUT ME'}
                          onChange={(e) => updateSiteConfig({ heroCtaAboutText: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white text-xs font-mono font-bold"
                        />
                        <input
                          type="text"
                          value={siteConfig.heroCtaAboutHref || '#profile'}
                          onChange={(e) => updateSiteConfig({ heroCtaAboutHref: e.target.value })}
                          placeholder="이동 링크 (예: #profile)"
                          className="w-full px-3 py-1.5 rounded border border-[#DCDAD2] bg-white text-xs font-mono mt-1.5"
                        />
                      </div>
                    </div>

                    {/* 3 Hero Visual Cards Management */}
                    <div className="pt-4 border-t border-[#E5E3DC]">
                      <HeroVisualCardsEditor
                        heroVisuals={siteConfig.heroVisuals}
                        projects={projects}
                        onUpdateVisuals={(updated) => updateSiteConfig({ heroVisuals: updated })}
                        onFileUpload={handleFileUpload}
                        onNavigateToProject={(projId) => {
                          setSelectedEditProjectId(projId);
                          setActiveTab('projects');
                          showToast(`'${projects.find(p => p.id === projId)?.title || projId}' 프로젝트 편집으로 이동했습니다.`);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 03: PROFILE (ABOUT ME) */}
              {/* ======================================================== */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#111111] tracking-tight">
                      02. 프로필 (About Me) 상세 콘텐츠
                    </h3>
                    <p className="text-xs text-[#71716A] font-mono mt-1">
                      섹션 헤더, 프로필 사진, 연락처, 학업(Education), 활동(Activity), 프로젝트 요약 및 스킬(Skills)을 관리합니다.
                    </p>
                  </div>

                  {/* Section 02 Header & Title Editor */}
                  <SectionHeaderCard
                    sectionNumber="02"
                    sectionName="ABOUT ME · MY PROFILE"
                    tagValue={siteConfig.profileSectionTag || '02 // ABOUT ME · MY PROFILE'}
                    onTagChange={(val) => updateSiteConfig({ profileSectionTag: val })}
                    tagPlaceholder="02 // ABOUT ME · MY PROFILE"
                    titleValue={siteConfig.profileSectionTitle || '스포츠 콘텐츠 마케터 홍기민 프로필'}
                    onTitleChange={(val) => updateSiteConfig({ profileSectionTitle: val })}
                    titlePlaceholder="스포츠 콘텐츠 마케터 홍기민 프로필"
                    subValue={siteConfig.profileSectionSub || '학업, 대외활동, 프로젝트 경험, 보유 기술을 한눈에 확인할 수 있는 프로필입니다.'}
                    onSubChange={(val) => updateSiteConfig({ profileSectionSub: val })}
                    subPlaceholder="학업, 대외활동, 프로젝트 경험, 보유 기술을 한눈에 확인할 수 있는 프로필입니다."
                  />

                  {/* Quick Jump to Resume Editor */}
                  <div className="p-4 rounded-xl bg-[#E8F4EC] border border-[#07732C]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h5 className="font-bold text-xs text-[#07732C] flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span>이력서 (CV) 전문 열람 항목 통합 관리</span>
                      </h5>
                      <p className="text-[11px] text-[#555550] mt-0.5">
                        프로필 카드 하단 [이력서 CV 전문 열람] 버튼을 눌렀을 때 열리는 팝업의 모든 항목(요약, 경력, 대표프로젝트, 핵심역량, 학력, 수상, 스킬)을 수정하시려면 08번 탭으로 이동하세요.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('resume')}
                      className="px-3 py-1.5 rounded-lg bg-[#07732C] text-white font-mono font-bold text-xs hover:bg-[#055822] transition-colors shrink-0 cursor-pointer"
                    >
                      08. 이력서(CV) 관리 탭으로 이동 ➔
                    </button>
                  </div>

                  {/* Profile Photo & Basic Contact */}
                  <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-4">
                    <h4 className="text-xs font-mono font-bold text-[#07732C] uppercase tracking-wider">
                      프로필 사진 & 기본 연락처
                    </h4>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-24 h-28 rounded-xl overflow-hidden bg-[#111111] border border-[#DCDAD2] shrink-0 shadow-xs">
                        <img
                          src={siteConfig.profilePhoto || 'assets/profile-photo.jpg'}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <label className="block text-xs font-mono font-bold text-[#555550]">
                          프로필 사진 파일 업로드 (JPG, PNG, WEBP)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileUpload(e, (dataUrl) => updateSiteConfig({ profilePhoto: dataUrl }))
                          }
                          className="text-xs font-mono"
                        />
                        <p className="text-[11px] text-[#888880] font-mono">
                          권장 크기: 400x500px 이상 비율
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                      <div>
                        <label className="block text-[#71716A] mb-1">전화번호</label>
                        <input
                          type="text"
                          value={siteConfig.phone || '010-XXXX-XXXX'}
                          onChange={(e) => updateSiteConfig({ phone: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[#71716A] mb-1">이메일</label>
                        <input
                          type="text"
                          value={siteConfig.email}
                          onChange={(e) => updateSiteConfig({ email: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[#71716A] mb-1">인스타그램 URL</label>
                        <input
                          type="text"
                          value={siteConfig.instagram}
                          onChange={(e) => updateSiteConfig({ instagram: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white font-bold text-[#07732C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                        프로필 핵심 철학 문구 (Quote)
                      </label>
                      <textarea
                        rows={2}
                        value={siteConfig.aboutPhilosophy}
                        onChange={(e) => updateSiteConfig({ aboutPhilosophy: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-white text-xs font-bold text-[#111111]"
                      />
                    </div>
                  </div>

                  {/* 1. EDUCATION LIST */}
                  <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold text-[#07732C] uppercase tracking-wider">
                        1. EDUCATION (학업 및 교육)
                      </h4>
                      <button
                        onClick={() => {
                          const current = siteConfig.educationList || [];
                          const newItem: ProfileEducationItem = {
                            id: `edu-${Date.now()}`,
                            title: '새 학력/교육 과정',
                            desc: '전공 또는 설명',
                          };
                          updateSiteConfig({ educationList: [...current, newItem] });
                          showToast('학력 항목이 추가되었습니다.');
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>학력 추가</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(siteConfig.educationList || []).map((edu, idx) => (
                        <div
                          key={edu.id || idx}
                          className="p-2.5 rounded-lg bg-white border border-[#DCDAD2] flex items-center gap-2 text-xs font-mono"
                        >
                          <input
                            type="text"
                            value={edu.title}
                            onChange={(e) => {
                              const updated = [...(siteConfig.educationList || [])];
                              updated[idx].title = e.target.value;
                              updateSiteConfig({ educationList: updated });
                            }}
                            className="w-1/3 px-2 py-1 rounded border border-[#DCDAD2] font-bold text-[#111111]"
                            placeholder="학교 / 과정명"
                          />
                          <input
                            type="text"
                            value={edu.desc}
                            onChange={(e) => {
                              const updated = [...(siteConfig.educationList || [])];
                              updated[idx].desc = e.target.value;
                              updateSiteConfig({ educationList: updated });
                            }}
                            className="flex-1 px-2 py-1 rounded border border-[#DCDAD2] text-[#555550]"
                            placeholder="설명 / 전공"
                          />
                          <button
                            onClick={() => {
                              const updated = (siteConfig.educationList || []).filter((_, i) => i !== idx);
                              updateSiteConfig({ educationList: updated });
                              showToast('학력 항목이 삭제되었습니다.');
                            }}
                            className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. ACTIVITY LIST */}
                  <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold text-[#07732C] uppercase tracking-wider">
                        2. ACTIVITY (대외활동 및 조직 리더십)
                      </h4>
                      <button
                        onClick={() => {
                          const current = siteConfig.activityList || [];
                          const newItem: ProfileActivityItem = {
                            id: `act-${Date.now()}`,
                            name: '새 활동명',
                            role: '역할 및 담당 업무',
                            tag: 'Activity',
                          };
                          updateSiteConfig({ activityList: [...current, newItem] });
                          showToast('활동 항목이 추가되었습니다.');
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>활동 추가</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(siteConfig.activityList || []).map((act, idx) => (
                        <div
                          key={act.id || idx}
                          className="p-2.5 rounded-lg bg-white border border-[#DCDAD2] flex flex-col sm:flex-row items-center gap-2 text-xs font-mono"
                        >
                          <input
                            type="text"
                            value={act.name}
                            onChange={(e) => {
                              const updated = [...(siteConfig.activityList || [])];
                              updated[idx].name = e.target.value;
                              updateSiteConfig({ activityList: updated });
                            }}
                            className="w-full sm:w-1/4 px-2 py-1 rounded border border-[#DCDAD2] font-bold text-[#111111]"
                            placeholder="활동명 / 단체"
                          />
                          <input
                            type="text"
                            value={act.tag}
                            onChange={(e) => {
                              const updated = [...(siteConfig.activityList || [])];
                              updated[idx].tag = e.target.value;
                              updateSiteConfig({ activityList: updated });
                            }}
                            className="w-full sm:w-20 px-2 py-1 rounded border border-[#DCDAD2] text-center font-bold text-[#07732C]"
                            placeholder="태그 (예: Media)"
                          />
                          <input
                            type="text"
                            value={act.role}
                            onChange={(e) => {
                              const updated = [...(siteConfig.activityList || [])];
                              updated[idx].role = e.target.value;
                              updateSiteConfig({ activityList: updated });
                            }}
                            className="w-full sm:flex-1 px-2 py-1 rounded border border-[#DCDAD2] text-[#555550]"
                            placeholder="역할 및 성과 요약"
                          />
                          <button
                            onClick={() => {
                              const updated = (siteConfig.activityList || []).filter((_, i) => i !== idx);
                              updateSiteConfig({ activityList: updated });
                              showToast('활동 항목이 삭제되었습니다.');
                            }}
                            className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. PROJECT / EXPERIENCE LIST */}
                  <ProfileProjectEditor
                    projectList={siteConfig.profileProjectList || [
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
                    ]}
                    projects={projects}
                    onUpdate={(updatedList) => updateSiteConfig({ profileProjectList: updatedList })}
                    onShowToast={showToast}
                  />

                  {/* 4. SKILLS LIST */}
                  <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold text-[#07732C] uppercase tracking-wider">
                        4. SKILL (실무 툴 및 역량)
                      </h4>
                      <button
                        onClick={() => {
                          const current = siteConfig.skills || [];
                          const newGroup: SkillGroup = {
                            id: `skill-${Date.now()}`,
                            category: 'New Skill Group',
                            items: ['Skill A', 'Skill B'],
                          };
                          updateSiteConfig({ skills: [...current, newGroup] });
                          showToast('새 스킬 그룹이 추가되었습니다.');
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>그룹 추가</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(siteConfig.skills || []).map((skillGroup, idx) => (
                        <div
                          key={skillGroup.id || idx}
                          className="p-3 rounded-lg bg-white border border-[#DCDAD2] space-y-2 text-xs font-mono"
                        >
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={skillGroup.category}
                              onChange={(e) => {
                                const updated = [...(siteConfig.skills || [])];
                                updated[idx].category = e.target.value;
                                updateSiteConfig({ skills: updated });
                              }}
                              className="font-bold text-[#07732C] px-2 py-1 rounded border border-[#DCDAD2]"
                              placeholder="카테고리명"
                            />
                            <button
                              onClick={() => {
                                const updated = (siteConfig.skills || []).filter((_, i) => i !== idx);
                                updateSiteConfig({ skills: updated });
                                showToast('스킬 그룹이 삭제되었습니다.');
                              }}
                              className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div>
                            <input
                              type="text"
                              value={skillGroup.items.join(', ')}
                              onChange={(e) => {
                                const updated = [...(siteConfig.skills || [])];
                                updated[idx].items = e.target.value
                                  .split(',')
                                  .map((s) => s.trim())
                                  .filter(Boolean);
                                updateSiteConfig({ skills: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded border border-[#DCDAD2]"
                              placeholder="쉼표(,)로 구분하여 스킬 입력 (예: Photoshop, Figma, Excel)"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 04: EXPERIENCE TIMELINE */}
              {/* ======================================================== */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#111111] tracking-tight">
                      03. 경력 & 타임라인 관리
                    </h3>
                    <p className="text-xs text-[#71716A] font-mono mt-1">
                      섹션 헤더, 타임라인에 노출되는 활동 및 경력 항목을 추가, 수정, 삭제 및 순서 변경합니다.
                    </p>
                  </div>

                  {/* Section 03 Header & Title Editor */}
                  <SectionHeaderCard
                    sectionNumber="03"
                    sectionName="EXPERIENCE & TRACK RECORD"
                    tagValue={siteConfig.experienceSectionTag || '03 // EXPERIENCE & TRACK RECORD'}
                    onTagChange={(val) => updateSiteConfig({ experienceSectionTag: val })}
                    tagPlaceholder="03 // EXPERIENCE & TRACK RECORD"
                    titleValue={siteConfig.experienceSectionTitle || '실무 및 조직 총괄 타임라인'}
                    onTitleChange={(val) => updateSiteConfig({ experienceSectionTitle: val })}
                    titlePlaceholder="실무 및 조직 총괄 타임라인"
                    subValue={siteConfig.experienceSectionSub || '단순한 보조가 아닌, 기획부터 실행·성과 측정까지 주도한 실무 이력입니다.'}
                    onSubChange={(val) => updateSiteConfig({ experienceSectionSub: val })}
                    subPlaceholder="단순한 보조가 아닌, 기획부터 실행·성과 측정까지 주도한 실무 이력입니다."
                  />

                  <div className="flex items-center justify-between pt-2 border-t border-[#E5E3DC]">
                    <h4 className="text-xs font-mono font-bold text-[#07732C] uppercase tracking-wider">
                      타임라인 경력 및 활동 항목 목록
                    </h4>
                    <button
                      onClick={() => {
                        const newItem: ExperienceItem = {
                          id: `exp-${Date.now()}`,
                          period: '2026.01 — 현재',
                          title: '새 활동 / 기관명',
                          role: '직책 및 담당 역할',
                          description: '상세 업무 내용 및 기획·운영 성과를 기록합니다.',
                          badge: 'New Role',
                        };
                        addExperience(newItem);
                        showToast('경력 항목이 추가되었습니다.');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>경력 추가</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {experience.map((exp, idx) => (
                      <div
                        key={exp.id}
                        className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-3 text-xs font-mono"
                      >
                        <div className="flex items-center justify-between border-b border-[#E5E3DC] pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#07732C]">#{idx + 1}</span>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => updateExperience(exp.id, { period: e.target.value })}
                              className="px-2 py-1 rounded border border-[#DCDAD2] bg-white font-bold text-[#07732C]"
                              placeholder="활동 기간 (예: 2025.11 — 2026.06)"
                            />
                            <input
                              type="text"
                              value={exp.badge || ''}
                              onChange={(e) => updateExperience(exp.id, { badge: e.target.value })}
                              className="px-2 py-1 rounded border border-[#DCDAD2] bg-white text-[#07732C]"
                              placeholder="배지 태그 (예: 1기 크리에이터)"
                            />
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              disabled={idx === 0}
                              onClick={() => {
                                const newExp = [...experience];
                                const temp = newExp[idx];
                                newExp[idx] = newExp[idx - 1];
                                newExp[idx - 1] = temp;
                                // Save reordered array
                                newExp.forEach((item, i) => updateExperience(item.id, {}));
                              }}
                              className="p-1 rounded bg-[#E5E3DC] hover:bg-[#D5D3CC] disabled:opacity-30"
                              title="위로 이동"
                            >
                              <MoveUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              disabled={idx === experience.length - 1}
                              onClick={() => {
                                const newExp = [...experience];
                                const temp = newExp[idx];
                                newExp[idx] = newExp[idx + 1];
                                newExp[idx + 1] = temp;
                                newExp.forEach((item, i) => updateExperience(item.id, {}));
                              }}
                              className="p-1 rounded bg-[#E5E3DC] hover:bg-[#D5D3CC] disabled:opacity-30"
                              title="아래로 이동"
                            >
                              <MoveDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                deleteExperience(exp.id);
                                showToast('경력 항목이 삭제되었습니다.');
                              }}
                              className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[#71716A] mb-1 font-bold">활동/회사/기관명</label>
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                              className="w-full px-3 py-1.5 rounded border border-[#DCDAD2] bg-white font-bold text-sm text-[#111111]"
                            />
                          </div>
                          <div>
                            <label className="block text-[#71716A] mb-1 font-bold">직무 / 역할</label>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                              className="w-full px-3 py-1.5 rounded border border-[#DCDAD2] bg-white font-bold text-[#07732C]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[#71716A] mb-1">상세 설명</label>
                          <textarea
                            rows={2}
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 05: PROJECTS MANAGEMENT */}
              {/* ======================================================== */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-extrabold text-[#111111] tracking-tight">
                        04. 프로젝트 케이스 스터디 관리
                      </h3>
                      <p className="text-xs text-[#71716A] font-mono mt-1">
                        섹션 헤더, 전체 프로젝트의 추가, 복제, 삭제, 순서, 본문 서술, KPI 지표 및 갤러리 이미지를 편집합니다.
                      </p>
                    </div>

                    <button
                      onClick={handleCreateNewProject}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] shadow-xs cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>새 프로젝트 추가</span>
                    </button>
                  </div>

                  {/* Section 04 Header & Title Editor */}
                  <SectionHeaderCard
                    sectionNumber="04"
                    sectionName="SELECTED WORK & CASE STUDIES"
                    tagValue={siteConfig.workSectionTag || '04 // SELECTED WORK & CASE STUDIES'}
                    onTagChange={(val) => updateSiteConfig({ workSectionTag: val })}
                    tagPlaceholder="04 // SELECTED WORK & CASE STUDIES"
                    titleValue={siteConfig.workSectionTitle || '실제 성과와 실행 과정으로 증명하는 프로젝트'}
                    onTitleChange={(val) => updateSiteConfig({ workSectionTitle: val })}
                    titlePlaceholder="실제 성과와 실행 과정으로 증명하는 프로젝트"
                    subValue={siteConfig.workSectionSub || '예쁜 결과물에 머물지 않고, 기획 의도와 팬들의 반응 지표를 함께 기록한 5가지 핵심 사례입니다.'}
                    onSubChange={(val) => updateSiteConfig({ workSectionSub: val })}
                    subPlaceholder="예쁜 결과물에 머물지 않고, 기획 의도와 팬들의 반응 지표를 함께 기록한 5가지 핵심 사례입니다."
                  />

                  {/* Project Selector Horizontal Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {projects.map((proj, idx) => (
                      <button
                        key={proj.id}
                        onClick={() => setSelectedEditProjectId(proj.id)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer border ${
                          selectedEditProject?.id === proj.id
                            ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                            : 'bg-[#FAF9F5] text-[#555550] border-[#E5E3DC] hover:border-[#07732C]'
                        }`}
                      >
                        <span className="text-[#4ade80]">0{idx + 1}.</span>
                        <span>{proj.title}</span>
                        {proj.visible === false && (
                          <span className="text-[10px] bg-red-900/60 text-red-200 px-1.5 py-0.5 rounded">숨김</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Selected Project Editor Workspace */}
                  {selectedEditProject && (
                    <div className="space-y-6 pt-2">
                      
                      {/* Project Top Action Toolbar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#EFECE6] border border-[#DCDAD2]">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-xs text-[#07732C]">
                            선택됨: [{selectedEditProject.order}] {selectedEditProject.title}
                          </span>
                          <button
                            onClick={() => {
                              updateProject(selectedEditProject.id, {
                                visible: selectedEditProject.visible === false ? true : false,
                              });
                              showToast(
                                selectedEditProject.visible === false
                                  ? '프로젝트가 공개되었습니다.'
                                  : '프로젝트가 숨김 처리되었습니다.'
                              );
                            }}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold ${
                              selectedEditProject.visible !== false
                                ? 'bg-[#E8F4EC] text-[#07732C]'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {selectedEditProject.visible !== false ? (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>공개 상태</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>숨김 상태</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCloneProject(selectedEditProject)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#DCDAD2] text-xs font-mono font-bold hover:bg-[#FAF9F5] cursor-pointer"
                            title="프로젝트 복제"
                          >
                            <Copy className="w-3.5 h-3.5 text-[#555550]" />
                            <span>복제</span>
                          </button>

                          <button
                            onClick={() => {
                              const currentIndex = projects.findIndex((p) => p.id === selectedEditProject.id);
                              handleMoveProject(currentIndex, 'up');
                            }}
                            className="p-1.5 rounded-lg bg-white border border-[#DCDAD2] text-xs font-mono hover:bg-[#FAF9F5] cursor-pointer"
                            title="순서 위로 이동"
                          >
                            <MoveUp className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              const currentIndex = projects.findIndex((p) => p.id === selectedEditProject.id);
                              handleMoveProject(currentIndex, 'down');
                            }}
                            className="p-1.5 rounded-lg bg-white border border-[#DCDAD2] text-xs font-mono hover:bg-[#FAF9F5] cursor-pointer"
                            title="순서 아래로 이동"
                          >
                            <MoveDown className="w-4 h-4" />
                          </button>

                          {deleteConfirmProjectId === selectedEditProject.id ? (
                            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-red-50 border border-red-200">
                              <span className="text-xs font-mono font-bold text-red-700 px-1">정말 삭제할까요?</span>
                              <button
                                onClick={() => handleDeleteProject(selectedEditProject.id)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold cursor-pointer transition-colors shadow-xs"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>삭제 확인</span>
                              </button>
                              <button
                                onClick={() => setDeleteConfirmProjectId(null)}
                                className="px-2 py-1 rounded bg-white hover:bg-[#FAF9F5] border border-[#DCDAD2] text-[#555550] text-xs font-mono font-bold cursor-pointer transition-colors"
                              >
                                취소
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmProjectId(selectedEditProject.id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-mono font-bold hover:bg-red-200 cursor-pointer transition-colors"
                              title="프로젝트 삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>삭제</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Project Sub-Tab Navigation */}
                      <div className="flex border-b border-[#E5E3DC] gap-6 text-xs font-mono">
                        <button
                          onClick={() => setProjectSubTab('basic')}
                          className={`pb-2 font-bold transition-colors cursor-pointer ${
                            projectSubTab === 'basic'
                              ? 'border-b-2 border-[#07732C] text-[#07732C]'
                              : 'text-[#71716A] hover:text-[#111111]'
                          }`}
                        >
                          1. 기본 정보 & 커버
                        </button>
                        <button
                          onClick={() => setProjectSubTab('content')}
                          className={`pb-2 font-bold transition-colors cursor-pointer ${
                            projectSubTab === 'content'
                              ? 'border-b-2 border-[#07732C] text-[#07732C]'
                              : 'text-[#71716A] hover:text-[#111111]'
                          }`}
                        >
                          2. 4-Pillar 본문 서술
                        </button>
                        <button
                          onClick={() => setProjectSubTab('metrics')}
                          className={`pb-2 font-bold transition-colors cursor-pointer ${
                            projectSubTab === 'metrics'
                              ? 'border-b-2 border-[#07732C] text-[#07732C]'
                              : 'text-[#71716A] hover:text-[#111111]'
                          }`}
                        >
                          3. KPI 성과 지표 ({selectedEditProject.metrics?.length || 0})
                        </button>
                        <button
                          onClick={() => setProjectSubTab('images')}
                          className={`pb-2 font-bold transition-colors cursor-pointer ${
                            projectSubTab === 'images'
                              ? 'border-b-2 border-[#07732C] text-[#07732C]'
                              : 'text-[#71716A] hover:text-[#111111]'
                          }`}
                        >
                          4. 갤러리 이미지 ({selectedEditProject.images?.length || 0})
                        </button>
                      </div>

                      {/* Sub-Tab 1: Basic Info */}
                      {projectSubTab === 'basic' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                            <div>
                              <label className="block text-[#71716A] mb-1 font-bold">프로젝트 번호</label>
                              <input
                                type="text"
                                value={selectedEditProject.order}
                                onChange={(e) => updateProject(selectedEditProject.id, { order: e.target.value })}
                                className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[#71716A] mb-1 font-bold">프로젝트 카테고리</label>
                              <input
                                type="text"
                                value={selectedEditProject.category}
                                onChange={(e) => updateProject(selectedEditProject.id, { category: e.target.value })}
                                className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white font-bold text-[#07732C]"
                              />
                            </div>
                            <div>
                              <label className="block text-[#71716A] mb-1 font-bold">활동 기간</label>
                              <input
                                type="text"
                                value={selectedEditProject.period || '2025.11 — 2026.06'}
                                onChange={(e) => updateProject(selectedEditProject.id, { period: e.target.value })}
                                className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                            <div>
                              <label className="block text-[#71716A] mb-1 font-bold">프로젝트명 (국문)</label>
                              <input
                                type="text"
                                value={selectedEditProject.title}
                                onChange={(e) => updateProject(selectedEditProject.id, { title: e.target.value })}
                                className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white font-bold text-sm text-[#111111]"
                              />
                            </div>
                            <div>
                              <label className="block text-[#71716A] mb-1 font-bold">영문명 / 부제</label>
                              <input
                                type="text"
                                value={selectedEditProject.englishTitle || ''}
                                onChange={(e) => updateProject(selectedEditProject.id, { englishTitle: e.target.value })}
                                className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white text-xs"
                                placeholder="ENGLISH TITLE"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold text-[#71716A] mb-1">
                              한 줄 핵심 요약 (Summary)
                            </label>
                            <input
                              type="text"
                              value={selectedEditProject.summary}
                              onChange={(e) => updateProject(selectedEditProject.id, { summary: e.target.value })}
                              className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white text-xs"
                            />
                          </div>

                          {/* Cover Image Upload & Preview */}
                          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-3">
                            <label className="block text-xs font-mono font-bold text-[#07732C]">
                              대표 커버 이미지 (Cover Image)
                            </label>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                              <div className="w-48 h-28 rounded-xl bg-[#111111] overflow-hidden border border-[#DCDAD2] shrink-0 shadow-xs">
                                <img
                                  src={selectedEditProject.coverImage}
                                  alt="Cover Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="space-y-2 flex-1 text-xs font-mono">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleFileUpload(e, (dataUrl) =>
                                      updateProject(selectedEditProject.id, { coverImage: dataUrl })
                                    )
                                  }
                                />
                                <input
                                  type="text"
                                  value={selectedEditProject.coverImage}
                                  onChange={(e) =>
                                    updateProject(selectedEditProject.id, { coverImage: e.target.value })
                                  }
                                  className="w-full px-2.5 py-1.5 rounded border border-[#DCDAD2] bg-white text-[11px] font-mono"
                                  placeholder="이미지 URL 직접 입력 또는 파일 업로드"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Sub-Tab 2: 4-Pillar Content */}
                      {projectSubTab === 'content' && (
                        <div className="space-y-4 text-xs font-mono">
                          <div>
                            <label className="block font-bold text-[#71716A] mb-1">
                              메인 헤드라인 (Headline)
                            </label>
                            <input
                              type="text"
                              value={selectedEditProject.headline || ''}
                              onChange={(e) => updateProject(selectedEditProject.id, { headline: e.target.value })}
                              className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white font-bold text-sm"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-[#71716A] mb-1">
                              서브 설명 (Sub-Headline)
                            </label>
                            <input
                              type="text"
                              value={selectedEditProject.subHeadline || ''}
                              onChange={(e) => updateProject(selectedEditProject.id, { subHeadline: e.target.value })}
                              className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-[#07732C] mb-1">
                              1. ROLE & OUTPUT (담당 역할 및 산출물)
                            </label>
                            <textarea
                              rows={2}
                              value={selectedEditProject.role}
                              onChange={(e) => updateProject(selectedEditProject.id, { role: e.target.value })}
                              className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-[#07732C] mb-1">
                              2. CONTEXT & OBJECTIVE (기획 배경 및 해결 과제)
                            </label>
                            <textarea
                              rows={3}
                              value={selectedEditProject.context}
                              onChange={(e) => updateProject(selectedEditProject.id, { context: e.target.value })}
                              className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-[#07732C] mb-1">
                              3. STRATEGY & EXECUTION (실행 전략 및 제작 과정)
                            </label>
                            <textarea
                              rows={3}
                              value={selectedEditProject.strategy}
                              onChange={(e) => updateProject(selectedEditProject.id, { strategy: e.target.value })}
                              className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-[#07732C] mb-1">
                              4. RESULT & IMPACT (정량적 성과 및 팬 반응)
                            </label>
                            <textarea
                              rows={3}
                              value={selectedEditProject.result}
                              onChange={(e) => updateProject(selectedEditProject.id, { result: e.target.value })}
                              className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-[#71716A] mb-1">
                              5. KEY TAKEAWAY & INSIGHT (인사이트 및 역량 성장)
                            </label>
                            <textarea
                              rows={2}
                              value={selectedEditProject.takeaway || ''}
                              onChange={(e) => updateProject(selectedEditProject.id, { takeaway: e.target.value })}
                              className="w-full px-3 py-2 rounded border border-[#DCDAD2] bg-white leading-relaxed"
                            />
                          </div>
                        </div>
                      )}

                      {/* Sub-Tab 3: Metrics */}
                      {projectSubTab === 'metrics' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-[#07732C] uppercase">
                              KPI 성과 지표 목록
                            </span>
                            <button
                              onClick={() => {
                                const currentMetrics = selectedEditProject.metrics || [];
                                const newMetric: MetricItem = {
                                  value: '10,000+',
                                  label: '새 지표명',
                                  description: '보조 설명',
                                };
                                updateProject(selectedEditProject.id, {
                                  metrics: [...currentMetrics, newMetric],
                                });
                                showToast('새 KPI 지표가 추가되었습니다.');
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>KPI 추가</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(selectedEditProject.metrics || []).map((m, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-2 text-xs font-mono"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-[#07732C]">KPI #{idx + 1}</span>
                                  <button
                                    onClick={() => {
                                      const updated = (selectedEditProject.metrics || []).filter((_, i) => i !== idx);
                                      updateProject(selectedEditProject.id, { metrics: updated });
                                      showToast('KPI가 삭제되었습니다.');
                                    }}
                                    className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div>
                                  <label className="block text-[#71716A] mb-0.5">숫자 / 성과값</label>
                                  <input
                                    type="text"
                                    value={m.value}
                                    onChange={(e) => {
                                      const updated = [...(selectedEditProject.metrics || [])];
                                      updated[idx].value = e.target.value;
                                      updateProject(selectedEditProject.id, { metrics: updated });
                                    }}
                                    className="w-full px-2.5 py-1.5 rounded border border-[#DCDAD2] bg-white font-black text-sm text-[#07732C]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[#71716A] mb-0.5">지표명</label>
                                  <input
                                    type="text"
                                    value={m.label}
                                    onChange={(e) => {
                                      const updated = [...(selectedEditProject.metrics || [])];
                                      updated[idx].label = e.target.value;
                                      updateProject(selectedEditProject.id, { metrics: updated });
                                    }}
                                    className="w-full px-2.5 py-1.5 rounded border border-[#DCDAD2] bg-white font-bold"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sub-Tab 4: Images & Gallery */}
                      {projectSubTab === 'images' && (
                        <div className="space-y-4">
                          {/* Gallery Section Header Customization */}
                          <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-2.5 text-xs font-mono">
                            <span className="font-bold text-[#555550] block">
                              갤러리 섹션 헤더 타이틀 / 설명 설정
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                              <div className="sm:col-span-6">
                                <label className="block text-[#71716A] text-[11px] mb-1">
                                  갤러리 섹션 타이틀 (Gallery Title)
                                </label>
                                <input
                                  type="text"
                                  value={selectedEditProject.galleryTitle || ''}
                                  onChange={(e) => updateProject(selectedEditProject.id, { galleryTitle: e.target.value })}
                                  placeholder="기본값: 실제 작업물 및 현장 아카이브"
                                  className="w-full px-2.5 py-1.5 rounded border border-[#DCDAD2] bg-white font-bold text-[#111111]"
                                />
                              </div>
                              <div className="sm:col-span-6">
                                <label className="block text-[#71716A] text-[11px] mb-1">
                                  뱃지 텍스트 (Badge · 비워두면 숨김)
                                </label>
                                <input
                                  type="text"
                                  value={selectedEditProject.galleryBadge || ''}
                                  onChange={(e) => updateProject(selectedEditProject.id, { galleryBadge: e.target.value })}
                                  placeholder="예: WORKS / LIVE (비워두면 숨김)"
                                  className="w-full px-2.5 py-1.5 rounded border border-[#DCDAD2] bg-white font-bold text-[#07732C]"
                                />
                              </div>
                              <div className="sm:col-span-12">
                                <label className="block text-[#71716A] text-[11px] mb-1">
                                  섹션 부제 설명 (Subtitle · 비워두면 숨김)
                                </label>
                                <input
                                  type="text"
                                  value={selectedEditProject.gallerySubtitle || ''}
                                  onChange={(e) => updateProject(selectedEditProject.id, { gallerySubtitle: e.target.value })}
                                  placeholder="기본값: 프로젝트에 적용된 실제 디자인 비주얼과 현장 결과물입니다."
                                  className="w-full px-2.5 py-1.5 rounded border border-[#DCDAD2] bg-white text-[#333330]"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Quick Action Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC]">
                            <div>
                              <div className="font-mono font-bold text-xs text-[#111111]">
                                갤러리 이미지 & 인포그래픽 아카이브 (총 {(selectedEditProject.images || []).length}개)
                              </div>
                              <p className="text-[11px] text-[#71716A] font-mono mt-0.5">
                                [▲ 위로] / [▼ 아래로] 버튼으로 작업물 순서를 자유롭게 조정하고, 대표작 배지를 부여할 수 있습니다.
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                const currentImages = selectedEditProject.images || [];
                                const nextNum = currentImages.length + 1;
                                const newImg: ProjectImage = {
                                  id: `img-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                                  url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop',
                                  title: `작업물 ${nextNum}`,
                                  subtitle: 'INFOGRAPHIC / CONTENT',
                                  caption: '상세 설명 및 제작 의도를 입력하세요.',
                                  span: currentImages.length === 0 ? 'full' : 'half',
                                  isFeatured: currentImages.length === 0,
                                };
                                updateProject(selectedEditProject.id, { images: [...currentImages, newImg] });
                                showToast(`새 작업물 #${nextNum}이 추가되었습니다.`);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#065e24] transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
                            >
                              <Plus className="w-4 h-4" />
                              새 작업물/이미지 추가
                            </button>
                          </div>

                          {/* Image Cards List */}
                          <div className="space-y-4">
                            {(selectedEditProject.images || []).map((img, idx) => {
                              const totalCount = (selectedEditProject.images || []).length;
                              const isFirst = idx === 0;
                              const isLast = idx === totalCount - 1;

                              return (
                                <div
                                  key={img.id || `img-${idx}`}
                                  className={`p-4 rounded-xl border transition-all text-xs font-mono ${
                                    img.isFeatured
                                      ? 'bg-[#E8F4EC]/50 border-[#07732C]/40 shadow-xs'
                                      : 'bg-[#FAF9F5] border-[#E5E3DC]'
                                  }`}
                                >
                                  {/* Item Top Bar */}
                                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DC] mb-3">
                                    <div className="flex items-center gap-2">
                                      <span className="px-2.5 py-1 rounded bg-[#111111] text-white font-bold text-xs">
                                        #{String(idx + 1).padStart(2, '0')}번
                                      </span>
                                      <button
                                        onClick={() => {
                                          const updated = (selectedEditProject.images || []).map((item, i) =>
                                            i === idx ? { ...item, isFeatured: !item.isFeatured } : item
                                          );
                                          updateProject(selectedEditProject.id, { images: updated });
                                        }}
                                        className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                          img.isFeatured
                                            ? 'bg-[#07732C] text-white'
                                            : 'bg-[#E5E3DC] text-[#71716A] hover:bg-[#DCDAD2]'
                                        }`}
                                      >
                                        {img.isFeatured ? '⭐ 대표작' : '대표작 설정'}
                                      </button>
                                      {img.span && (
                                        <span className="px-2 py-0.5 rounded bg-[#E5E3DC] text-[10px] text-[#555550]">
                                          {img.span === 'full' ? '전체폭 100%' : img.span === 'third' ? '1/3폭' : '절반폭 1/2'}
                                        </span>
                                      )}
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                      <button
                                        disabled={isFirst}
                                        onClick={() => {
                                          const list = [...(selectedEditProject.images || [])];
                                          if (idx > 0) {
                                            const temp = list[idx];
                                            list[idx] = list[idx - 1];
                                            list[idx - 1] = temp;
                                            updateProject(selectedEditProject.id, { images: list });
                                            showToast('작업물 순서를 위로 변경했습니다.');
                                          }
                                        }}
                                        className={`p-1.5 rounded border text-xs flex items-center gap-1 ${
                                          isFirst
                                            ? 'border-[#E5E3DC] text-[#AAAAAA] cursor-not-allowed'
                                            : 'border-[#DCDAD2] bg-white hover:bg-[#E5E3DC] text-[#111111] cursor-pointer'
                                        }`}
                                        title="위로 이동"
                                      >
                                        <MoveUp className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">위로</span>
                                      </button>
                                      <button
                                        disabled={isLast}
                                        onClick={() => {
                                          const list = [...(selectedEditProject.images || [])];
                                          if (idx < list.length - 1) {
                                            const temp = list[idx];
                                            list[idx] = list[idx + 1];
                                            list[idx + 1] = temp;
                                            updateProject(selectedEditProject.id, { images: list });
                                            showToast('작업물 순서를 아래로 변경했습니다.');
                                          }
                                        }}
                                        className={`p-1.5 rounded border text-xs flex items-center gap-1 ${
                                          isLast
                                            ? 'border-[#E5E3DC] text-[#AAAAAA] cursor-not-allowed'
                                            : 'border-[#DCDAD2] bg-white hover:bg-[#E5E3DC] text-[#111111] cursor-pointer'
                                        }`}
                                        title="아래로 이동"
                                      >
                                        <MoveDown className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">아래로</span>
                                      </button>
                                      <button
                                        onClick={() => {
                                          const updated = (selectedEditProject.images || []).filter((_, i) => i !== idx);
                                          updateProject(selectedEditProject.id, { images: updated });
                                          showToast('이미지가 삭제되었습니다.');
                                        }}
                                        className="p-1.5 rounded border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer ml-1"
                                        title="삭제"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Item Body */}
                                  <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <div className="w-full sm:w-36 h-28 rounded-lg bg-[#111111] overflow-hidden border border-[#DCDAD2] shrink-0 shadow-xs">
                                      <img
                                        src={img.url}
                                        alt={img.title}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>

                                    <div className="flex-1 space-y-2 w-full">
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div>
                                          <label className="block text-[#71716A] text-[11px] mb-0.5">작업물 제목</label>
                                          <input
                                            type="text"
                                            value={img.title || ''}
                                            onChange={(e) => {
                                              const updated = (selectedEditProject.images || []).map((item, i) =>
                                                i === idx ? { ...item, title: e.target.value } : item
                                              );
                                              updateProject(selectedEditProject.id, { images: updated });
                                            }}
                                            placeholder="이미지 제목"
                                            className="w-full px-2.5 py-1.5 rounded border border-[#DCDAD2] bg-white font-bold text-[#111111]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[#71716A] text-[11px] mb-0.5">부제 / 카테고리</label>
                                          <input
                                            type="text"
                                            value={img.subtitle || ''}
                                            onChange={(e) => {
                                              const updated = (selectedEditProject.images || []).map((item, i) =>
                                                i === idx ? { ...item, subtitle: e.target.value } : item
                                              );
                                              updateProject(selectedEditProject.id, { images: updated });
                                            }}
                                            placeholder="보조 타이틀 / 부제 (Subtitle)"
                                            className="w-full px-2.5 py-1.5 rounded border border-[#DCDAD2] bg-white text-[#07732C] font-semibold"
                                          />
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                                        <div className="sm:col-span-8">
                                          <label className="block text-[#71716A] text-[11px] mb-0.5">상세 설명 / 캡션</label>
                                          <input
                                            type="text"
                                            value={img.caption || ''}
                                            onChange={(e) => {
                                              const updated = (selectedEditProject.images || []).map((item, i) =>
                                                i === idx ? { ...item, caption: e.target.value } : item
                                              );
                                              updateProject(selectedEditProject.id, { images: updated });
                                            }}
                                            placeholder="상세 설명 캡션 (Caption)"
                                            className="w-full px-2.5 py-1.5 rounded border border-[#DCDAD2] bg-white text-[#333330]"
                                          />
                                        </div>
                                        <div className="sm:col-span-4">
                                          <label className="block text-[#71716A] text-[11px] mb-0.5">레이아웃 너비</label>
                                          <select
                                            value={img.span || 'half'}
                                            onChange={(e) => {
                                              const updated = (selectedEditProject.images || []).map((item, i) =>
                                                i === idx ? { ...item, span: e.target.value as any } : item
                                              );
                                              updateProject(selectedEditProject.id, { images: updated });
                                            }}
                                            className="w-full px-2.5 py-1.5 rounded border border-[#DCDAD2] bg-white text-[#111111]"
                                          >
                                            <option value="half">절반 폭 (Half 1/2)</option>
                                            <option value="full">전체 폭 (Full 100%)</option>
                                            <option value="third">1/3 폭 (Third 1/3)</option>
                                          </select>
                                        </div>
                                      </div>

                                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                                        <label className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E8F4EC] text-[#07732C] border border-[#07732C]/30 text-xs font-mono font-bold hover:bg-[#d8edd0] transition-colors cursor-pointer shrink-0 justify-center">
                                          <Upload className="w-3.5 h-3.5" />
                                          <span>파일 선택</span>
                                          <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                              handleFileUpload(e, (dataUrl) => {
                                                const updated = (selectedEditProject.images || []).map((item, i) =>
                                                  i === idx ? { ...item, url: dataUrl } : item
                                                );
                                                updateProject(selectedEditProject.id, { images: updated });
                                                showToast(`이미지 #${idx + 1} 파일이 변경되었습니다.`);
                                              })
                                            }
                                            className="hidden"
                                          />
                                        </label>
                                        <input
                                          type="text"
                                          value={img.url || ''}
                                          onChange={(e) => {
                                            const updated = (selectedEditProject.images || []).map((item, i) =>
                                              i === idx ? { ...item, url: e.target.value } : item
                                            );
                                            updateProject(selectedEditProject.id, { images: updated });
                                          }}
                                          placeholder="이미지 URL 직접 입력"
                                          className="flex-1 px-2.5 py-1.5 rounded border border-[#DCDAD2] bg-white text-[11px] font-mono text-[#111111] focus:border-[#07732C]"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {!selectedEditProject && (
                    <div className="p-12 text-center rounded-2xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-4">
                      <p className="text-sm font-mono text-[#71716A]">등록된 프로젝트가 없습니다.</p>
                      <button
                        onClick={handleCreateNewProject}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>새 프로젝트 추가하기</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 06: CONTACT & FOOTER */}
              {/* ======================================================== */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#111111] tracking-tight">
                      05. 연락처 (Contact) & 푸터 (Footer) 문구
                    </h3>
                    <p className="text-xs text-[#71716A] font-mono mt-1">
                      하단 연락처 섹션 헤더, 메인 카피, 이메일, 인스타그램 및 저작권 문구를 수정합니다.
                    </p>
                  </div>

                  {/* Section 05 Header & Title Editor */}
                  <SectionHeaderCard
                    sectionNumber="05"
                    sectionName="GET IN TOUCH · CONTACT & ARCHIVE"
                    tagValue={siteConfig.contactSectionTag || '05 // GET IN TOUCH · CONTACT & ARCHIVE'}
                    onTagChange={(val) => updateSiteConfig({ contactSectionTag: val })}
                    tagPlaceholder="05 // GET IN TOUCH · CONTACT & ARCHIVE"
                    titleValue={siteConfig.contactHeadline || '콘텐츠가 팬에게 닿는 순간까지.'}
                    onTitleChange={(val) => updateSiteConfig({ contactHeadline: val })}
                    titlePlaceholder="콘텐츠가 팬에게 닿는 순간까지."
                    subValue={siteConfig.contactSub || '기획하고, 직접 만들고, 현장에서 확인하는 스포츠 콘텐츠 마케터 홍기민입니다.'}
                    onSubChange={(val) => updateSiteConfig({ contactSub: val })}
                    subPlaceholder="기획하고, 직접 만들고, 현장에서 확인하는 스포츠 콘텐츠 마케터 홍기민입니다."
                    isDarkTheme={true}
                  />

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                          대표 전화번호 (Phone)
                        </label>
                        <input
                          type="text"
                          value={siteConfig.phone || '010-XXXX-XXXX'}
                          onChange={(e) => updateSiteConfig({ phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono font-bold text-[#07732C]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                          대표 이메일 주소 (Email)
                        </label>
                        <input
                          type="text"
                          value={siteConfig.email}
                          onChange={(e) => updateSiteConfig({ email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono font-bold text-[#07732C]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                          인스타그램 / SNS 링크
                        </label>
                        <input
                          type="text"
                          value={siteConfig.instagram}
                          onChange={(e) => updateSiteConfig({ instagram: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono font-bold text-[#07732C]"
                        />
                      </div>
                    </div>

                    {/* Quick Link to Resume Editor */}
                    <div className="p-4 rounded-xl bg-[#E8F4EC] border border-[#07732C]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h5 className="font-bold text-xs text-[#07732C] flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          <span>이력서(CV) 전문 열람 버튼 연동 항목 편집</span>
                        </h5>
                        <p className="text-[11px] text-[#555550] mt-0.5">
                          컨택 섹션 및 프로필 섹션의 [이력서 CV 전문 열람] 팝업에 출력되는 모든 상세 데이터는 08번 탭에서 편집 가능합니다.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('resume')}
                        className="px-3 py-1.5 rounded-lg bg-[#07732C] text-white font-mono font-bold text-xs hover:bg-[#055822] transition-colors shrink-0 cursor-pointer"
                      >
                        이력서(CV) 편집 탭으로 이동 ➔
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#555550] mb-1">
                        푸터 Copyright 문구
                      </label>
                      <input
                        type="text"
                        value={siteConfig.footerCopyright || '© 2026 HONG GIMIN. ALL RIGHTS RESERVED.'}
                        onChange={(e) => updateSiteConfig({ footerCopyright: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCDAD2] bg-[#FAF9F5] text-xs font-mono text-[#555550]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 08: RESUME (CV) MANAGEMENT */}
              {/* ======================================================== */}
              {activeTab === 'resume' && (
                <AdminResumeTab showToast={showToast} />
              )}

              {/* ======================================================== */}
              {/* TAB 09: BACKUP & RESTORE */}
              {/* ======================================================== */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#111111] tracking-tight">
                      09. 데이터 백업 & 복원 (JSON)
                    </h3>
                    <p className="text-xs text-[#71716A] font-mono mt-1">
                      포트폴리오의 모든 텍스트, 이미지, 프로젝트 데이터를 JSON 파일로 백업하거나 다른 환경에서 불러올 수 있습니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Export */}
                    <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-3">
                      <div className="flex items-center gap-2 text-[#07732C]">
                        <Download className="w-5 h-5" />
                        <h4 className="font-mono font-bold text-sm">전체 백업 파일 다운로드</h4>
                      </div>
                      <p className="text-xs text-[#71716A]">
                        현재 수정된 모든 포트폴리오 데이터를 .json 파일로 PC에 즉시 다운로드합니다.
                      </p>
                      <button
                        onClick={() => {
                          exportDataJson();
                          showToast('JSON 백업 파일 다운로드가 시작되었습니다.');
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#07732C] text-white font-mono font-bold text-xs hover:bg-[#055822] transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>JSON 백업 파일 내보내기 (.json)</span>
                      </button>
                    </div>

                    {/* Import */}
                    <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-3">
                      <div className="flex items-center gap-2 text-[#111111]">
                        <Upload className="w-5 h-5" />
                        <h4 className="font-mono font-bold text-sm">백업 파일 불러오기</h4>
                      </div>
                      <p className="text-xs text-[#71716A]">
                        이전에 저장해 둔 .json 백업 파일을 선택하여 포트폴리오를 복원합니다.
                      </p>
                      <label className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#111111] text-white font-mono font-bold text-xs hover:bg-[#222222] transition-colors cursor-pointer shadow-xs">
                        <Upload className="w-4 h-4" />
                        <span>.json 백업 파일 선택 및 복원</span>
                        <input
                          type="file"
                          accept=".json,application/json"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            const target = e.target;
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === 'string') {
                                  if (importDataJson(reader.result)) {
                                    showToast('백업 파일에서 데이터가 성공적으로 복원되었습니다.');
                                  } else {
                                    alert('유효하지 않은 백업 JSON 파일입니다.');
                                  }
                                }
                                target.value = '';
                              };
                              reader.readAsText(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Reset to Default */}
                  <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-3">
                    <div className="flex items-center gap-2 text-red-700">
                      <RotateCcw className="w-5 h-5" />
                      <h4 className="font-mono font-bold text-sm">초기 기본 데이터로 리셋</h4>
                    </div>
                    <p className="text-xs text-red-600">
                      주의: 모든 수정한 내용이 초기 기본 상태(WBC 32만뷰, 야구공작소 13편, OLDBOYS 등)로 되돌아갑니다.
                    </p>
                    {resetConfirmOpen ? (
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs font-mono font-bold text-red-700">정말 모든 데이터를 초기값으로 리셋하시겠습니까?</span>
                        <button
                          onClick={() => {
                            resetToDefaultData();
                            setResetConfirmOpen(false);
                            showToast('기본 데이터로 전체 리셋되었습니다.');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs transition-colors shadow-xs cursor-pointer"
                        >
                          예, 리셋 진행
                        </button>
                        <button
                          onClick={() => setResetConfirmOpen(false)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-[#DCDAD2] text-[#555550] font-mono font-bold text-xs hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                        >
                          취소
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setResetConfirmOpen(true)}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white font-mono font-bold text-xs hover:bg-red-700 transition-colors shadow-xs cursor-pointer"
                      >
                        기본값으로 전체 리셋
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
