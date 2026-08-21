import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, ExternalLink, Copy, Check, FolderGit2 } from 'lucide-react';
import { ProfileProjectItem, Project } from '../../types';

interface ProfileProjectEditorProps {
  projectList: ProfileProjectItem[];
  projects: Project[];
  onUpdate: (updatedList: ProfileProjectItem[]) => void;
  onShowToast: (msg: string) => void;
}

export const ProfileProjectEditor: React.FC<ProfileProjectEditorProps> = ({
  projectList,
  projects,
  onUpdate,
  onShowToast,
}) => {
  // Add new item
  const handleAddItem = () => {
    const newItem: ProfileProjectItem = {
      id: `pp-${Date.now()}`,
      title: '새 프로젝트 / 활동 성과',
      desc: '성과 요약 및 핵심 실행 내용을 입력하세요.',
      projectId: projects.length > 0 ? projects[0].id : undefined,
    };
    onUpdate([...projectList, newItem]);
    onShowToast('새 프로젝트/성과 항목이 추가되었습니다.');
  };

  // Duplicate item
  const handleDuplicateItem = (index: number) => {
    const target = projectList[index];
    const duplicated: ProfileProjectItem = {
      ...target,
      id: `pp-${Date.now()}`,
      title: `${target.title} (사본)`,
    };
    const newList = [...projectList];
    newList.splice(index + 1, 0, duplicated);
    onUpdate(newList);
    onShowToast('항목이 복제되었습니다.');
  };

  // Delete item
  const handleDeleteItem = (index: number) => {
    const newList = projectList.filter((_, i) => i !== index);
    onUpdate(newList);
    onShowToast('프로젝트/성과 항목이 삭제되었습니다.');
  };

  // Move up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newList = [...projectList];
    const temp = newList[index - 1];
    newList[index - 1] = newList[index];
    newList[index] = temp;
    onUpdate(newList);
    onShowToast('순서가 변경되었습니다.');
  };

  // Move down
  const handleMoveDown = (index: number) => {
    if (index === projectList.length - 1) return;
    const newList = [...projectList];
    const temp = newList[index + 1];
    newList[index + 1] = newList[index];
    newList[index] = temp;
    onUpdate(newList);
    onShowToast('순서가 변경되었습니다.');
  };

  // Update specific item field
  const handleFieldChange = (index: number, field: keyof ProfileProjectItem, value: any) => {
    const newList = [...projectList];
    newList[index] = {
      ...newList[index],
      [field]: value,
    };
    onUpdate(newList);
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E3DC]">
        <div>
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-[#07732C]" />
            <h4 className="text-xs font-mono font-bold text-[#07732C] uppercase tracking-wider">
              3. PROJECT / EXPERIENCE (주요 프로젝트 및 성과 리스트)
            </h4>
          </div>
          <p className="text-[11px] text-[#71716A] mt-0.5">
            02번 프로필 섹션 우측 하단에 표시되는 4대 대표 프로젝트 목록입니다. 클릭 시 연동될 상세 모달을 지정할 수 있습니다.
          </p>
        </div>
        <button
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] cursor-pointer shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>항목 추가</span>
        </button>
      </div>

      {/* Item List */}
      <div className="space-y-4">
        {projectList.map((item, idx) => {
          const matchedProject = projects.find((p) => p.id === item.projectId);

          return (
            <div
              key={item.id || idx}
              className="p-4 rounded-xl bg-white border border-[#DCDAD2] hover:border-[#07732C]/50 transition-all shadow-xs space-y-3"
            >
              {/* Item Top Bar */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#EFECE6]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#E8F4EC] text-[#07732C] font-mono font-bold text-xs border border-[#07732C]/20">
                    0{idx + 1}
                  </span>
                  <span className="font-bold text-xs text-[#111111] truncate max-w-[200px] sm:max-w-xs">
                    {item.title || '(제목 없음)'}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Move Up */}
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    title="위로 이동"
                    className="p-1 rounded text-[#71716A] hover:text-[#111111] hover:bg-[#EFECE6] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  {/* Move Down */}
                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === projectList.length - 1}
                    title="아래로 이동"
                    className="p-1 rounded text-[#71716A] hover:text-[#111111] hover:bg-[#EFECE6] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  {/* Duplicate */}
                  <button
                    onClick={() => handleDuplicateItem(idx)}
                    title="복제하기"
                    className="p-1 rounded text-[#71716A] hover:text-[#07732C] hover:bg-[#E8F4EC] cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteItem(idx)}
                    title="삭제하기"
                    className="p-1 rounded text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs font-mono">
                {/* Title */}
                <div className="sm:col-span-6">
                  <label className="block text-[#71716A] font-semibold mb-1">
                    프로젝트명 (Title)
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleFieldChange(idx, 'title', e.target.value)}
                    placeholder="예: 일간스포츠 콘텐츠"
                    className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-white font-bold text-[#111111] focus:border-[#07732C] focus:outline-none"
                  />
                </div>

                {/* Project Modal Link */}
                <div className="sm:col-span-6">
                  <label className="block text-[#71716A] font-semibold mb-1 flex items-center justify-between">
                    <span>클릭 시 연결 모달 (Project ID)</span>
                    {matchedProject && (
                      <span className="text-[10px] text-[#07732C] font-normal">
                        연결: {matchedProject.title}
                      </span>
                    )}
                  </label>
                  <select
                    value={item.projectId || ''}
                    onChange={(e) => handleFieldChange(idx, 'projectId', e.target.value || undefined)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-white text-[#111111] font-bold focus:border-[#07732C] focus:outline-none"
                  >
                    <option value="">-- 연결 프로젝트 없음 --</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        [{p.order}] {p.title} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description with Enter support */}
                <div className="sm:col-span-12">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[#71716A] font-semibold">
                      설명 및 성과 요약 (Description · Enter 줄바꿈 가능)
                    </label>
                    <span className="text-[10px] text-[#07732C] font-mono">
                      줄바꿈(Enter) 적용됨
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={item.desc}
                    onChange={(e) => handleFieldChange(idx, 'desc', e.target.value)}
                    placeholder="예: WBC 대표팀 전세기 좌석 배치 카드뉴스 (32.7만 뷰 · 7,181회 자발적 공유)"
                    className="w-full px-3 py-2 rounded-lg border border-[#DCDAD2] bg-white text-[#333330] leading-relaxed focus:border-[#07732C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Mini Preview Box */}
              <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E5E3DC] flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#07732C]">0{idx + 1}.</span>
                    <span className="font-bold text-sm text-[#111111] whitespace-pre-line break-keep">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-[#555550] mt-0.5 text-xs leading-relaxed whitespace-pre-line break-keep">
                    {item.desc}
                  </p>
                </div>
                <div className="text-[11px] font-mono font-bold text-[#07732C] shrink-0 flex items-center gap-1">
                  상세보기 ↗
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
