export type SectionId = 'hero' | 'about' | 'xp' | 'skills' | 'contact';

export interface Skill {
  name: string;
  pct: number;
}

export interface StaticExperience {
  company: string;
  location: string;
  active: boolean;
  tags: string[];
}

export interface StaticTerminalBlock {
  cmd: string;
  success?: boolean;
}

export interface StaticPortfolioData {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  linkedinHandle: string;
  github: string;
  stats: { num: string }[];
  skills: Record<string, Skill[]>;
  skillCategoryKeys: string[];
  experiences: StaticExperience[];
  terminal: StaticTerminalBlock[];
}

// Types used by translation-aware components
export interface TranslatedExperienceItem {
  role: string;
  period: string;
  bullets: string[];
}

export interface TranslatedTerminalBlock {
  out: string[];
}
