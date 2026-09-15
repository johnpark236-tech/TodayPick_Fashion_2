export type Season = '봄' | '여름' | '가을' | '겨울';
export type Gender = '여성' | '남성' | '유니섹스';
export type AgeGroup = '10대' | '20대' | '30대' | '40대' | '50대 이상';

export interface GarmentBreakdown {
  outer?: string;
  top: string;
  bottom: string;
  shoes: string;
  accessories?: string;
}

export interface OutfitItem {
  id: string;
  title: string;
  description: string;
  season: Season;
  gender: Gender;
  age: AgeGroup;
  styleCategory: string;
  imageUrl: string;
  setId: string;
  sheetUrl: string;
  cutIndex: number;
  garments: GarmentBreakdown;
  colorPalette: string[];
  situation: string;
  tempRange: string;
  rank?: number; // for TOP 20
}

export interface LessonStep {
  step: number;
  title: string;
  summary: string; // concise, under ~40 chars
  targetId: string;
  instruction: string;
  appliedPoints: string[];
  psychologicalModel: string;
}

export type ActiveTab = 'outfit' | 'top20' | 'saved' | 'about' | 'food_locked' | 'activity_locked';
