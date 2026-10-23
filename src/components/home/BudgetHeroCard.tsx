import React from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { getMonthlySpending, getMonthDaysInfo } from '../../utils/calculations';
import { formatWon } from '../../utils/formatters';

interface BudgetHeroCardProps {
  onOpenEditModal: () => void;
}

export const BudgetHeroCard: React.FC<BudgetHeroCardProps> = ({ onOpenEditModal }) => {
  const { transactions, budgetConfig } = useExpenseStore();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = monthNames[month];

  const { total: totalSpent } = getMonthlySpending(transactions, year, month);
  const { daysLeft } = getMonthDaysInfo(year, month);

  const budget = budgetConfig.monthlyBudget;
  const remaining = budget - totalSpent;
  const spentPercent = budget > 0 ? Math.min(100, Math.round((totalSpent / budget) * 100)) : 0;
  const remainingPercent = Math.max(0, 100 - spentPercent);
  const dailyPace = daysLeft > 0 ? Math.max(0, Math.round(remaining / daysLeft)) : 0;

  return (
    <div 
      onClick={onOpenEditModal}
      className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-[0_4px_20px_-4px_rgba(19,27,46,0.06)] cursor-pointer group hover:shadow-md transition-all active:scale-[0.99]"
      title="클릭하여 월 예산 수정하기"
    >
      {/* Subtle Ambient Mint Glow Backdrop */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary-fixed/25 blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-secondary-container/30 blur-xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col">
        {/* Tag / Badge Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant font-medium">
              {currentMonthName} Budget
            </span>
            <span className="material-symbols-outlined text-[14px] text-outline opacity-0 group-hover:opacity-100 transition-opacity">
              edit
            </span>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            <span className="font-label-sm text-label-sm font-medium">{daysLeft} days left</span>
          </div>
        </div>

        {/* Large Balance Display */}
        <div className="mt-4 flex flex-col">
          <span className="font-body-sm text-body-sm text-on-surface-variant">Remaining balance</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-display-lg-mobile text-display-lg-mobile text-on-surface tracking-tight font-bold tabular-nums">
              {formatWon(remaining)}
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-semibold">left</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              of {formatWon(budget)} total budget
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface font-semibold">
              {remainingPercent}%
            </span>
          </div>
        </div>

        {/* Tactile Progress Meter */}
        <div className="mt-5 flex flex-col gap-1.5">
          <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden p-0.5 flex items-center">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                spentPercent > 90 ? 'bg-error' : spentPercent > 75 ? 'bg-tertiary-container' : 'bg-primary-container'
              }`}
              style={{ width: `${spentPercent}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant px-0.5">
            <span>Spent {spentPercent}%</span>
            <span>{remainingPercent}% safe cushion</span>
          </div>
        </div>

        {/* Quick Metrics Pill Row */}
        <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3.5 border-t border-surface-container-low">
          <div className="flex flex-col p-2.5 rounded-xl bg-surface-container-low">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-tertiary">trending_up</span>
              Spent so far
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1 tabular-nums">
              {formatWon(totalSpent)}
            </span>
          </div>
          <div className="flex flex-col p-2.5 rounded-xl bg-surface-container-low">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">speed</span>
              Daily pace
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-semibold mt-1 tabular-nums">
              {formatWon(dailyPace)}
              <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/d</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
