import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Project, ExperienceItem, HowIWorkStep, SiteConfig, WorkshopGraphic, ResumeData, ProjectImage } from '../types';
import deployedBackupUrl from '../../portfolio_backup.json?url';
import {
  DEFAULT_PROJECTS,
  DEFAULT_EXPERIENCE,
  DEFAULT_HOW_I_WORK,
  DEFAULT_SITE_CONFIG,
  DEFAULT_RESUME_DATA,
} from '../data/defaultData';

interface PortfolioContextType {
  siteConfig: SiteConfig;
  projects: Project[];
  experience: ExperienceItem[];
  howIWork: HowIWorkStep[];
  resumeData: ResumeData;
  selectedProject: Project | null;
  selectedProjectId: string | null;
  isAdminAuthenticated: boolean;
  isAdminModalOpen: boolean;
  isResumeModalOpen: boolean;
  lightboxImage: { url: string; title: string; caption?: string } | null;

  // Actions
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  openResumeModal: () => void;
  closeResumeModal: () => void;
  openProjectModal: (projectId: string) => void;
  closeProjectModal: () => void;
  openLightbox: (url: string, title: string, caption?: string) => void;
  closeLightbox: () => void;

  // CMS Updates
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  updateResumeData: (newResume: Partial<ResumeData>) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  addProject: (newProject: Project) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (newOrder: Project[]) => void;
  updateExperience: (id: string, updated: Partial<ExperienceItem>) => void;
  addExperience: (newItem: ExperienceItem) => void;
  deleteExperience: (id: string) => void;
  updateWorkshopGraphic: (numOrIndex: number, updated: Partial<WorkshopGraphic>) => void;
  addWorkshopGraphic: (graphic: WorkshopGraphic) => void;
  deleteWorkshopGraphic: (index: number) => void;
  moveWorkshopGraphic: (index: number, direction: 'up' | 'down') => void;
  setWorkshopGraphics: (graphics: WorkshopGraphic[]) => void;
  reorderWorkshopOrder: (newOrder: number[]) => void;
  resetToDefaultData: () => void;
  exportDataJson: () => void;
  importDataJson: (jsonStr: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SITE_CONFIG: 'hong_gimin_site_config_v2',
  PROJECTS: 'hong_gimin_projects_v2',
  EXPERIENCE: 'hong_gimin_experience_v2',
  HOW_I_WORK: 'hong_gimin_how_i_work_v2',
  RESUME_DATA: 'hong_gimin_resume_data_v2',
  ADMIN_AUTH: 'hong_gimin_admin_auth_v2',
};

/**
 * Deployed default data
 * ---------------------
 * The repository-root portfolio_backup.json file is bundled as the site's shared baseline.
 * New visitors (who do not have local CMS data yet) receive that backup automatically.
 * Existing admin edits in localStorage still take priority on that browser.
 */
type PortfolioBackupBundle = {
  siteConfig?: SiteConfig;
  projects?: Project[];
  experience?: ExperienceItem[];
  howIWork?: HowIWorkStep[];
  resumeData?: ResumeData;
  exportedAt?: string;
  version?: string;
};

const hasStoredValue = (key: string) => {
  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Snapshot whether this browser already had CMS data BEFORE this app starts writing to storage.
  // This lets a shared deployed backup become the default only for fresh visitors.
  const hadLocalDataAtStartup = useRef({
    siteConfig: hasStoredValue(STORAGE_KEYS.SITE_CONFIG),
    projects: hasStoredValue(STORAGE_KEYS.PROJECTS),
    experience: hasStoredValue(STORAGE_KEYS.EXPERIENCE),
    howIWork: hasStoredValue(STORAGE_KEYS.HOW_I_WORK),
    resumeData: hasStoredValue(STORAGE_KEYS.RESUME_DATA),
  }).current;

  const [bootstrapDone, setBootstrapDone] = useState(false);
  const [deployedDefaultBundle, setDeployedDefaultBundle] = useState<PortfolioBackupBundle | null>(null);

  // Load initial state with localStorage fallbacks
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SITE_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        // If profilePhoto was old placeholder string, replace with high-res profile photo
        if (!parsed.profilePhoto || parsed.profilePhoto === 'assets/profile-photo.jpg') {
          parsed.profilePhoto = DEFAULT_SITE_CONFIG.profilePhoto;
        }
        if (parsed.navigation) {
          parsed.navigation = parsed.navigation.map((item: any) => {
            if (item.label === 'TOP' || item.href === '#top') {
              return { ...item, id: 'nav-highlights', label: 'HIGHLIGHTS', href: '#highlights' };
            }
            return item;
          });
        }
        if (!parsed.heroCategoryTag || parsed.heroCategoryTag.includes('FEATURED WORK')) {
          parsed.heroCategoryTag = 'SPORTS CONTENT & CREATIVE STRATEGY';
        }
        const heroVisuals = {
          main: { ...DEFAULT_SITE_CONFIG.heroVisuals.main, ...(parsed.heroVisuals?.main || {}) },
          sub1: { ...DEFAULT_SITE_CONFIG.heroVisuals.sub1, ...(parsed.heroVisuals?.sub1 || {}) },
          sub2: { ...DEFAULT_SITE_CONFIG.heroVisuals.sub2, ...(parsed.heroVisuals?.sub2 || {}) },
        };
        return {
          ...DEFAULT_SITE_CONFIG,
          ...parsed,
          heroVisuals,
          educationList: parsed.educationList || DEFAULT_SITE_CONFIG.educationList,
          activityList: parsed.activityList || DEFAULT_SITE_CONFIG.activityList,
          profileProjectList: parsed.profileProjectList || DEFAULT_SITE_CONFIG.profileProjectList,
          skills: parsed.skills || DEFAULT_SITE_CONFIG.skills,
        };
      }
      return DEFAULT_SITE_CONFIG;
    } catch {
      return DEFAULT_SITE_CONFIG;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) {
        const parsed: Project[] = JSON.parse(saved);
        return parsed.map((p) => {
          if (p.id === 'baseball-workshop') {
            if ((!p.images || p.images.length <= 1) && p.workshopGraphics && p.workshopGraphics.length > 1) {
              const convertedImages: ProjectImage[] = p.workshopGraphics.map((g, idx) => ({
                id: `bw-${idx + 1}`,
                url: g.url,
                title: g.title,
                subtitle: g.category,
                caption: g.description,
                span: idx === 0 ? 'full' : 'half',
                isFeatured: idx === 0,
              }));
              return {
                ...p,
                images: convertedImages,
              };
            }
            if (!p.images || p.images.length <= 1) {
              const defaultBw = DEFAULT_PROJECTS.find((dp) => dp.id === 'baseball-workshop');
              if (defaultBw) {
                return {
                  ...p,
                  images: defaultBw.images,
                };
              }
            }
          }
          return p;
        });
      }
      return DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [experience, setExperience] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
      return saved ? JSON.parse(saved) : DEFAULT_EXPERIENCE;
    } catch {
      return DEFAULT_EXPERIENCE;
    }
  });

  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESUME_DATA);
      return saved ? { ...DEFAULT_RESUME_DATA, ...JSON.parse(saved) } : DEFAULT_RESUME_DATA;
    } catch {
      return DEFAULT_RESUME_DATA;
    }
  });

  const [howIWork, setHowIWork] = useState<HowIWorkStep[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HOW_I_WORK);
      return saved ? JSON.parse(saved) : DEFAULT_HOW_I_WORK;
    } catch {
      return DEFAULT_HOW_I_WORK;
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; caption?: string } | null>(null);

  // Load the shared deployment baseline bundled from /portfolio_backup.json.
  // This is what makes Admin-exported content visible to every new visitor, not just this browser.
  useEffect(() => {
    let cancelled = false;

    const loadDeployedBackup = async () => {
      try {
        const response = await fetch(deployedBackupUrl, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Backup file not found (${response.status})`);
        }

        const parsed = (await response.json()) as PortfolioBackupBundle;
        const looksLikePortfolioBackup =
          parsed &&
          typeof parsed === 'object' &&
          (parsed.siteConfig || parsed.projects || parsed.experience || parsed.resumeData);

        if (!looksLikePortfolioBackup || cancelled) {
          return;
        }

        setDeployedDefaultBundle(parsed);

        // Browser-specific CMS edits remain authoritative. Only fill categories that were absent
        // when the visitor first opened the deployed site.
        if (!hadLocalDataAtStartup.siteConfig && parsed.siteConfig) {
          const backupConfig = parsed.siteConfig;
          setSiteConfig({
            ...DEFAULT_SITE_CONFIG,
            ...backupConfig,
            heroVisuals: {
              main: { ...DEFAULT_SITE_CONFIG.heroVisuals.main, ...(backupConfig.heroVisuals?.main || {}) },
              sub1: { ...DEFAULT_SITE_CONFIG.heroVisuals.sub1, ...(backupConfig.heroVisuals?.sub1 || {}) },
              sub2: { ...DEFAULT_SITE_CONFIG.heroVisuals.sub2, ...(backupConfig.heroVisuals?.sub2 || {}) },
            },
            educationList: backupConfig.educationList || DEFAULT_SITE_CONFIG.educationList,
            activityList: backupConfig.activityList || DEFAULT_SITE_CONFIG.activityList,
            profileProjectList: backupConfig.profileProjectList || DEFAULT_SITE_CONFIG.profileProjectList,
            skills: backupConfig.skills || DEFAULT_SITE_CONFIG.skills,
          });
        }
        if (!hadLocalDataAtStartup.projects && Array.isArray(parsed.projects)) {
          setProjects(parsed.projects);
        }
        if (!hadLocalDataAtStartup.experience && Array.isArray(parsed.experience)) {
          setExperience(parsed.experience);
        }
        if (!hadLocalDataAtStartup.howIWork && Array.isArray(parsed.howIWork)) {
          setHowIWork(parsed.howIWork);
        }
        if (!hadLocalDataAtStartup.resumeData && parsed.resumeData) {
          setResumeData({ ...DEFAULT_RESUME_DATA, ...parsed.resumeData });
        }
      } catch (err) {
        // A missing backup is safe: the original code defaults are used.
        console.info('Shared portfolio backup was not loaded; using code defaults.', err);
      } finally {
        if (!cancelled) setBootstrapDone(true);
      }
    };

    loadDeployedBackup();
    return () => {
      cancelled = true;
    };
  }, []);

  // Sync to localStorage only after the shared baseline had a chance to load.
  useEffect(() => {
    if (!bootstrapDone) return;
    try {
      localStorage.setItem(STORAGE_KEYS.SITE_CONFIG, JSON.stringify(siteConfig));
    } catch (err) {
      console.warn('Storage limit or error saving siteConfig:', err);
    }
  }, [siteConfig, bootstrapDone]);

  useEffect(() => {
    if (!bootstrapDone) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (err) {
      console.warn('Storage limit or error saving projects:', err);
    }
  }, [projects, bootstrapDone]);

  useEffect(() => {
    if (!bootstrapDone) return;
    try {
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experience));
    } catch (err) {
      console.warn('Storage limit or error saving experience:', err);
    }
  }, [experience, bootstrapDone]);

  useEffect(() => {
    if (!bootstrapDone) return;
    try {
      localStorage.setItem(STORAGE_KEYS.HOW_I_WORK, JSON.stringify(howIWork));
    } catch (err) {
      console.warn('Storage limit or error saving howIWork:', err);
    }
  }, [howIWork, bootstrapDone]);

  useEffect(() => {
    if (!bootstrapDone) return;
    try {
      localStorage.setItem(STORAGE_KEYS.RESUME_DATA, JSON.stringify(resumeData));
    } catch (err) {
      console.warn('Storage limit or error saving resumeData:', err);
    }
  }, [resumeData, bootstrapDone]);

  // Check URL query parameters for direct link (e.g. ?project=fieldclub or ?admin=true)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const proj = params.get('project') || params.get('id');
    if (proj) {
      const found = projects.find((p) => p.id === proj);
      if (found) {
        setSelectedProjectId(found.id);
      }
    }
    if (params.get('admin') === 'true') {
      setIsAdminModalOpen(true);
    }
  }, []);

  const loginAdmin = (password: string): boolean => {
    if (password === '1111') {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch {}
  };

  const openAdminModal = () => setIsAdminModalOpen(true);
  const closeAdminModal = () => setIsAdminModalOpen(false);

  const openResumeModal = () => setIsResumeModalOpen(true);
  const closeResumeModal = () => setIsResumeModalOpen(false);

  const openProjectModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    const url = new URL(window.location.href);
    url.searchParams.set('project', projectId);
    window.history.pushState({}, '', url.toString());
  };

  const closeProjectModal = () => {
    setSelectedProjectId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    url.searchParams.delete('id');
    window.history.pushState({}, '', url.toString());
  };

  const openLightbox = (url: string, title: string, caption?: string) => {
    setLightboxImage({ url, title, caption });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const updateResumeData = (newResume: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...newResume }));
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const addProject = (newProject: Project) => {
    setProjects((prev) => [...prev, newProject]);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (selectedProjectId === id) {
      setSelectedProjectId(null);
    }
  };

  const reorderProjects = (newOrder: Project[]) => {
    setProjects(newOrder);
  };

  const updateExperience = (id: string, updated: Partial<ExperienceItem>) => {
    setExperience((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const addExperience = (newItem: ExperienceItem) => {
    setExperience((prev) => [...prev, newItem]);
  };

  const deleteExperience = (id: string) => {
    setExperience((prev) => prev.filter((item) => item.id !== id));
  };

  const updateWorkshopGraphic = (numOrIndex: number, updated: Partial<WorkshopGraphic>) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === 'baseball-workshop' && proj.workshopGraphics) {
          const updatedGraphics = proj.workshopGraphics.map((g, idx) =>
            g.num === numOrIndex || idx === numOrIndex ? { ...g, ...updated } : g
          );
          return { ...proj, workshopGraphics: updatedGraphics };
        }
        return proj;
      })
    );
  };

  const addWorkshopGraphic = (graphic: WorkshopGraphic) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === 'baseball-workshop') {
          const currentGraphics = proj.workshopGraphics || [];
          return {
            ...proj,
            workshopGraphics: [...currentGraphics, graphic],
          };
        }
        return proj;
      })
    );
  };

  const deleteWorkshopGraphic = (index: number) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === 'baseball-workshop' && proj.workshopGraphics) {
          return {
            ...proj,
            workshopGraphics: proj.workshopGraphics.filter((_, idx) => idx !== index),
          };
        }
        return proj;
      })
    );
  };

  const moveWorkshopGraphic = (index: number, direction: 'up' | 'down') => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === 'baseball-workshop' && proj.workshopGraphics) {
          const list = [...proj.workshopGraphics];
          const targetIndex = direction === 'up' ? index - 1 : index + 1;
          if (targetIndex < 0 || targetIndex >= list.length) return proj;
          const [moved] = list.splice(index, 1);
          list.splice(targetIndex, 0, moved);
          return { ...proj, workshopGraphics: list };
        }
        return proj;
      })
    );
  };

  const setWorkshopGraphics = (graphics: WorkshopGraphic[]) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === 'baseball-workshop') {
          return { ...proj, workshopGraphics: graphics };
        }
        return proj;
      })
    );
  };

  const reorderWorkshopOrder = (newOrder: number[]) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === 'baseball-workshop') {
          return { ...proj, workboardOrder: newOrder };
        }
        return proj;
      })
    );
  };

  const resetToDefaultData = () => {
    // If a deployment backup exists, treat it as the real site default.
    setSiteConfig(deployedDefaultBundle?.siteConfig
      ? { ...DEFAULT_SITE_CONFIG, ...deployedDefaultBundle.siteConfig }
      : DEFAULT_SITE_CONFIG);
    setProjects(Array.isArray(deployedDefaultBundle?.projects) ? deployedDefaultBundle!.projects! : DEFAULT_PROJECTS);
    setExperience(Array.isArray(deployedDefaultBundle?.experience) ? deployedDefaultBundle!.experience! : DEFAULT_EXPERIENCE);
    setHowIWork(Array.isArray(deployedDefaultBundle?.howIWork) ? deployedDefaultBundle!.howIWork! : DEFAULT_HOW_I_WORK);
    setResumeData(deployedDefaultBundle?.resumeData
      ? { ...DEFAULT_RESUME_DATA, ...deployedDefaultBundle.resumeData }
      : DEFAULT_RESUME_DATA);
    try {
      localStorage.removeItem(STORAGE_KEYS.SITE_CONFIG);
      localStorage.removeItem(STORAGE_KEYS.PROJECTS);
      localStorage.removeItem(STORAGE_KEYS.EXPERIENCE);
      localStorage.removeItem(STORAGE_KEYS.HOW_I_WORK);
      localStorage.removeItem(STORAGE_KEYS.RESUME_DATA);
    } catch {}
  };

  const exportDataJson = () => {
    try {
      const bundle = {
        siteConfig,
        projects,
        experience,
        howIWork,
        resumeData,
        exportedAt: new Date().toISOString(),
        version: '2.0',
      };
      const jsonString = JSON.stringify(bundle, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = url;
      downloadAnchor.download = `hong_gimin_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
      downloadAnchor.style.display = 'none';
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();

      setTimeout(() => {
        if (downloadAnchor.parentNode) {
          downloadAnchor.parentNode.removeChild(downloadAnchor);
        }
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (err) {
      console.error('Failed to export data JSON', err);
    }
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.siteConfig) setSiteConfig(parsed.siteConfig);
      if (parsed.projects && Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (parsed.experience && Array.isArray(parsed.experience)) setExperience(parsed.experience);
      if (parsed.howIWork && Array.isArray(parsed.howIWork)) setHowIWork(parsed.howIWork);
      if (parsed.resumeData) setResumeData(parsed.resumeData);
      return true;
    } catch (e) {
      console.error('Failed to parse JSON backup', e);
      return false;
    }
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;

  // Prevent a brief flash of the old code defaults while the shared backup is loading.
  if (!bootstrapDone) {
    return <div className="min-h-screen bg-[#F4F3EF]" aria-label="포트폴리오 불러오는 중" />;
  }

  return (
    <PortfolioContext.Provider
      value={{
        siteConfig,
        projects,
        experience,
        howIWork,
        resumeData,
        selectedProject,
        selectedProjectId,
        isAdminAuthenticated,
        isAdminModalOpen,
        isResumeModalOpen,
        lightboxImage,
        loginAdmin,
        logoutAdmin,
        openAdminModal,
        closeAdminModal,
        openResumeModal,
        closeResumeModal,
        openProjectModal,
        closeProjectModal,
        openLightbox,
        closeLightbox,
        updateSiteConfig,
        updateResumeData,
        updateProject,
        addProject,
        deleteProject,
        reorderProjects,
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
