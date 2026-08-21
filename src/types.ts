export interface MetricItem {
  value: string;
  label: string;
  description?: string;
}

export interface ProjectImage {
  id: string;
  url: string;
  title: string;
  subtitle?: string;
  caption?: string;
  span?: 'full' | 'half' | 'third';
  isFeatured?: boolean;
}

export interface WorkshopGraphic {
  num: number;
  title: string;
  category: string;
  url: string;
  description?: string;
}

export interface Project {
  id: string;
  order: string;
  title: string;
  englishTitle?: string;
  category: string;
  coverImage: string;
  summary: string;
  headline?: string;
  subHeadline?: string;
  period?: string;
  visible?: boolean;
  metrics: MetricItem[];
  context: string;
  role: string;
  strategy: string;
  result: string;
  takeaway?: string;
  images: ProjectImage[];
  workshopGraphics?: WorkshopGraphic[];
  workboardOrder?: number[];
  galleryTitle?: string;
  gallerySubtitle?: string;
  galleryBadge?: string;
  tags?: string[];
  tools?: string[];
  externalLink?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  role: string;
  description: string;
  badge?: string;
  link?: string;
}

export interface HowIWorkStep {
  step: string;
  title: string;
  description: string;
  tag: string;
}

export interface HeroVisual {
  url: string;
  label: string;
  badge: string;
  subTag?: string; // e.g. '야구공작소 #07', '일간스포츠 필드클럽', 'todaybluewave'
  description?: string; // e.g. '복잡한 세부 지표의 직관적 시각화 원칙'
  metricBadge?: string; // e.g. '327,742 VIEWS', 'CASE STUDY', '5,456 MAX VIEWS'
  viewsCount?: string; // e.g. '327K'
  sharesCount?: string; // e.g. '7.1K'
  likesCount?: string; // e.g. '6.4K'
  linkText?: string; // e.g. 'VIEW DETAILS ↗'
  projectId: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  num: string;
  visible?: boolean;
}

export interface ProfileEducationItem {
  id: string;
  title: string;
  desc: string;
  period?: string;
  school?: string;
}

export interface ProfileActivityItem {
  id: string;
  name: string;
  role: string;
  tag: string;
  period?: string;
  org?: string;
}

export interface ProfileProjectItem {
  id: string;
  title: string;
  desc: string;
  projectId?: string;
  link?: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
}

export interface ResumeCompetencyItem {
  id: string;
  title: string;
  desc: string;
}

export interface ResumeExperienceItem {
  id: string;
  title: string;
  badge?: string;
  period: string;
  role: string;
  description: string;
}

export interface ResumeProjectItem {
  id: string;
  order: string;
  title: string;
  category: string;
  summary: string;
  result: string;
}

export interface ResumeEducationItem {
  id: string;
  school: string;
  major: string;
  period: string;
  status: string;
  description?: string;
}

export interface ResumeAwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface ResumeSkillCategory {
  id: string;
  name: string;
  skills: string;
}

export interface ResumeCustomLink {
  id: string;
  label: string;
  url: string;
}

export interface ResumeData {
  // Header
  modalTitle: string;
  name: string;
  englishName: string;
  roleTitle: string;
  tagline: string;
  phone: string;
  email: string;
  portfolioUrl: string;
  location?: string;
  customLinks?: ResumeCustomLink[];

  // 01. Professional Summary
  summarySectionTitle: string;
  summaryText: string;

  // 02. Experience & Activities
  experienceSectionTitle: string;
  useCustomExperience: boolean;
  customExperience: ResumeExperienceItem[];

  // 03. Key Projects
  projectsSectionTitle: string;
  useCustomProjects: boolean;
  customProjects: ResumeProjectItem[];

  // 04. Core Competencies
  competenciesSectionTitle: string;
  competencies: ResumeCompetencyItem[];

  // 05. Education
  showEducation: boolean;
  educationSectionTitle: string;
  educationList: ResumeEducationItem[];

  // 06. Awards & Certifications
  showAwards: boolean;
  awardsSectionTitle: string;
  awardsList: ResumeAwardItem[];

  // 07. Skills & Tools
  showSkills: boolean;
  skillsSectionTitle: string;
  skillsList: ResumeSkillCategory[];

  // Footer / Note
  footerNote?: string;
}

export interface SiteConfig {
  // General & Branding
  name: string;
  englishName?: string;
  roleTitle: string;
  statusBadge: string;

  // Navigation
  navigation?: NavigationItem[];

  // Hero Section
  heroCategoryTag?: string;
  heroSectionTag?: string;
  heroHeadline: string;
  heroSubHeadline: string;
  heroCtaWorkText?: string;
  heroCtaWorkHref?: string;
  heroCtaAboutText?: string;
  heroCtaAboutHref?: string;
  heroVisuals: {
    main: HeroVisual;
    sub1: HeroVisual;
    sub2: HeroVisual;
  };

  // Profile Section (02 About Me)
  profileSectionTag?: string;
  profileSectionTitle?: string;
  profileSectionSub?: string;
  profileCvButtonText?: string;
  profilePhoto?: string;
  profileStatusPill?: string;
  phone?: string;
  email: string;
  instagram: string;
  resumeUrl?: string;
  aboutPhilosophy: string;
  educationList?: ProfileEducationItem[];
  activityList?: ProfileActivityItem[];
  profileProjectList?: ProfileProjectItem[];
  skills?: SkillGroup[];

  // Experience Section
  experienceSectionTag?: string;
  experienceSectionTitle?: string;
  experienceSectionSub?: string;

  // Work Section
  workSectionTag?: string;
  workSectionTitle?: string;
  workSectionSub?: string;

  // Legacy/Big numbers metrics if needed
  metrics?: {
    views: string;
    viewsLabel: string;
    shares: string;
    sharesLabel: string;
    likes: string;
    likesLabel: string;
    members: string;
    membersLabel: string;
  };
  aboutTitleLarge?: string[];
  aboutParagraphs?: string[];

  // Contact & Footer Section
  contactSectionTag?: string;
  contactHeadline: string;
  contactSub: string;
  contactCtaText?: string;
  footerCopyright?: string;
  footerBackToTopText?: string;
}
