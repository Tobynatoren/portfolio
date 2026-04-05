export interface SqlSnippet {
  title: string;
  code: string;
  annotation: string;
}

export interface ShowcaseSection {
  title: string;
  diagram: string;
  annotation: string;
}

export interface ProjectShowcase {
  sections: ShowcaseSection[];
  sqlSnippets: SqlSnippet[];
}

export interface Project {
  title: string;
  slug: string;
  summary: string;
  description: string;
  tech: string[];
  github?: string;
  featured: boolean;
  category: "github" | "work";
  showcase?: ProjectShowcase;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  type: "work" | "education";
}
