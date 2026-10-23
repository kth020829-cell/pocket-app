import React, { useState } from 'react';
import { useExpenseStore } from '../store/useExpenseStore';
import { Goal } from '../types/goal';
import { formatWon } from '../utils/formatters';
import { DepositModal } from '../components/goals/DepositModal';
import { AddGoalModal } from '../components/goals/AddGoalModal';

export const GoalsPage: React.FC = () => {
  const { goals, depositToGoal, deleteGoal, addGoal } = useExpenseStore();

  const [activeDepositGoal, setActiveDepositGoal] = useState<Goal | null>(null);
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [menuOpenGoalId, setMenuOpenGoalId] = useState<string | null>(null);

  // Overall statistics
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const overallPercent = totalTarget > 0 ? Math.min(100, Math.round((totalSaved / totalTarget) * 100)) : 0;
  const remainingTotal = Math.max(0, totalTarget - totalSaved);

  const getDaysLeft = (targetDateStr: string) => {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'D-Day reached';
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks left`;
    return `${Math.ceil(diffDays / 30)} mos left`;
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Top Summary Banner: Savings Horizon */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-md relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-space-sm relative z-10">
          <div className="inline-flex items-center gap-space-xs bg-surface-container-low px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide uppercase">
              Active Goals Hub
            </span>
          </div>
          <span className="font-label-sm text-label-sm bg-secondary-container/40 text-on-secondary-fixed-variant px-2.5 py-1 rounded-full font-medium">
            {goals.length} in progress
          </span>
        </div>

        <div className="flex flex-col gap-1 mb-space-md relative z-10">
          <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
            Total Saved Towards Aspirations
          </span>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-lg-mobile text-display-lg-mobile font-bold text-on-surface tracking-tight tabular-nums">
              {formatWon(totalSaved)}
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant font-normal">
              / {formatWon(totalTarget)}
            </span>
          </div>
        </div>

        {/* Dual-layer Progress Bar */}
        <div className="space-y-space-xs relative z-10 mb-space-md">
          <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden p-0.5 flex">
            <div
              className="h-full bg-primary-container rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(16,185,129,0.3)]"
              style={{ width: `${overallPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center px-0.5">
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              {overallPercent}% saved overall
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {formatWon(remainingTotal)} remaining
            </span>
          </div>
        </div>

        {/* Micro Metadata Chips */}
        <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
          <div className="flex items-center gap-space-xs p-2 rounded-lg bg-surface-container-low">
            <div className="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">Pace</span>
              <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                ₩450,000 / mo
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs p-2 rounded-lg bg-surface-container-low">
            <div className="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center text-tertiary shadow-xs">
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">Target ETA</span>
              <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                Dec 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Solo Saver Habit Spotlight */}
      <section className="w-full bg-gradient-to-r from-surface-container-high via-surface-container-low to-surface-container-lowest rounded-xl p-space-md mb-space-lg shadow-sm relative overflow-hidden flex items-start gap-space-sm">
        <div className="w-9 h-9 rounded-full bg-primary-container/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px]">spa</span>
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-label-md text-label-md text-primary font-semibold">
              Mindful Micro-Saver
            </span>
            <span className="font-label-sm text-label-sm bg-primary-container/15 text-primary px-1.5 py-0.2 rounded-full font-medium">
              Automatic
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
            Daily coffee round-ups tucked away into <span className="font-medium text-on-surface">"Jeju Solo Retreat"</span> added <span className="font-semibold text-primary">₩18,200</span> effortlessly this week!
          </p>
        </div>
      </section>

      {/* Section Title & Quick Filter */}
      <div className="flex items-center justify-between mb-space-sm px-1">
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
          Your Priority Goals
        </h2>
        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
          {goals.length} tracked
        </span>
      </div>

      {/* Savings Goals Grid / Stack */}
      <div className="flex flex-col gap-space-md w-full">
        {goals.map((g) => {
          const percent = g.targetAmount > 0
            ? Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100))
            : 0;
          const isFinished = percent >= 100;
          const daysLeftStr = getDaysLeft(g.targetDate);
          const isSecondaryTheme = g.theme === 'secondary';

          return (
            <article
              key={g.id}
              className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all duration-200 hover:shadow-md flex flex-col relative"
            >
              {isSecondaryTheme && (
                <div className="absolute right-0 top-0 w-24 h-24 bg-secondary-container/20 rounded-bl-full pointer-events-none"></div>
              )}

              <div className="flex items-start justify-between gap-space-sm mb-space-sm relative z-10">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className={`w-11 h-11 rounded-xl ${isSecondaryTheme ? 'bg-secondary-container/40' : 'bg-surface-container-high'} flex items-center justify-center text-xl shrink-0`}>
                    {g.categoryEmoji}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate leading-tight">
                      {g.title}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {g.categoryName}
                    </span>
                  </div>
                </div>

                <span className={`font-label-md text-label-md px-2.5 py-1 rounded-full shrink-0 font-semibold ${
                  isSecondaryTheme
                    ? 'bg-secondary-container text-on-secondary-fixed-variant'
                    : 'bg-surface-container text-on-surface'
                }`}>
                  {percent}%
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-space-xs relative z-10">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">
                  {formatWon(g.currentAmount)}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Target {formatWon(g.targetAmount)}
                </span>
              </div>

              {/* Linear Gauge */}
              <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden mb-space-sm relative z-10">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isSecondaryTheme ? 'bg-secondary' : 'bg-primary-container'
                  }`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between pt-space-xs mb-space-sm relative z-10">
                <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[15px]">event</span>
                  <span>{g.targetDate} · <strong className="text-on-surface font-medium">{daysLeftStr}</strong></span>
                </div>
                {g.monthlyPace && (
                  <span className={`font-label-sm text-label-sm font-semibold px-2 py-0.5 rounded-full ${
                    isSecondaryTheme
                      ? 'bg-secondary-container/30 text-on-secondary-fixed-variant'
                      : 'bg-primary-container/10 text-primary'
                  }`}>
                    {formatWon(g.monthlyPace)} / mo
                  </span>
                )}
              </div>

              {/* Action Footer */}
              <div className="flex items-center gap-space-sm pt-space-xs relative z-10">
                <button
                  type="button"
                  onClick={() => setActiveDepositGoal(g)}
                  className={`flex-1 py-2 px-space-sm rounded-full font-label-md text-label-md font-semibold flex items-center justify-center gap-1 shadow-sm active:scale-98 transition-transform ${
                    isSecondaryTheme
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-primary-container text-on-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>{isFinished ? '목표 달성 완료! 🎉' : 'Deposit'}</span>
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuOpenGoalId(menuOpenGoalId === g.id ? null : g.id)}
                    className="w-9 h-9 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                  </button>

                  {/* Context menu for delete */}
                  {menuOpenGoalId === g.id && (
                    <div className="absolute right-0 bottom-10 z-20 w-32 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container p-1 animate-scale-up">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`'${g.title}' 목표를 삭제하시겠습니까?`)) {
                            deleteGoal(g.id);
                            setMenuOpenGoalId(null);
                          }
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-lg font-label-sm text-label-sm text-error hover:bg-error-container/30 flex items-center gap-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        <span>목표 삭제</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}

        {/* Add New Goal Action Card */}
        <button
          type="button"
          onClick={() => setIsAddGoalModalOpen(true)}
          className="w-full bg-surface-container-low/70 hover:bg-surface-container-low transition-colors rounded-xl p-space-md flex items-center justify-center gap-space-sm py-5 text-primary group active:scale-99 border-2 border-dashed border-primary/20"
        >
          <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[20px]">add</span>
          </div>
          <span className="font-label-lg text-label-lg font-semibold text-primary">
            Create Another Dream Goal
          </span>
        </button>
      </div>

      {/* Floating Action Trigger */}
      <div className="sticky bottom-4 w-full flex justify-end pointer-events-none mt-space-md z-30">
        <button
          type="button"
          onClick={() => setIsAddGoalModalOpen(true)}
          className="pointer-events-auto h-12 px-space-md rounded-full bg-primary text-on-primary shadow-lg flex items-center gap-space-xs hover:bg-primary/95 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span className="font-label-md text-label-md font-semibold">New Goal</span>
        </button>
      </div>

      {/* Modals */}
      <DepositModal
        goal={activeDepositGoal}
        onClose={() => setActiveDepositGoal(null)}
        onDeposit={(id, amt) => depositToGoal(id, amt)}
      />

      <AddGoalModal
        isOpen={isAddGoalModalOpen}
        onClose={() => setIsAddGoalModalOpen(false)}
        onAddGoal={(goal) => addGoal(goal)}
      />
    </div>
  );
};
