export interface Goal {
  id: string;
  title: string;
  categoryName: string;
  categoryEmoji: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string; // YYYY-MM-DD
  monthlyPace?: number;
  autoSaveDesc?: string;
  theme: 'primary' | 'secondary' | 'neutral';
}
