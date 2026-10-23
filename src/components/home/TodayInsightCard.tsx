import React from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { getTodaySpending, getMonthlySpending } from '../../utils/calculations';
import { formatWon } from '../../utils/formatters';

export const TodayInsightCard: React.FC = () => {
  const { transactions } = useExpenseStore();
  const now = new Date();
  const { total: todayTotal, byCategory } = getTodaySpending(transactions);
  const { dailyAvg } = getMonthlySpending(transactions, now.getFullYear(), now.getMonth());

  const diff = dailyAvg - todayTotal;
  const isUnder = diff >= 0;

  const categoryEmojis: Record<string, string> = {
    food: '🥗',
    cafe: '☕',
    transport: '🚇',
    shopping: '🏪',
    bills: '🏠',
    etc: '✨',
  };

  const categoryNames: Record<string, string> = {
    food: 'Food',
    cafe: 'Cafe',
    transport: 'Transport',
    shopping: 'Mart',
    bills: 'Bills',
    etc: 'Etc',
  };

  const activeCategories = Object.entries(byCategory);

  return (
    <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-[0_2px_12px_-2px_rgba(19,27,46,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-fixed/40 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">donut_small</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Today's Spending
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tabular-nums">
              {formatWon(todayTotal)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/50 text-on-secondary-fixed-variant">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
          <span className="font-label-sm text-label-sm font-semibold">
            {isUnder
              ? `${formatWon(diff)} under avg`
              : `${formatWon(Math.abs(diff))} over avg`}
          </span>
        </div>
      </div>

      {/* Mini Sub-category Chips */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-surface-container-low flex-wrap">
        {activeCategories.length > 0 ? (
          activeCategories.map(([cat, amt]) => (
            <div key={cat} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low">
              <span className="text-sm">{categoryEmojis[cat] || '✨'}</span>
              <span className="font-label-sm text-label-sm text-on-surface">
                {categoryNames[cat] || cat}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium tabular-nums">
                {formatWon(amt)}
              </span>
            </div>
          ))
        ) : (
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            No expenses logged yet today! Keep up the mindful streak 🌱
          </p>
        )}
      </div>
    </div>
  );
};
