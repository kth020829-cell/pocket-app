import React from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';

export const WelcomeBanner: React.FC = () => {
  const { budgetConfig } = useExpenseStore();

  return (
    <div className="flex flex-col pt-1">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-on-surface-variant font-medium">Good morning,</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-0.5 flex items-center gap-1.5">
            Hi, {budgetConfig.userName || 'Taehyun'} <span className="inline-block animate-bounce text-[26px]">👋</span>
          </h1>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container/40 text-on-secondary-fixed-variant">
          <span className="material-symbols-outlined text-[16px] text-primary material-symbols-fill">spa</span>
          <span className="font-label-sm text-label-sm font-semibold">Chill Mode</span>
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant">
        <span className="material-symbols-outlined text-[18px] text-primary">sentiment_satisfied</span>
        <p className="font-body-sm text-body-sm text-on-surface">You're doing great with your budget this month!</p>
      </div>
    </div>
  );
};
