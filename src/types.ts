export interface ResumeAnalysis {
  suitabilityScore: number;
  skills: string[];
  experienceSummary: string;
  strengths: string[];
  improvements: string;
  suggestedRoles: string[];
}

export type InputMode = 'text' | 'image';
